# Email Studio

This studio is for planning and writing email campaigns for a small business. Use it to work out who to email, what to say, and when to send it, then draft the emails themselves.

## Folders

- `brand/`: the business's voice, tone, logo notes, colours and anything else that should make every email sound and look like us.
- `leads/`: information about the people we email, such as audience segments and contact lists.
- `campaigns/`: one subfolder per campaign, holding its plan and the email drafts.
- `notes/`: research, decisions and anything else worth keeping, such as which skills we chose and why.

## Rules

- **Write customer emails in Roman Urdu.** Urdu written in English letters, using short sentences and everyday words. See `brand/voice.md` for details.
- **Write everything else in plain English.** That includes plans, notes and explanations to me. Use short sentences and everyday words. Avoid jargon, and explain any technical term the first time you use it.
- **Never send email to real people.** Draft, plan and preview only. Don't send, schedule or trigger any email to customers or leads, and don't run anything that could, even as a test.
  - **The one exception is Resend, our email service, in practice mode.** Sending through Resend is allowed only to Resend's test addresses (any address ending in `@resend.dev`) and to my own email address. Every other address is off limits.
  - A guard enforces this. It is a hook (a check that Claude Code runs automatically) in `.claude/settings.json` that runs `.claude/hooks/resend-guard.js` before every Resend tool call. It blocks any call that contains an address other than `@resend.dev` or `MY_EMAIL`, any send with no recipient it can check, and every broadcast or automation tool. If the guard itself fails, the call is blocked.
  - Your own address comes from `MY_EMAIL`, which is set in the shell or in the `env` block of `.claude/settings.local.json`. That file is never committed. Don't write a real address into any committed file.
  - Never switch off, weaken or work around the guard. Don't send mail through Resend in any other way, such as a script or `curl`.
- **Ask me before deleting anything.** That includes files, folders, drafts and contacts.

## Brand voice

@brand/voice.md
