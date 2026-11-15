---
title: Governance & authorities
description: Who controls the DREMT token program, what the multisig can do, and what that means for exchange wallets.
---

# Governance & authorities

Who controls the DREMT token program, what the multisig can do, and what that means for exchange wallets.

## 3-of-5 multisig, controlled by the Issuer

DREMT is controlled by its issuer, DREMT GROUP LIMITED (the Issuer). Privileged actions on the token program go through on-chain proposals in the multisig `5D2kznd22qoYNnaFxCxPvaTfHMAfQ8YTjdA1iGCSpHVz`. A proposal needs **3 of 5** owner approvals and expires after seven days. An approved action takes effect when it is executed; there is no timelock.

The five owner keys:

```
Bj4ThGugXDqHSHUmJiGDhe7HXxcaDxfz3FRAqBgHqfnk
FHrsQQxTWjNnCbvyaLZ14KKT7C9eZbwwKascouuEZgw9
4Wn8jjHMEev8YG5JeymLXKbCyCEYNyaS6tLCqDBgLNri
Ggz322dPoqeKd9JrcCUK6Fv6Qc5BeJWphVsUJDozkB9Y
4QZmHoR8dYQiPeDd8LiF9ymBGWpcQhxqCwdYLpv8KPU6
```

Two actions do not follow the 3-of-5 rule: token metadata updates (see [Token metadata](#token-metadata)) and the payout of the treasury action described below, which goes to the owner who executes it.

### What the multisig can do

With 3 of 5 approvals, the multisig can:

- **Upgrade the token program.** The program has been upgraded three times, all on 24 February 2026. An upgrade can change any behaviour of the program, including the primary sale price.
- **Change the maximum supply cap** (currently 100,000,000,000).
- **Set a purchase fee** and its recipient. The fee is currently 0%.
- **Pause** the program's own instructions, such as primary purchases. Pausing does not stop token transfers.
- **Add or remove addresses on the blacklist.** The blacklist does not freeze tokens or block transfers.
- **Release vested allocations** from the treasury vault to a recipient named in the proposal. This has happened twice, both on 24 February 2026.
- **Remove unreleased tokens from the treasury vault.** For each token removed, 0.80 USDC of primary-sale proceeds is paid to the owner who executes the action. This has never been used.
- **Authorise other programs** to call the token program. No program is authorised today.

### Token metadata

The deployed token program has an `update_token_metadata` instruction. **Any one of the five owners can call it alone**, without the other four, to change the token's name, symbol and metadata URI. It has been used three times: on 28 February 2026 and twice on 4 March 2026.

### Holders

DREMT holders have no voting or governance rights. The multisig acts for the Issuer.

## Authorities

### Mint authority

The mint authority is the PDA `E5rNU7YXJCzyEcWZFKANUV9Uf29GuujNgjNdnEtdwu6m`. Anyone can recompute it:

```
findProgramAddress(["mint_authority"], 4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh)
```

No private key exists for it. New tokens can only be minted through the program's `mint_by_user`
instruction (the primary sale), which enforces the max-supply cap. Changing the cap takes a 3-of-5
proposal.

### Freeze authority

The freeze authority is the same keyless PDA. **The current token program has no instruction that freezes or thaws token accounts.** That means:

- Exchange hot and cold wallets cannot be frozen under the current program.
- Adding a freeze instruction would need a program upgrade, which takes 3-of-5 approval.

### Blacklist

The `blacklist` account is a list that **only the program's own instructions check**, such as
primary purchases through `mint_by_user`. It does not freeze accounts and does not affect ordinary
Token-2022 transfers. The mint has no transfer hook, so deposits and withdrawals between wallets are
never blocked by it.

### Pause

A 3-of-5 pause proposal switches off the program's own instructions, such as primary purchases.
**Standard token transfers keep working while the program is paused**, because the mint has no
transfer hook.

### Program upgrades

The token program's upgrade authority is the program PDA `DiRfgcJivBsawk11SDD1YpUcqW7YAT8Ai7YbxB6osTVd`.
An upgrade runs through `execute_upgrade_proposal` (3-of-5). There is no timelock: an approved
upgrade can be executed at once.

## Security review

Soken Ltd carried out a security review of the DREMT token program (`4iwHwvSXrdpgsVPhrM4XDB9Lh7s284MJFJToeS9N8GJh`), dated 2 November 2026. The review covers the token program only.

## What exchanges should watch

| Event | Effect on an exchange | How to detect it |
|---|---|---|
| Program upgrade | Program behaviour could change | Watch the program data account of `4iwHw…8GJh` |
| Max-supply change | Supply cap changes | `token_state` account changes |
| Pause | Primary purchases stop. Transfers are unaffected | `token_state` pause flag |
| Metadata update | Name, symbol or URI can change | Metadata account `D2wuSX9g…jPTbS` changes |
