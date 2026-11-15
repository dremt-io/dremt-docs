---
title: Contract & addresses
description: Every DREMT mainnet account, and how to check each one yourself.
---

# Contract & addresses

Every DREMT mainnet account, and how to check each one yourself.

## Mint

| Field | Value |
|---|---|
| Mint | `AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou` |
| Owner program | Token-2022 `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| Decimals | `6` |
| Mint account size | 82 bytes, which means a base mint with **no extensions** (no transfer fee, no transfer hook, no permanent delegate) |
| Mint authority | `E5rNU7YXJCzyEcWZFKANUV9Uf29GuujNgjNdnEtdwu6m` (program PDA, no private key) |
| Freeze authority | `E5rNU7YXJCzyEcWZFKANUV9Uf29GuujNgjNdnEtdwu6m` (same PDA) |

Check it yourself:

```bash
curl -s https://api.mainnet-beta.solana.com -H 'content-type: application/json' -d '{
  "jsonrpc":"2.0","id":1,"method":"getAccountInfo",
  "params":["AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou",{"encoding":"jsonParsed"}]
}'
```

## Metadata (Metaplex)

| Field | Value |
|---|---|
| Metadata account | `D2wuSX9gGGTBMUjnQanFAGMrsoAP8VTzw9Dzdn3jPTbS` |
| Name / symbol | `DREMT` / `DREMT` |
| Update authority | `E5rNU7YXJCzyEcWZFKANUV9Uf29GuujNgjNdnEtdwu6m` (program PDA) |
| Metadata URI | `https://dremt.io/logo.png` (see the note below) |
| Token logo | `https://dremt.io/coin.png`. PNG 256 / 512: [dremt-token-256.png](/logo/dremt-token-256.png), [dremt-token-512.png](/logo/dremt-token-512.png) |

::: warning Metadata can change
The metadata is mutable (`isMutable` is set). The deployed token program has an `update_token_metadata` instruction, and **any one of the five multisig owners can call it alone** to change the token's name, symbol and metadata URI. It has been used three times: on 28 February 2026 and twice on 4 March 2026. See [Governance](/token/governance#token-metadata).
:::

## Program

| Program | Address | Upgrade authority |
|---|---|---|
| DREMT token program | `4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh` | `DiRfgcJivBsawk11SDD1YpUcqW7YAT8Ai7YbxB6osTVd` (program PDA; upgrades need a 3-of-5 proposal) |

The token program is upgradeable. See [Program upgrades](/token/governance#program-upgrades).

## Program accounts

| Account | Address | Notes |
|---|---|---|
| `token_state` | `6Von4B5nPzo2tVNW5N5JGZXwKF37RDW3bjfeUepU83LR` | Supply cap, pause flag, config |
| `token_distribution` | `8XxJ21s8ArHgqWEaJHxi4P2ywbM6VhPG18fpModskvVX` | Initial allocations and vesting schedules |
| `blacklist` | `4QMjwgBxWktBhfZg7PANYVXiJkqZzJdcgjTv4ekism9w` | Checked by the program's own instructions only (see [Governance](/token/governance#blacklist)) |
| `vault_owner` | `EYTGC7oB6n4WrPsnzQfX5E1UxPGWLjJx5j716GxPo95x` | PDA, seed `"vault_owner"` |
| Treasury vault (DREMT) | `DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS` | Token-2022 ATA of `vault_owner`. Holds the initial allocations that have not been released |
| Primary-sale USDC account | `3SL9pgmSgAuGvN6gwRsfzyVNF1BbKUwaby9hc6quBnGq` | USDC received from primary sales |
| Multisig | `5D2kznd22qoYNnaFxCxPvaTfHMAfQ8YTjdA1iGCSpHVz` | 3-of-5, controlled by the Issuer |

## Liquidity

| Pool | Address |
|---|---|
| Raydium CPMM DREMT/SOL pool | `FXHdgJbseHcaB6DPotRwKYnXm3DLxshRtRoinSjDq7i2` |
| LP mint | `HLJPceLGZH4AMacmiDdzPk9BXXHXoomrYvYB4V9z6WAu` |
