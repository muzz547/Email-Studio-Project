# Email Studio Project

## Keep real contacts private

This repo is **public**. Anyone on the internet can read every file in it, including old versions in the history.

Never commit:

- Real customer names, email addresses or phone numbers. Don't add them to `leads/` or anywhere else.
- Contact lists or exports from an email tool.
- Passwords or API keys (secret codes that let a program use a service, such as an email tool).

Keep these in a private place outside this repo. In plans and drafts, use placeholders like `[Customer name]` or `[Phone number]`.

If something private gets committed by mistake, deleting the file isn't enough, because it stays in the history. Stop and ask for help to remove it properly.

## Setting up Resend

To connect the studio to Resend, our email service, follow [notes/resend-setup.md](notes/resend-setup.md). It works on Mac, Linux and Windows. Your key and email address go in `.claude/settings.local.json`, which is never committed. Copy it from the sample `.claude/settings.local.example.json`.
