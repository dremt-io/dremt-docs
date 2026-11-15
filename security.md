---
title: Security & contact
description: How DREMT is secured, what has been audited, and how to reach the team or report a vulnerability.
---

# Security & contact

## Contact

| Purpose | Channel |
|---|---|
| Security reports, responsible disclosure, listing, integration and legal | admin@dremt.io |
| Holder support | Telegram bot [@dremt_wallet_bot](https://t.me/dremt_wallet_bot) |
| Partner verification | https://platform.dremt.io/partners/verify |

Report vulnerabilities privately first. We acknowledge within two business days and do not pursue researchers who act in good faith, avoid user data and give us reasonable time to fix.

## What has been reviewed

- **Token program** `4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh`: independent security review by Soken Ltd, 2 November 2026. [Report (PDF)](/legal/Soken-DREMT-Token-Program-Security-Review-2026-11-02.pdf). The review found no path to steal user funds in the current state. Open items are governance-related and disclosed in [Governance & authorities](/token/governance).
- **Source and binary**: the audited source hash is stated in the report. The deployed program is not a reproducible build; the review was performed on the deployed binary and on the source.

## How the token is controlled

- Administration goes through a 3-of-5 SPL multisig. **All keys are held by the Issuer's founder**, so in practice the program is under single-person control. This is disclosed, not hidden, and is stated in the Token Terms.
- The program is upgradeable, can be paused, and can set a purchase fee. Any upgrade will be announced in advance to listing venues.
- The mint has no transfer fee, transfer hook or permanent delegate. Holder balances cannot be moved by the Issuer. A blacklist exists for sanctions compliance and applies to the program's own instructions only; it does not block SPL transfers.

## What holders and integrators should never be asked for

The DREMT team never asks for seed phrases or private keys. Holder benefit codes require a wallet **signature of a message**, never a transaction. Payments at the DREMT Checkout are a single transaction to a receiver shown on the checkout page, with an `ORDER-<id>` memo. Anything else is not us.
