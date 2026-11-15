---
title: Glossary
description: Terms used across the DREMT documentation.
---

# Glossary

**Associated token account (ATA)**: the deterministic SPL token account that holds a wallet's DREMT. Derived from the wallet, the Token-2022 program and the mint.

**Benefit code**: see *Holder code*.

**DREMT**: the utility token, SPL Token-2022, mint `AmUYmDAhxoD841aT44dNLVHRvnZ1zGe1uppZLFw5MSou`, 6 decimals.

**DREMT Checkout**: the Issuer's hosted checkout where partner pieces are paid for in DREMT (with the partner's pay-in-DREMT discount) or in SOL. The Issuer receives the payment and settles with the partner.

**Holder code**: a personal code any DREMT holder can generate per partner by signing a message with their wallet. Partners verify it before giving holder benefits. One code per wallet per partner, single use, no expiry.

**Holder benefits**: what a holder code unlocks at a partner: exclusive or limited pieces, early access, private viewings, member discounts or perks. Always a cheaper or better purchase, never a payout.

**Issuer**: Dremt Group Limited, Hong Kong.

**Multisig**: the 3-of-5 SPL Token multisig `5D2kznd22qoYNnaFxCxPvaTfHMAfQ8YTjdA1iGCSpHVz` that administers the token program. All five keys are held by the Issuer's founder.

**Partner**: a jeweller taking part in the holder-benefit programme under an agreement with the Issuer. Currently Alma Diamond, Azena Gems, Jatual and Innovation Diamond.

**Pay-in-DREMT discount**: a price reduction, set per partner by the Issuer, applied when a partner piece is paid for in DREMT at the DREMT Checkout. Converted at 0.80 USD per DREMT.

**Primary issuance**: minting new DREMT from the token program at the fixed price of 0.80 USDC, open to anyone, through dremt.io, the business portal, the Telegram mini app, the iOS wallet or card on-ramps.

**Token program**: the Anchor program `4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh` that mints DREMT, holds the treasury vault and enforces vesting.

**Treasury vault**: the program-owned token account `DYSuvbzcD9kizqveKfvM9NeSyS96nSSzBmXprWHcRSSS` holding the unreleased allocations. Excluded from circulating supply.

**Vesting**: the time-locks on the five launch allocations (treasury, marketing, DEX liquidity, advisors, market making), released only by multisig proposal.
