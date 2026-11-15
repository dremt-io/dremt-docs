---
title: Supply
description: How to get DREMT max, issued and circulating supply from Solana RPC.
---

# Supply

How to get DREMT max, issued and circulating supply from Solana RPC.

| Metric | Definition | Value |
|---|---|---|
| **Max supply** | On-chain cap stored in `token_state` `6Von4B5nPzo2tVNW5N5JGZXwKF37RDW3bjfeUepU83LR` | 100,000,000,000 |
| **Issued supply** (total supply) | `getTokenSupply` on the mint | 10,002,384.876703 as of 5 November 2026 |
| **Circulating supply** | Issued supply **minus** the program treasury vault balance | 14,759.876703 as of 5 November 2026 |

The treasury vault `DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS` holds the initial allocations that
have not been released. It belongs to a keyless program PDA, so its balance is not circulating.

The figures above are a snapshot of Solana mainnet taken on 5 November 2026 (slot about 465,693,000).
Use the calls below for live values.

## Issued supply

```bash
curl -s https://api.mainnet-beta.solana.com -H 'content-type: application/json' -d '{
  "jsonrpc":"2.0","id":1,"method":"getTokenSupply",
  "params":["AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou"]
}'
```

## Treasury vault balance

```bash
curl -s https://api.mainnet-beta.solana.com -H 'content-type: application/json' -d '{
  "jsonrpc":"2.0","id":1,"method":"getTokenAccountBalance",
  "params":["DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS"]
}'
```

## Circulating supply

Circulating supply = issued supply (`getTokenSupply` on the mint) minus the balance of the program treasury vault `DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS` (`getTokenAccountBalance`). Use the raw `amount` fields (base units, 6 decimals) so the result is exact. A dependency-free script is in [Integration code](/integration/code#supply-issued-and-circulating).
