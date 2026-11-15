---
layout: home
title: DREMT utility token
titleTemplate: DREMT Docs

hero:
  name: DREMT
  text: A utility token on Solana
  tagline: Hold any amount of DREMT to unlock holder-only benefits at partner jewellers, and pay for partner pieces in DREMT at the partner's pay-in-DREMT discount.
  image:
    src: /logo/dremt-token-512.png
    alt: DREMT token
  actions:
    - theme: brand
      text: Holder benefits
      link: /token/holder-benefits
    - theme: alt
      text: Telegram bot
      link: https://t.me/dremt_wallet_bot

features:
  - title: Contract & governance
    details: Every mainnet account and authority, and what the Issuer's 3-of-5 multisig can do.
    link: /token/contract
    linkText: Contract & addresses
  - title: Exchange integration
    details: Token-2022 deposits and withdrawals, supply figures, node notes and copy-ready integration code.
    link: /integration/deposits-withdrawals
    linkText: Integration guide
---

## What DREMT is

DREMT is a utility token on Solana, issued by DREMT GROUP LIMITED (the Issuer). A wallet that holds any amount of DREMT can generate a personal code at each partner jeweller:

- Alma Diamond
- Azena Gems
- Jatual
- Innovation Diamond

The code gives access to exclusive benefits at that partner: exclusive or limited pieces, early access, private viewings, and member discounts or perks set by each partner.

**You can pay in DREMT.** Partner pieces can be paid for in DREMT at the DREMT Checkout. The price is converted at 0.80 USD per DREMT, with the partner's pay-in-DREMT discount for paying in DREMT. The checkout also accepts SOL from anyone, without the discount. Using a code on its own moves no tokens: your DREMT stays in your wallet until you choose to pay with it.

Every benefit is a cheaper or better purchase. DREMT never pays out: no cashback, no yield, no staking returns, no revenue share, and no benefit that grows with how much or how long you hold.

## How holder benefits work

1. **Hold DREMT.** Any balance above zero in a Solana wallet qualifies. There is no minimum, no tiers and no lock-up.
2. **Prove you hold it.** Connect your wallet at [platform.dremt.io/partners](https://platform.dremt.io/partners) or open the Telegram bot [@dremt_wallet_bot](https://t.me/dremt_wallet_bot), and sign a message. Signing proves ownership and moves no tokens.
3. **Get your codes.** You receive one personal code for each partner jeweller.
4. **Use a code with the partner.** The partner checks the code at platform.dremt.io/partners/verify. The check confirms again that your wallet still holds DREMT.
5. **Ask which benefit is available.** Contact DREMT support at [support@dremt.io](mailto:support@dremt.io) to learn what each partner currently offers.
6. **Pay in DREMT if you wish.** At the DREMT Checkout the piece's price is converted at 0.80 USD per DREMT with a pay-in-DREMT discount set by each partner. SOL is accepted too, without the discount.

The code service is run by the Issuer. The benefits are supplied by the partners, depend on each partner, and can change or end.

## Key facts

| Field | Value |
|---|---|
| Ticker | `DREMT` |
| Network | Solana mainnet-beta |
| Token standard | SPL **Token-2022**, no extensions |
| Mint address | `AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou` |
| Decimals | `6` |
| Max supply | 100,000,000,000 (on-chain cap) |
| Issued supply | About 10.0 million (10,002,384.88 as of 5 November 2026). See [Supply](/integration/supply) |
| Primary sale price | 0.80 USD per DREMT |
| Governance | 3-of-5 multisig controlled by the Issuer. See [Governance](/token/governance) |
| Explorer | [Solscan](https://solscan.io/token/AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou) |
| Website | [dremt.io](https://dremt.io) |

New DREMT is sold at a fixed primary sale price of 0.80 USD. This is a sale price only: it is not a peg and not a statement of value. On a DEX the price floats and can be lower or higher. The Issuer gives no price or liquidity guarantee.

::: warning Not an investment
DREMT is a utility token. It is not an investment. Holding it gives no claim on the Issuer, its partners or any asset, no share of revenue or profit, no yield or staking return, and no voting rights. Nothing on this site is a promise about the future price of DREMT.
:::

## For exchanges and integrators

- [Integration code](/integration/code): copy-ready snippets for supply, deposits, withdrawals and the holder-code API.
- [Compliance & legal](/compliance): classification documents, audit and terms.
- [Contract & addresses](/token/contract): mint, programs and program accounts.
- [Deposits & withdrawals](/integration/deposits-withdrawals): Token-2022 ATA derivation and transfers.
- [Supply](/integration/supply): issued and circulating supply straight from RPC.

::: info Token-2022
DREMT is a Token-2022 mint, **not** a legacy SPL Token mint. Deposit addresses (ATAs) and transfers must use the Token-2022 program ID. Sending with the legacy SPL Token program fails.
:::
