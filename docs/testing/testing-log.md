# Testing log: George's pages

This is a record of how we check that George's pages do what our requirements say. It
will cover the **Registration, Log in, Forgot password, Reset password, Navbar, Homepage
and Profile** pages, added one page (or a few small ones) at a time.

Each test says which requirement it checks (the FE / NFR numbers from
`Frontend_requirements.docx`), what we did, what should happen and what actually happened.

## How we test

- **Automated browser tests:** every test is run by a script that opens Chrome and
  clicks, types and checks the result the same way a person would. That makes the tests
  quick to repeat after every change.
- **Checked by hand:** the most important tests are also done by hand by George, in a
  normal browser window. The "By hand" column shows which ones.
- **Phone size first:** tests use a phone-sized window (390 × 844) unless they say
  otherwise, because most of our players will be on phones.
- **Front end only:** these tests check what the pages do in the browser. Testing the
  server and the database themselves is not part of this log.

**Key:** ✅ passed · ❌ failed · ⚠️ found a problem somewhere else

---

## Summary

| Page | Date tested | Version tested | Tests | Passed | Problems found |
|---|---|---|---|---|---|
| Registration | 22 November 2026 | `feature/profile`, commit `9d9b81d` | 19 | 19 | None |
| Log in | 27 November 2026 | `main`, commit `3259205` | 12 | 12 | None |
| Forgot password | 27 November 2026 | `main`, commit `3259205` | 5 | 4 | 1 (see F3) |
| Reset password | 27 November 2026 | `main`, commit `3259205` | 5 | 5 | None |

Registration was tested on the branch where all of George's pages are joined together
with Nora's god selection and chat, so everything was tested working together. From
24 November we test `main`, because the Log in pages have now been merged into it.

---

## Before you start: the pretend server

The backend isn't finished yet, so the pages use a **pretend server** that answers like
the real one would. That means we can test every kind of reply, including the error ones,
by using these special test details:

| Page | Type this | What happens |
|---|---|---|
| Registration | Email `taken@example.com` | Says the email already has an account |
| Registration | Email `offline@example.com` | Acts like the server is down |
| Registration | Any captcha except `2s1` | Says the captcha is wrong |
| Log in | Email `wrong@example.com` | The test script answers "no match" |
| Forgot password | Email `unknown@example.com` | The test script answers "no account with that email" |
| Log in, Forgot password | Email `offline@example.com` | The test script acts like the server is down |
| Reset password | Address ending `?token=expired` | Says the link has expired |
| Reset password | Address ending `?token=offline` | Acts like the server is down |

Anything else counts as "it worked". **These tests will need doing again once the real
server is connected.**

**Log in and Forgot password (from 23 November):** these two pages are now connected to
the team's server code, so they no longer have a pretend server built in. To test just
the pages, the test script answers in the server's place, with the same kind of reply
the real server sends. Reset password still has its pretend server.

---

## Registration (`/registration`)

**Tested:** 22 November 2026

![The Register form after clicking Register with every box empty: a friendly message under each box](screenshots/reg-errors.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| R1 | FE-01: there is a sign-up form. Accessibility: every box has a label | Opened the page | Email, Username, Date of birth, Password, Confirm password, Captcha and the Terms tick box, each with its own label. Passwords hidden | All 7 there, all labelled, passwords hidden as dots, date box opens a date picker | ✅ | |
| R2 | FE-03: clear message when sign-up fails | Clicked Register with everything empty | A message under every box, "Please fix the problems shown above", and the cursor jumps to the first problem | All 7 messages shown (for example "Please enter your email."), cursor moved to Email | ✅ | ✅ 22 Nov |
| R3 | FE-03: email check | Typed `hermes.example.com` (no @) | "That doesn't look like an email..." | Exactly that | ✅ | |
| R4 | FE-03: username rules | Tried `Zeus King` (has a space) and `Ze` (too short) | "Use only letters, numbers and _" and "needs 3 to 20 characters" | Both messages shown | ✅ | |
| R5 | FE-03: password rules | Tried passwords that were too short, had no capital, no small letter, no symbol | A different message for each one | "at least 8 characters", "Add at least one capital letter", "...small letter", "...symbol" | ✅ | |
| R6 | FE-03: passwords match | Typed two different passwords | "The passwords don't match." | Exactly that | ✅ | |
| R7 | Minimum age 13 (team decision) | Tried a date next year, a date in 1899, someone who is 12, and someone who turns 13 today | Future date, very old date and age 12 are stopped. Age 13 is allowed | "That date is in the future", "Please check the year you were born", "Sorry, you need to be 13 or older to join The Descent." Age 13 was accepted | ✅ | |
| R8 | Terms must be ticked | Left the Terms box empty | "Please tick the box to agree before you register." | Exactly that | ✅ | |
| R9 | Registration flowchart: wrong captcha | Typed the captcha `abc` | "That code isn't right", cursor goes back to the captcha box | Both happened | ✅ | |
| R10 | Registration flowchart: email already used | Used `taken@example.com` | "That email already has an account. Try logging in instead." | Exactly that | ✅ | ✅ 22 Nov |
| R11 | NFR-06: server down | Used `offline@example.com` | A friendly message, never a blank page, and the form keeps what you typed | "We can't reach the server right now..." and nothing was lost | ✅ | ✅ 22 Nov |
| R12 | NFR-09: button feedback while sending | Clicked Register and looked at the button straight away | The button says "Registering..." and can't be clicked twice | Both true | ✅ | |
| R13 | Registration flowchart + FE-06: success | Filled everything in correctly | The clouds open, "Welcome, Hermes_1!", then the gods page, and the navbar shows you're logged in | All of that. The gods page opened 4.1 seconds after clicking (1 second for the server, 3 for the clouds) | ✅ | ✅ 22 Nov |
| R14 | NFR-14: passwords never saved in the browser | Looked in the browser's storage after signing up | Empty | Completely empty | ✅ | |
| R15 | NFR-03: works with just a keyboard | Used only Tab, Space and Enter | Tab visits every box in order, Space ticks the Terms box | Email → Username → Date of birth → Password → Confirm → Captcha → Terms → Register. Space ticks the box | ✅ | ✅ 22 Nov |
| R16 | NFR-03: you can see where you are | Tabbed into a box | A clear outline around it | A thick 3px outline | ✅ | |
| R17 | NFR-01: phones to big screens | Checked at 360, 768, 1440 and 1920 pixels wide | No sideways scrolling | None at any size | ✅ | |
| R18 | NFR-04: "reduce motion" | Turned on "reduce motion" and signed up | No cloud animation, and the next page comes sooner | The clouds just disappear, and the gods page opened 2 seconds after clicking instead of 4 | ✅ | ✅ 22 Nov |
| R19 | Getting around | Clicked "Already have an account? Log in" | Goes to Log in | It did | ✅ | |

**A note on R13 and R15:** both failed the first time we ran them. Neither was a bug in
the page: the test didn't wait long enough for the clouds to finish (R13), and in Chrome,
Tab moves through the day, month and year parts of a date box before leaving it (R15).
We fixed the tests, ran everything again and all 19 passed.

---

## Log in (`/login`)

**Tested:** 27 November 2026

![The Log in form after clicking Log in with both boxes empty: a message under each box](screenshots/login-errors.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| L1 | FE-02: there is a log in form | Opened the page | Email and Password boxes with labels, password hidden | As expected | ✅ | |
| L2 | FE-03: clear message when log in fails | Clicked Log in with both boxes empty | A message under each box, cursor on Email | "Please enter your email." and "Please enter your password.", cursor moved to Email | ✅ | ✅ 27 Nov |
| L3 | FE-03: email check | Typed `zeus.example.com` | "That doesn't look like an email..." | Exactly that | ✅ | |
| L4 | Login flowchart: wrong details | Used `wrong@example.com` | "That email or password isn't right." It doesn't say which one, so nobody can use it to find out who has an account | Exactly that | ✅ | |
| L5 | NFR-09: button feedback | Looked at the button while logging in | "Logging in..." and can't be clicked twice | Both true | ✅ | |
| L6 | NFR-06: server down | Used `offline@example.com` | Friendly message, no blank page, the form keeps what you typed | "We can't reach the server right now..." and the email was still there | ✅ | ✅ 27 Nov |
| L7 | Login flowchart: success. NFR-03: Enter works | Typed the details and pressed Enter instead of clicking | The clouds open with a welcome message. (Moving on to the gods page comes with the navbar update, which isn't in `main` yet) | The clouds opened and "Welcome back!" appeared | ✅ | |
| L8 | NFR-14: passwords never saved in the browser | Looked in the browser's storage after logging in | Empty | Completely empty | ✅ | |
| L9 | NFR-10: what people type is shown as plain text only | Logged in as `<b>zeus</b>@example.com` (code hidden in the email) | Nothing on the page turns into real page code | Nothing went bold, the welcome just said "Welcome back!" | ✅ | |
| L10 | Getting around | Clicked "Forgot your password?" and "Create an account" | They go to Forgot password and Register | Both did | ✅ | ✅ 27 Nov |
| L11 | Easy to tap on a phone | Measured the "Forgot your password?" link | At least 24 pixels tall | 31 pixels | ✅ | |
| L12 | NFR-01: phones to big screens | Checked at 360, 768, 1440 and 1920 pixels wide | No sideways scrolling | None at any size | ✅ | |

---

## Forgot password (`/forgot-password`)

**Tested:** 27 November 2026

![The message you get after asking for a reset link](screenshots/forgot-sent.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| F1 | Empty email | Clicked "Send reset link" with nothing typed | "Please enter your email.", cursor on Email | Exactly that | ✅ | ✅ 27 Nov |
| F2 | Email check | Typed `nope` | "That doesn't look like an email..." | Exactly that | ✅ | |
| F3 | Privacy: it can't be used to find out who has an account | Asked for a link for an email that has an account and for `unknown@example.com` | The same reply both times | Different replies: "If ... has an account, we've sent it a link..." for the first, "Something went wrong. Please try again." for the second | ❌ | |
| F4 | NFR-06: server down | Used `offline@example.com` | Friendly message | "We can't reach the server right now..." | ✅ | |
| F5 | Getting around | Clicked "Back to log in" | Goes to Log in | It did | ✅ | |

**About F3:** this passed before the page was connected to the server code on
23 November. The page now shows a different message when the email has no account.
The fix is for the page to show the "If ... has an account" message whatever the reply.
To be fixed and tested again.

---

## Reset password (`/reset-password`, the page the email link opens)

**Tested:** 27 November 2026 (still uses its pretend server)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| P1 | Broken link | Opened the page without the code from the email | A message saying the link isn't complete, with a link to ask for a new one | "This link has expired or isn't complete. Ask for a new one", and the link goes to Forgot password | ✅ | |
| P2 | Password rules | Tried empty boxes, a password with no capital, and two different passwords | The same rules and messages as Register | "Please choose a password.", "Add at least one capital letter (A-Z).", "The passwords don't match." | ✅ | ✅ 27 Nov |
| P3 | Success | Typed a good password twice | "Saving..." on the button, then "Your password has been changed" with a Log in link | All of that | ✅ | ✅ 27 Nov |
| P4 | Old link | Used `?token=expired` | The "expired" message with a link to ask for a new one | Exactly that | ✅ | |
| P5 | NFR-06: server down | Used `?token=offline` | Friendly message | "We can't reach the server right now..." | ✅ | |
