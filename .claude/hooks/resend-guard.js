#!/usr/bin/env node
// Resend guard: runs before every Resend tool call and blocks any call that
// could reach a real person.
//
// Allowed addresses:
//   - anything ending in @resend.dev (Resend's test inboxes)
//   - your own address, read from MY_EMAIL (environment variable, or the
//     "env" block of .claude/settings.local.json, which git ignores)
//
// Rules:
//   1. Tools that send to a whole list (broadcasts, automations, events) are
//      always blocked, because we can't see who is on the list.
//   2. Any other Resend tool is blocked if its input contains an email
//      address that isn't allowed.
//   3. Send-type tools must name at least one allowed recipient.
//   4. If anything goes wrong, the guard blocks (fails closed).
//
// Exit code 2 tells Claude Code to block the tool call.

const fs = require("fs");
const path = require("path");

function block(reason) {
  process.stderr.write(`Resend guard blocked this call: ${reason}\n`);
  process.exit(2);
}

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-broadcast",
  "update-broadcast",
  "duplicate-broadcast",
  "send-inbox-draft",
  "send-event",
  "create-automation",
  "update-automation",
  "duplicate-automation",
  "update-email",
]);

const SEND_TOOLS = new Set([
  "send-email",
  "send-batch-emails",
  "send-new-inbox-email",
  "reply-to-inbox-thread-email",
  "forward-inbox-thread-email",
]);

function ownEmail() {
  if (process.env.MY_EMAIL) return process.env.MY_EMAIL.trim().toLowerCase();
  try {
    const dir = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, "..", "..");
    const local = JSON.parse(
      fs.readFileSync(path.join(dir, ".claude", "settings.local.json"), "utf8")
    );
    const v = local && local.env && local.env.MY_EMAIL;
    return v ? String(v).trim().toLowerCase() : null;
  } catch {
    return null;
  }
}

// Fields that name the sender, not a recipient. Addresses in them are still
// checked, but they don't count as "a recipient the guard can check".
const SENDER_KEY = /^(from|sender|reply_?to)$/i;

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

// Collects every address in the input. Any "@" that isn't part of a plainly
// written address (for example "john doe"@gmail.com or user@[1.2.3.4]) is
// recorded as unreadable, so odd formats can't slip past the check.
function collectEmails(value, out, inSender = false) {
  if (typeof value === "string") {
    const found = value.match(EMAIL_RE) || [];
    found.forEach((e) => out.all.push(e.toLowerCase()));
    if (!inSender) found.forEach((e) => out.recipients.push(e.toLowerCase()));
    const ats = (value.match(/@/g) || []).length;
    if (ats !== found.length) out.unreadable.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectEmails(v, out, inSender));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) =>
      collectEmails(v, out, inSender || SENDER_KEY.test(k))
    );
  }
  return out;
}

try {
  const input = JSON.parse(fs.readFileSync(0, "utf8"));
  const toolName = String(input.tool_name || "");
  const action = toolName.replace(/^mcp__resend__/, "");

  if (ALWAYS_BLOCK.has(action)) {
    block(`"${action}" can reach a whole list of people, so it is never allowed in this studio.`);
  }

  const mine = ownEmail();
  const isAllowed = (e) => e.endsWith("@resend.dev") || (mine && e === mine);

  const found = collectEmails(input.tool_input || {}, { all: [], recipients: [], unreadable: [] });
  if (found.unreadable.length) {
    block(
      `this call has an address the guard can't read: ${found.unreadable.join(", ")}. ` +
        `Write addresses plainly, like name@resend.dev.`
    );
  }

  const bad = [...new Set(found.all.filter((e) => !isAllowed(e)))];
  if (bad.length) {
    block(
      `these addresses are not allowed: ${bad.join(", ")}. ` +
        `Only @resend.dev test addresses and your own address (MY_EMAIL) are allowed.`
    );
  }

  if (SEND_TOOLS.has(action) && found.recipients.length === 0) {
    block(`"${action}" has no recipient the guard can check, so it is blocked to be safe.`);
  }

  process.exit(0);
} catch (err) {
  block(`the guard could not read this call (${err.message}), so it is blocked to be safe.`);
}
