---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for email files

These rules apply to every email file in any campaign's `emails/` folder, and only to those files.

Each email file must follow this layout, from top to bottom.

1. **Subject line first.** The first line is `Subject: ...`. The subject is 50 characters or fewer.
2. **Preview line second.** The second line is `Preview: ...`. The preview is 90 characters or fewer. "Preview" means the short line people see after the subject in their inbox.
3. **Greet the reader by name.** Use `{{first_name}}` in the greeting, for example "Assalam-o-Alaikum {{first_name}} ji". `{{first_name}}` is a placeholder. It gets swapped for each person's first name later.
4. **Exactly one main link.** Write it as a button-style link in this form:

   `[Button text](https://kettlebird.example/steep-club)`

   Change the button text to suit the email. Keep the address exactly as it is. Don't add a second main link.
5. **End with our sign-off** from `brand/voice.md`:

   Sahab Jee Store
   [Shop address]
   Timings: [Opening days and hours]
   Phone: [Phone number]

6. **Then the footer.** After the sign-off, add these two lines as plain text. Don't put them inside a code block (a box made with three backticks).

   You're getting this because you joined the Kettlebird Tea waitlist.
   Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

   Copy them exactly. `{{company_address}}` and `{{unsubscribe_url}}` are placeholders too. Leave them as they are.
