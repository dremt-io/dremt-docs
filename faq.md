---
title: FAQ
description: Common questions from holders, exchange integration teams and compliance teams.
---

# FAQ

Common questions from holders, exchange integration teams and compliance teams.

## About DREMT

<details class="faq">
<summary>What is DREMT?</summary>

DREMT is a utility token on Solana. A wallet holding any amount of DREMT can generate a personal code
at each partner jeweller (Alma Diamond, Azena Gems, Jatual, Innovation Diamond). The code gives access
to exclusive benefits: exclusive or limited pieces, early access, private viewings, and member discounts
or perks set by each partner. You can also pay for partner pieces in DREMT at the DREMT Checkout. See
[How holder benefits work](/#how-holder-benefits-work).

</details>

<details class="faq">
<summary>Can I pay with DREMT?</summary>

Yes. Partner pieces can be paid for in DREMT at the DREMT Checkout. The price is converted at 0.80 USD
per DREMT, with the partner's pay-in-DREMT discount for paying in DREMT. The checkout also accepts SOL from anyone, without
the discount. Using a holder code on its own moves no tokens: your DREMT stays in your wallet.

</details>

<details class="faq">
<summary>Does a holder code give a discount?</summary>

It can. Each partner sets its own holder benefits, which may include member discounts or perks as well
as exclusive pieces, early access and private viewings. Separately, paying in DREMT at the DREMT
Checkout gives the partner's pay-in-DREMT discount. Every benefit is a cheaper or better purchase; DREMT never pays out
cashback, yield or any return. Contact [support@dremt.io](mailto:support@dremt.io) to learn which
benefit each partner currently offers.

</details>

<details class="faq">
<summary>Is DREMT an investment?</summary>

No. DREMT is a utility token. It gives no claim on the Issuer, its partners or any asset, no share of
revenue or profit, no yield or staking return, and no voting rights. No benefit grows with how much or
how long you hold. The primary sale price of 0.80 USD is a sale price, not a peg
or a statement of value. The secondary price on a DEX floats, and the Issuer gives no price or
liquidity guarantee.

</details>

## Token and governance

<details class="faq">
<summary>Is DREMT SPL Token or Token-2022?</summary>

Token-2022 (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`), with no extensions enabled. Derive ATAs
and send transfers with the Token-2022 program ID.

</details>

<details class="faq">
<summary>Can the Issuer freeze tokens held on our exchange?</summary>

Not under the current program. The freeze authority is a keyless PDA, and the token program has no
freeze instruction. Adding one would take a program upgrade approved 3-of-5.

</details>

<details class="faq">
<summary>Can the Issuer mint without limit?</summary>

No. Minting runs only through `mint_by_user` (the primary sale) under an on-chain max-supply cap of
100,000,000,000. Changing the cap takes 3-of-5 approval.

</details>

<details class="faq">
<summary>Who controls the token program?</summary>

The Issuer, DREMT GROUP LIMITED, through a 3-of-5 on-chain multisig. Privileged actions need three
of five approvals, except token metadata updates, which any one owner can make alone. See
[Governance](/token/governance).

</details>

<details class="faq">
<summary>Has the token program been reviewed?</summary>

Soken Ltd carried out a security review of the DREMT token program, dated 2 November 2026.

</details>

## Integration

<details class="faq">
<summary>Why does one address hold about 99% of supply?</summary>

`DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS` is the program treasury vault, owned by the keyless
`vault_owner` PDA. It holds the initial allocations that have not been released, and it is excluded
from circulating supply. See [Supply](/integration/supply).

</details>

<details class="faq">
<summary>Does pausing the program stop deposits and withdrawals?</summary>

No. Pause only affects the program's own instructions, such as primary purchases. Plain Token-2022
transfers are unaffected, because the mint has no transfer hook.

</details>

<details class="faq">
<summary>Is a memo required for deposits?</summary>

No. Credit deposits that arrive at the user's Token-2022 ATA. See
[Deposits & withdrawals](/integration/deposits-withdrawals).

</details>

<details class="faq">
<summary>Is there a testnet token?</summary>

No. Integrate on mainnet with small amounts.

</details>
