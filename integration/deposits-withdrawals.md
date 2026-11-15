---
title: Deposits & withdrawals
description: How to integrate DREMT as a Solana Token-2022 asset in exchange wallet infrastructure.
---

# Deposits & withdrawals

How to integrate DREMT as a Solana Token-2022 asset in exchange wallet infrastructure.

DREMT is a **plain Token-2022 mint with no extensions**. If your Solana stack already supports
Token-2022 (for example PYUSD), DREMT needs no special handling beyond the program ID.

## Parameters

| Parameter | Value |
|---|---|
| Mint | `AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou` |
| Token program | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| Decimals | `6` (1 DREMT = 1,000,000 base units) |
| Transfer fee | None |
| Transfer hook | None |
| Memo required | No |
| Gas token | SOL. The sender pays the fee. Creating a new recipient ATA costs about 0.00207 SOL in rent |
| Recommended confirmation | `finalized` commitment, about 13 s |

## Deposit addresses

A user's deposit address is the **Associated Token Account (ATA)** of their wallet, derived with the
**Token-2022** program ID. Deriving it with the legacy SPL Token program gives a different, wrong
address.

```ts
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

const DREMT = new PublicKey("AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou");

const ata = getAssociatedTokenAddressSync(DREMT, owner, false, TOKEN_2022_PROGRAM_ID);
```

::: tip
Show users their **wallet address** (owner) as the deposit address, the same way you do for other SPL
tokens. Wallets resolve the ATA on their own. Credit deposits that arrive at the derived ATA.
:::

## Withdrawals

Use `transferChecked`. It checks the mint and decimals, and it is what Token-2022 integrations should use.
Create the recipient's ATA idempotently in the same transaction.

```ts
import { Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

const from = getAssociatedTokenAddressSync(DREMT, hotWallet.publicKey, false, TOKEN_2022_PROGRAM_ID);
const to = getAssociatedTokenAddressSync(DREMT, recipient, true, TOKEN_2022_PROGRAM_ID);

const tx = new Transaction().add(
  createAssociatedTokenAccountIdempotentInstruction(
    hotWallet.publicKey, to, recipient, DREMT, TOKEN_2022_PROGRAM_ID,
  ),
  createTransferCheckedInstruction(
    from, DREMT, to, hotWallet.publicKey, amountBaseUnits, 6, [], TOKEN_2022_PROGRAM_ID,
  ),
);
```

## Detecting deposits

Poll each deposit ATA, or subscribe to it, then read the token balance change from the
finalized transaction. Only credit entries where `mint` equals the DREMT mint.

```ts
const sigs = await connection.getSignaturesForAddress(ata, { limit: 100 }, "finalized");

for (const { signature, err } of sigs) {
  if (err) continue; // failed tx, nothing moved
  const tx = await connection.getParsedTransaction(signature, {
    commitment: "finalized",
    maxSupportedTransactionVersion: 0,
  });
  const pre = tx?.meta?.preTokenBalances?.find(b => b.mint === DREMT.toBase58() && b.owner === owner.toBase58());
  const post = tx?.meta?.postTokenBalances?.find(b => b.mint === DREMT.toBase58() && b.owner === owner.toBase58());
  const delta = BigInt(post?.uiTokenAmount.amount ?? 0) - BigInt(pre?.uiTokenAmount.amount ?? 0);
  if (delta > 0n) credit(signature, delta); // make credit() idempotent on signature
}
```

::: warning
Never credit from `confirmed` or `processed` commitment. Always de-duplicate by transaction signature.
:::

## Things that cannot happen to your wallets

- **Frozen accounts**: the current token program has no freeze instruction. Adding one would need a
  3-of-5 program upgrade. See [Governance](/token/governance#freeze-authority).
- **Transfer fees withheld**: the mint has no fee extension, so the amount sent is the amount received.
- **Blocked transfers**: the mint has no transfer hook, so the program's pause and blacklist do not
  apply to regular transfers. See [Governance](/token/governance#blacklist).

## Testing

There is no devnet DREMT mint for exchanges. Test with a small mainnet amount. Contact
[support@dremt.io](mailto:support@dremt.io) if you need test tokens sent to your hot wallet.
