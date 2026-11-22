# Setting up Resend on your computer

Resend is the email service this studio uses. Your Resend settings and your own email address live in one private file: `.claude/settings.local.json`. Git ignores that file, so it never goes to GitHub. This repo is public, so that matters.

The repo has a sample of that file: `.claude/settings.local.example.json`. It only holds placeholders, so it's safe to share.

This works the same on Mac, Linux and Windows, because the settings live in a JSON file (a plain text file of names and values), not in your shell.

## 1. Copy the sample

Run this from the project folder.

Mac or Linux:

```bash
cp .claude/settings.local.example.json .claude/settings.local.json
```

Windows (PowerShell):

```powershell
Copy-Item .claude\settings.local.example.json .claude\settings.local.json
```

Windows (Command Prompt):

```bat
copy .claude\settings.local.example.json .claude\settings.local.json
```

**If you already have `.claude/settings.local.json`**, don't copy over it. Copying would wipe what's there. Open both files and add the four lines from the sample into the `env` block of your file by hand.

## 2. Fill it in

Open `.claude/settings.local.json` in any text editor and change the values.

| Setting | Practice mode (the sample) | Live mode |
|---|---|---|
| `MY_EMAIL` | your own email address | your own email address |
| `RESEND_API_KEY` | `re_practice` | your real key from Resend |
| `RESEND_BASE_URL` | `http://localhost:4000` | `https://api.resend.com` |
| `SENDER_EMAIL_ADDRESS` | `onboarding@resend.dev` | an address on a domain you verified in Resend |

- **`MY_EMAIL`** is the only real address the guards let you send to. Without it, you can only send to `@resend.dev` test addresses.
- **`RESEND_BASE_URL`** must be changed for live mode. With a real key but the practice address, nothing reaches Resend.
- **The API key:** in the Resend dashboard, make the key with **Sending access**, not Full access. That way it can only send email.

Don't paste your key into chat. Don't put it in `.mcp.json`, `.claude/settings.json` or any other file that gets committed.

## 3. Start a new session

Claude Code reads these settings only when a session starts. Close the session and start a new one.

## 4. Check where you are connected

Ask Claude: "list my Resend domains".

- You see your real, verified domain: you're live.
- You see nothing, or made-up data: you're still in practice mode.

**If you set live values but still land in practice mode**, the Resend connection may not be reading the settings file. Set the same values in your system instead, then fully quit and reopen Claude Code:

- Mac or Linux: add lines like `export RESEND_API_KEY="re_..."` to `~/.zshrc` (or `~/.bashrc`).
- Windows: search the Start menu for "environment variables" and add each one under "User variables".

## Windows notes

- **Node.js** must be installed. Both guards and the Resend connection need it. Check with `node --version`.
- **Git for Windows** must be installed. Claude Code on Windows uses its Git Bash to run the guards. Without it, the guards may not run, and then they can't block anything.
- **The Resend connection (in `.mcp.json`) starts with `npx`.** On Windows without WSL (the Linux layer for Windows), `npx` may not start that way. If Resend doesn't connect, add your own private copy of the connection that starts through `cmd /c npx`. Run this in the project folder:

  ```bat
  claude mcp add resend --scope local -- cmd /c npx -y resend-mcp@2.27.1
  ```

  `--scope local` keeps it on your computer only, so the shared `.mcp.json` stays as it is for Mac and Linux users.

## What the guards still do

Practice or live, two guards check every Resend call before it runs (see the rules in `CLAUDE.md`). They only allow sending to `@resend.dev` test addresses and to your own `MY_EMAIL`. They always block broadcasts and automations, which can reach whole lists. Going live doesn't change that.

## If a key leaks

If a key is ever shared or committed by mistake, delete it in the Resend dashboard straight away and make a new one. Deleting the file isn't enough, because it stays in the git history.
