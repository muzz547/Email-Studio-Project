# Skills I Chose

Checked 15 November 2026 using `npx skills find` for "email marketing", "email sequence", "campaign plan" and "resend". Star counts are from GitHub. Nothing has been installed yet.

## Use these

**1. For writing campaigns: `anthropics/knowledge-work-plugins`** (about 36,000 stars)
- This is **official**: Anthropic publishes it.
- It was the top result for "campaign plan" (`campaign-plan`, 3,400 installs), and it also has an `email-sequence` skill (3,100 installs). Together they cover planning a campaign and writing the emails in it.
- It's actively maintained (last updated November 2026).
- Backup option: `coreyhaines31/marketingskills@emails` (repo has about 60,000 stars, from an individual author). With 89,000 installs, it's the most-installed email-writing skill in the results.
  - Note: this skill used to be called `email-sequence`. It was renamed to `emails` in May 2026. skills.sh still lists the old name with 55,000 installs, but that folder no longer exists, so don't install the old name and don't add the two counts together.

**2. For sending email: `resend/resend-skills`** (about 210 stars)
- This is **official**: Resend publishes it, and Resend is the email service you'd be sending through.
- The `resend` skill was the top result for "resend" (24,700 installs). It covers sending, broadcasts, contacts, templates and webhooks.
- Two other official Resend skills help alongside it:
  - `resend/email-best-practices` (about 146 stars): avoiding spam, email authentication (SPF/DKIM/DMARC) and legal rules (CAN-SPAM/GDPR).
  - `resend/react-email`: building email templates. Its repo has about 20,000 stars, but that's for the React Email library (around since 2022), not a measure of the skill itself.
  - Both are also copied into `resend/resend-skills` automatically, so installing that repo probably covers all three.
- The star counts are low, and not because the repos are new: `resend-skills` was created in January 2026, about the same time as Anthropic's repo, which now has 36,000 stars. I'm trusting these skills because Resend is the real publisher. I'll read each `SKILL.md` before installing.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`** (31,700 installs, but only **2 stars**)
- It was the #1 result for "email marketing", yet almost nobody on GitHub has starred it.
- When installs are high and stars are near zero, the install count may be inflated or automated. A company I don't recognise, with a repo created in March 2026, isn't one I'd trust with my email setup.

**2. `claude-office-skills/skills@email-marketing`** (about 575 stars, 5,200 installs)
- The name makes it sound like it comes from Anthropic, but it doesn't. Anthropic's skills are under `anthropics`.
- Copycat names are a common trick. It also hasn't been updated since January 2026.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Look at the owner name before the `/`. Prefer the real company (`anthropics`, `resend`) or a well-known author. Watch out for names that only *sound* official.
2. **Whether the numbers add up.** Compare GitHub stars, skills.sh installs and the last update date. Lots of installs with almost no stars, or a repo nobody has touched in months, is a warning sign.
3. **What it actually does.** Open the skill's `SKILL.md` and any scripts before installing. Make sure it only asks for the access it needs (API keys, sending email, DNS changes) and doesn't run code or contact servers you didn't expect.
