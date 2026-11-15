---
title: Node deployment
description: DREMT is an SPL token on Solana mainnet. No dedicated node is required; integrate through any standard Solana RPC node.
---

# Node deployment

DREMT is an SPL token on Solana mainnet, not a standalone blockchain, so **no dedicated node is required**. Integration works through any standard Solana RPC node and the SPL Token-2022 program.

| Item | Value |
|---|---|
| Network | Solana mainnet-beta |
| Token standard | SPL Token-2022 |
| Token program | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| Mint | `AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou` |
| Decimals | 6 |
| Issuing program | `4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh` (mint authority is a PDA of this program) |

## Options

1. **Public or hosted RPC.** Any Solana RPC provider (Helius, Triton, QuickNode, Alchemy, or `https://api.mainnet-beta.solana.com` for testing). Nothing DREMT-specific to configure.
2. **Own validator or RPC node.** Follow the Solana docs at https://docs.solanalabs.com/operations/setup-an-rpc-node. A non-voting RPC node is enough; DREMT needs no plugin, geyser filter or custom build.

## What an exchange needs

- Deposits: watch token accounts owned by your deposit wallets for mint `AmUY…MSou` under the Token-2022 program. Use `getSignaturesForAddress` on the associated token account, or `getTokenAccountsByOwner` with `programId = TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`. See [Deposits & withdrawals](/integration/deposits-withdrawals).
- Withdrawals: `TransferChecked` from your hot wallet's associated token account, 6 decimals, Token-2022 program. Create the recipient's associated token account if it does not exist.
- Supply: `getTokenSupply` on the mint; circulating supply method in [Supply](/integration/supply).
- Extensions: the mint has no transfer fee, no transfer hook and no permanent delegate enabled. Standard Token-2022 transfer handling is sufficient.
