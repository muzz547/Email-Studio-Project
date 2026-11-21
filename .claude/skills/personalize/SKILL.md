---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails by lead group

Campaign folder: $ARGUMENTS

You take a campaign's finished emails and write one version of each email for every lead group.

## Step 1: Check the campaign folder

- If no campaign folder was given above, don't write anything. Use Glob on `campaigns/*/` to find the campaign folders. Reply with a short list of them and ask which one to use. Then stop.
- If a folder was given but it doesn't exist, or it has no `emails/*.md` files, say so, list the campaign folders that do exist, and stop.

## Step 2: Find the lead groups

- Read the `group` column of `leads/leads.csv` and collect each group name once. Expect `tea-curious`, `gift-buyers` and `daily-drinkers`, but use whatever groups the file actually holds.
- You only need the group names. Don't copy names, email addresses or any other contact details into the emails.

## Step 3: Read the guidance

Read these before writing:

- `brand/voice.md`: our voice, the words we use and avoid, and the claims we must never make.
- `.claude/rules/emails.md`: the layout every email file must follow.
- `<campaign folder>/plan.md`, if it exists: what each group cares about and how to speak to them.

## Step 4: Check for existing files

The new files go in `<campaign folder>/groups/<group>/emails/`. If any file you're about to write already exists there, don't write anything. Reply with a list of those files, explain that writing would replace them, and stop. The project rule is to ask before deleting anything, and replacing a draft counts.

## Step 5: Write one version per group

For each email in `<campaign folder>/emails/` (only the `.md` files directly in that folder), and for each group, write a copy to:

`<campaign folder>/groups/<group>/emails/<same file name>`

**Change only two things:**

1. **The opening line.** This is the first sentence after the greeting. Rewrite it so it speaks to that group:
   - **tea-curious:** people who are new to tea and want to try something different.
   - **gift-buyers:** people who want to give tea to someone else.
   - **daily-drinkers:** people who drink chai every day and want a steady supply.
2. **One example.** Pick one example in the email body, such as a use, a moment or a reason, and swap it for one that fits the group. Change only one.

**Keep everything else exactly the same.** That means:

- the `Subject:` and `Preview:` lines
- the `{{first_name}}` greeting
- the structure, headings, order and the rest of the body
- the one main link, including its button text and address
- the sign-off and the footer, word for word
- every placeholder, such as `{{company_address}}` and `[Monthly price]`

**Follow the brand voice:**

- Write in Roman Urdu (Urdu in English letters), with short sentences and everyday words. No Urdu script.
- No pushy sales talk, no ALL CAPS and no more than one exclamation mark per email.
- Don't add any claim the original doesn't already make. That includes price, quality, health, delivery and stock promises.

## Step 6: Reply with a short summary only

Don't paste the emails. Reply with:

- how many files you wrote, and where (for example: "12 files: 4 emails × 3 groups, in `campaigns/chai-club-launch/groups/`")
- one example opening line per group, taken from the files you wrote

Never send, schedule or trigger any email. This skill only writes draft files.
