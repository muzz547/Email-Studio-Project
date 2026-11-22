#!/usr/bin/env node
// Send guard: a PreToolUse hook for Resend tool calls.
//
// - send-email and send-batch-emails: every address in to, cc and bcc must
//   end in @resend.dev or match MY_EMAIL. Otherwise the call is blocked.
// - send-broadcast, create-automation, send-inbox-draft and
//   send-new-inbox-email: always blocked, because they can reach whole lists.
// - Anything else: allowed.
//
// Exit code 2 tells Claude Code to block the call. The reason goes to stderr.
// If the guard can't read the call, it blocks (fails closed).
// It runs alongside resend-guard.js; if either one blocks, the call is blocked.

import { readFileSync } from "node:fs";

function block(reason) {
  process.stderr.write(`Send guard blocked this call: ${reason}\n`);
  process.exit(2);
}

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();

// Turns "Name <a@b.com>" into "a@b.com".
function bareAddress(value) {
  const s = String(value).trim();
  const m = s.match(/<([^<>]*)>\s*$/);
  return (m ? m[1] : s).trim().toLowerCase();
}

function isAllowed(address) {
  return address.endsWith("@resend.dev") || (myEmail !== "" && address === myEmail);
}

// to, cc and bcc can each be one address or a list of addresses.
function recipients(email) {
  const out = [];
  for (const field of ["to", "cc", "bcc"]) {
    const v = email?.[field];
    if (v === undefined || v === null) continue;
    for (const item of Array.isArray(v) ? v : [v]) out.push(bareAddress(item));
  }
  return out;
}

try {
  const input = JSON.parse(readFileSync(0, "utf8"));
  const action = String(input.tool_name || "").replace(/^mcp__resend__/, "");
  const toolInput = input.tool_input || {};

  if (ALWAYS_BLOCK.has(action)) {
    block(`"${action}" can reach a whole list of people, so it is never allowed.`);
  }

  if (CHECK_RECIPIENTS.has(action)) {
    const emails = action === "send-batch-emails" ? toolInput.emails : [toolInput];
    if (!Array.isArray(emails) || emails.length === 0) {
      block(`"${action}" has no emails the guard can check.`);
    }
    for (const email of emails) {
      const addresses = recipients(email);
      if (addresses.length === 0) {
        block(`"${action}" has an email with no recipient in to, cc or bcc.`);
      }
      const bad = addresses.filter((a) => !isAllowed(a));
      if (bad.length) {
        block(
          `not allowed: ${[...new Set(bad)].join(", ")}. ` +
            `Only @resend.dev addresses and MY_EMAIL may receive email.`
        );
      }
    }
  }

  process.exit(0);
} catch (err) {
  block(`the guard could not read this call (${err.message}).`);
}
