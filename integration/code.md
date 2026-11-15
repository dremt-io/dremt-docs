---
title: Integration code
description: "Public, copy-ready code for integrating DREMT: supply, deposits, withdrawals, holder-code API and DREMT Checkout payments."
---

# Integration code

Everything on this page talks to public Solana RPC or to the public DREMT API. No keys are needed except where a partner key is stated. All samples are MIT licensed (see `LICENSE`).

## Constants

```ts
export const DREMT_MINT = 'AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou';
export const TOKEN_2022 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
export const ASSOCIATED_TOKEN_PROGRAM = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
export const DREMT_DECIMALS = 6;
export const TREASURY_VAULT = 'DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS';
export const DREMT_API = 'https://api.dremt.io/api/v1';
```

## Supply (issued and circulating)

Node 18+, no dependencies. Circulating = issued minus the treasury vault.

```js
const RPC = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const MINT = 'AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou';
const TREASURY = 'DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS';

const rpc = async (method, params) => {
  const r = await fetch(RPC, { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) });
  const { result, error } = await r.json();
  if (error) throw new Error(error.message);
  return result.value;
};

const total = BigInt((await rpc('getTokenSupply', [MINT])).amount);
const treasury = BigInt((await rpc('getTokenAccountBalance', [TREASURY])).amount);
const fmt = n => `${n / 1_000_000n}.${String(n % 1_000_000n).padStart(6, '0')}`;
console.log(JSON.stringify({ total: fmt(total), treasury: fmt(treasury), circulating: fmt(total - treasury) }));
```

## Deposit address for a user

The associated token account under Token-2022. Create it on first deposit if it does not exist (the sender usually pays for it).

```ts
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

const MINT = new PublicKey('AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou');
export const depositAta = (owner: PublicKey) =>
  getAssociatedTokenAddressSync(MINT, owner, false, TOKEN_2022_PROGRAM_ID);
```

## Detecting deposits

Poll `getSignaturesForAddress` on each deposit ATA and read the post-balance delta, or subscribe with `logsSubscribe` on the ATA. Confirm at `finalized` before crediting.

```ts
const sigs = await connection.getSignaturesForAddress(ata, { until: lastSeen }, 'finalized');
for (const { signature } of sigs.reverse()) {
  const tx = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0, commitment: 'finalized' });
  if (!tx || tx.meta?.err) continue;
  const pre = tx.meta.preTokenBalances?.find(b => b.mint === MINT.toBase58() && b.owner === owner.toBase58());
  const post = tx.meta.postTokenBalances?.find(b => b.mint === MINT.toBase58() && b.owner === owner.toBase58());
  const delta = BigInt(post?.uiTokenAmount.amount ?? 0) - BigInt(pre?.uiTokenAmount.amount ?? 0);
  if (delta > 0n) credit(owner, delta, signature);
}
```

## Withdrawals

`TransferChecked`, 6 decimals, Token-2022. Create the recipient ATA when missing.

```ts
import { createAssociatedTokenAccountIdempotentInstruction, createTransferCheckedInstruction, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

const toAta = depositAta(recipient);
const tx = new Transaction().add(
  createAssociatedTokenAccountIdempotentInstruction(hot.publicKey, toAta, recipient, MINT, TOKEN_2022_PROGRAM_ID),
  createTransferCheckedInstruction(hotAta, MINT, toAta, hot.publicKey, amountBaseUnits, 6, [], TOKEN_2022_PROGRAM_ID)
);
```

The mint has no transfer fee, transfer hook or permanent delegate, so standard Token-2022 handling is enough. See [Deposits & withdrawals](/integration/deposits-withdrawals) for parameters and testing.

## Holder-code API

Public endpoints at `https://api.dremt.io/api/v1/promo`. Holders prove wallet ownership with an ed25519 signature; partners authenticate with their partner key.

**Issue a code (holder).** Message format is fixed and valid for 10 minutes:

```
DREMT holder benefit code
Wallet: <base58 wallet>
Issued: <ISO-8601 timestamp>
```

```ts
const message = `DREMT holder benefit code\nWallet: ${wallet}\nIssued: ${new Date().toISOString()}`;
const sig = await window.solana.signMessage(new TextEncoder().encode(message), 'utf8');
const res = await fetch('https://api.dremt.io/api/v1/promo/codes', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ wallet_address: wallet, partner: 'alma', message, signature: base64(sig.signature) })
});
// { success: true, data: { code, partner, status: 'active', issued_at } }
```

Partner slugs: `alma`, `azena`, `jatual`, `innovation`. A wallet with zero DREMT gets `403`.

**Verify or redeem (partner).**

```bash
curl -X POST https://api.dremt.io/api/v1/promo/verify \
  -H 'content-type: application/json' \
  -d '{"code":"ALMA-XXXX-XXXX","partner_key":"<your key>"}'
# data.status: valid | redeemed | invalid | no_balance
curl -X POST https://api.dremt.io/api/v1/promo/redeem ...   # same body; marks the code used
```

## DREMT Checkout payment

A DREMT payment is one transaction: a Token-2022 `TransferChecked` of the quoted amount to the receiver's DREMT token account shown by the checkout, plus a Memo `ORDER-<orderId>`. The checkout server computes the price and discount, stores the quote on the order and verifies the transaction on-chain before marking the order paid. Clients never send an amount or a discount.

```ts
tx.add(
  createTransferCheckedInstruction(payerAta, MINT, quote.receiverAta, payer, BigInt(quote.amount), 6, [], TOKEN_2022_PROGRAM_ID),
  new TransactionInstruction({ programId: MEMO_PROGRAM_ID, keys: [{ pubkey: payer, isSigner: true, isWritable: false }],
    data: Buffer.from(quote.memo) })
);
```
