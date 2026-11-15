---
title: Tokenomics
description: DREMT supply, initial allocation, vesting and primary sale.
---

# Tokenomics

DREMT supply, initial allocation, vesting and primary sale.

## Supply

| Field | Value |
|---|---|
| Max supply | **100,000,000,000** DREMT. This is the on-chain cap in `token_state`; changing it takes a 3-of-5 proposal |
| Initial supply | 10,000,000 DREMT, minted on 24 February 2026 into the program treasury vault |
| Issued supply | **10,002,384.88** DREMT as of 5 November 2026 (about 10.0 million) |

Beyond the initial 10,000,000, new DREMT is minted only when someone buys at the primary sale price.
Live figures: [Supply](/integration/supply).

## Initial allocation (10M)

The initial 10,000,000 DREMT were split into five allocations. They sit in the treasury vault
`DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS`, owned by a keyless program PDA. Each allocation is
released only under its vesting schedule and with 3-of-5 multisig approval.

| Allocation | Share of initial supply | Tokens |
|---|---:|---:|
| Treasury | 60% | 6,000,000 |
| Marketing & Community | 25% | 2,500,000 |
| DEX Liquidity | 6% | 600,000 |
| Advisors | 5% | 500,000 |
| Market Making | 4% | 400,000 |

Figures are read from the on-chain distribution account `8XxJ21s8ArHgqWEaJHxi4P2ywbM6VhPG18fpModskvVX`.

## Vesting

The allocations vest on-chain from 24 February 2026. Each one unlocks a share at launch (TGE), then
waits out a cliff, then vests linearly. Vested tokens stay in the treasury vault until a 3-of-5
proposal releases them to a named recipient.

| Allocation | Tokens | At TGE | Cliff | Linear vesting | Released to 5 Nov 2026 |
|---|---:|---:|---|---|---:|
| Treasury | 6,000,000 | 5% | 30 days | 365 days | 0 |
| Marketing & Community | 2,500,000 | 5% | 30 days | 365 days | 0 |
| DEX Liquidity | 600,000 | 100% | None | None | 9,375 |
| Advisors | 500,000 | 2% | 90 days | 548 days | 0 |
| Market Making | 400,000 | 100% | None | None | 3,000 |

Vesting applies only to the initial 10,000,000 tokens. Tokens minted by buyers at the primary sale
price are not subject to vesting.

## Primary sale

The token program sells new DREMT at a fixed primary sale price of **0.80 USD per DREMT**, paid on-chain
as 0.80 USDC through the program's `mint_by_user` instruction. The price is the same for every buyer
and is fixed in the current program; it can change only through a 3-of-5 program upgrade.

This is a sale price. It is not a peg and not a statement of value. On the secondary market (Raydium)
the price floats and can be lower or higher than the primary sale price. The Issuer gives no price or
liquidity guarantee.

Ways to buy DREMT:

- Card (Visa/Mastercard) via Wert
- Crypto: SOL, USDT, USDC
- Raydium (secondary market)

Purchases mint new tokens; they do not come out of the treasury vault. Tokens leave the treasury
vault only through 3-of-5 multisig actions, such as allocation releases (see
[Governance](/token/governance#what-the-multisig-can-do)).

## Supply today

| As of 5 November 2026 | DREMT |
|---|---:|
| Issued supply | 10,002,384.88 |
| Held in the program treasury vault | 9,987,625.00 (99.85%) |
| Outside the vault (circulating) | 14,759.88 (0.15%) |
| of which in the Raydium pool | 11,449.44 |

See [Supply](/integration/supply) for how to work out these figures on-chain.
