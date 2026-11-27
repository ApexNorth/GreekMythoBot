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
| Navbar | 27 November 2026 | `feature/profile-pictures`, commit `f7fdb03` | 6 | 6 | None |
| Homepage | 27 November 2026 | `feature/profile-pictures`, commit `f7fdb03` | 7 | 7 | None |
| Profile | 27 November 2026 | `feature/profile-pictures`, commit `f7fdb03` | 13 | 13 | None |
| Profile pictures | 27 November 2026 | `feature/profile-pictures`, commit `f7fdb03` | 8 | 8 | None |

Registration was tested on the branch where all of George's pages are joined together
with Nora's god selection and chat, so everything was tested working together. From
24 November we test `main`, because the Log in pages have now been merged into it.
The navbar, the homepage and the Profile page aren't in `main` yet (it still has the old
row of links and an empty Home page), so on 27 November they were tested on
`feature/profile-pictures`, the branch where they sit together with Nora's gods page, the
quiz and profile pictures.

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
| Log in (on `feature/profile-pictures`) | Any email and password | Logs in as "Demo Player" |
| Profile | Address ending `?test=offline` / `?test=junk` / `?test=new` | Server down / a broken reply / a brand new player |
| Profile pictures | Saving while the address ends `?test=offline` / `?test=junk` | Server down / a broken reply |

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

---

## Navbar (on every page)

**Tested:** 27 November 2026

![The navbar at 360 pixels wide while logged in: logo, Gods, your profile picture and Log out on one line](screenshots/nav-360.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| N1 | NFR-08: the same navigation on every page (logged out) | Opened Log in while logged out | "The Descent" (home), "Log in" and "Register", with the page you're on marked | All three, and "Log in" marked as the page you're on | ✅ | |
| N2 | Logged-in pages are locked | While logged out, typed the addresses of the gods page, a chat, a quiz and the profile | Each one sends you to Log in | All four did | ✅ | ✅ 27 Nov |
| N3 | FE-04, FE-11, FE-31: logged-in links | Logged in and tried each link | "The Descent" and "Gods" go to the gods page, your profile picture goes to Profile, and there's a "Log out" button | All there and going to the right places | ✅ | |
| N4 | NFR-01: fits on small phones | Logged in, checked at 360 and 1920 wide | Everything on one line, no menu button needed | One line at both sizes. The gods page didn't scroll sideways at 360 either | ✅ | |
| N5 | NFR-03: keyboard | Pressed Tab from the top of a logged-in page | The Descent → Gods → Profile → Log out, each with a clear outline | Exactly that order, each with a 3-pixel dark outline | ✅ | ✅ 27 Nov |
| N6 | FE-04: log out | Clicked "Log out" | Back to the homepage, the navbar shows Log in and Register again, and the gods page is locked again | All of that | ✅ | ✅ 27 Nov |

---

## Homepage (`/`)

**Tested:** 27 November 2026

![The top of the homepage on a phone](screenshots/home-top.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| H1 | FE-05: an opening screen when the website loads | Opened the website | "The Descent" title and all the sections | Title plus "Meet the gods", "What you can do", "For parents and carers" and "Begin your descent" | ✅ | |
| H2 | The Explore button | Clicked "Explore ↓" | Scrolls down to "Meet the gods" | Scrolled smoothly until "Meet the gods" was right at the top | ✅ | ✅ 27 Nov |
| H3 | Sign-up and log-in buttons | Clicked "Sign up free", "Create your free account" and "Log in" | The first two go to Register, the last to Log in | All correct | ✅ | ✅ 27 Nov |
| H4 | Accessibility: pictures described for screen readers | Checked every picture | Every picture has a description, or is marked as decoration | All 14 done: the 3 god pictures are described (for example "Zeus holding lightning bolts, with an eagle on his shoulder"), the other 11 are decoration. 13 only load when you scroll to them, so the page opens faster | ✅ | |
| H5 | NFR-01: phones to big screens | Checked at 360, 768, 1440 and 1920 wide | No sideways scrolling | None | ✅ | |
| H6 | NFR-04: "reduce motion" | Turned on "reduce motion" and clicked "Explore ↓" | Jumps straight to "Meet the gods" instead of scrolling smoothly | It jumped (without the setting, it scrolls smoothly) | ✅ | ✅ 27 Nov |
| H7 | NFR-03: keyboard | Pressed Tab from the top | The Descent → Log in → Register → Explore ↓ → Sign up free | Exactly that order | ✅ | |

---

## Profile (`/profile`)

**Tested:** 27 November 2026

![The top of the Profile page on a phone: your picture, Change picture and the gods](screenshots/profile-top.jpg)

The pretend server starts every player with the same example gods (Zeus 64, Athena 50,
Hermes 45, Ares 0, Kronos 20, Gaia 90) and four gifts, and it's shared with the quiz, so
quiz results show up on Profile.

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| PR1 | FE-31: a profile page for logged-in players | Logged in and clicked your picture in the navbar | "Loading your profile..." for a moment, then "Hello, Demo Player!" | Exactly that | ✅ | ✅ 27 Nov |
| PR2 | The gods in their groups | Looked at the gods | All 18 gods in Olympians, Titans and Primordials | 18 gods in those 3 groups | ✅ | |
| PR3 | FE-32: relationship with each god. Gifts flowchart: 0 means angry | Looked at the example levels | 67-100 "Likes you", 34-66 "Neutral", 1-33 "Dislikes you", 0 "Angry: won't talk to you", no level "Not met yet" | Gaia "Likes you (90 / 100)", Zeus "Neutral (64 / 100)", Kronos "Dislikes you (20 / 100)", Ares "Angry: won't talk to you (0 / 100)", Poseidon "Not met yet" | ✅ | ✅ 27 Nov |
| PR4 | Gifts on the profile (ERD) | Looked at the Gifts section | Each gift with its picture, name and group | Worn Copper Coin (Coins), Faded Papyrus Note (Scrolls), Smooth River Pebble (Stones) and Frankincense Resin Bundle (Incense), all with their pictures | ✅ | |
| PR5 | No Chat buttons on the profile (George's decision) | Looked at every god | No Chat buttons. You choose who to chat with on the gods page | None | ✅ | |
| PR6 | A brand new player | Used `?test=new` | "You haven't met any gods yet" with a "Choose a god" link, "No gifts yet.", and the owl picture | All shown, and "Choose a god" goes to the gods page | ✅ | |
| PR7 | NFR-06: server down | Used `?test=offline`, then clicked "Try again" | Friendly message and a Try again button that really asks again | "We can't reach the server right now...", and Try again showed "Loading..." and asked again | ✅ | |
| PR8 | NFR-12: the server sends back something broken | Used `?test=junk` | A message, not a crash | "Something went wrong loading your profile. Please try again." | ✅ | |
| PR9 | NFR-01: phones to big screens | Checked at 360, 768, 1440 and 1920 wide | No sideways scrolling. One column of gods on phones, two on big screens | No sideways scrolling, one column at 360 and 768, two at 1440 and 1920 | ✅ | |
| PR10 | NFR-02: readable in dark mode | Turned on dark mode | All headings stay dark on the cream card | All headings dark | ✅ | |
| PR11 | FE-04: log out from the profile | Clicked the Log out button at the bottom | Back to the homepage, logged out | It did | ✅ | ✅ 27 Nov |
| PR12 | NFR-03: keyboard | Tabbed from the navbar into the page | Nothing to get stuck on, everything can be reached | After the navbar: "Change picture", then the page's Log out button | ✅ | |
| PR13 | Quiz results show on Profile | Got 4 out of 4 in Zeus's quiz, then opened Profile | Zeus's new favour and the gift he gave are on Profile | Zeus "Likes you (84 / 100)" and the Gilded Laurel Wreath in the gifts | ✅ | |

---

## Profile pictures (on the Profile page)

**Tested:** 27 November 2026

![Choosing a new picture on a phone: six pictures, Phoenix picked with a tick and a thick outline](screenshots/profile-picker.jpg)

| ID | What we checked | What we did | What should happen | What happened | Result | By hand |
|---|---|---|---|---|---|---|
| PP1 | New players start with the owl | Opened Profile as a new player | The owl on Profile and in the navbar, described for screen readers | "Your profile picture: Owl" on Profile, the owl in the navbar | ✅ | |
| PP2 | Opening and closing the picker | Clicked "Change picture", then Cancel; opened it again and pressed Escape | "Choose your picture" with the 6 pictures named; Cancel and Escape close it without changing anything, and the focus goes back to "Change picture" | Owl, Pegasus, Cerberus pup, Dolphin, Hero helmet, Phoenix; both closed it, nothing changed, focus back on "Change picture" | ✅ | ✅ 27 Nov |
| PP3 | Saving a new picture | Picked Phoenix and clicked "Save picture" | "Saving...", then "Picture changed to Phoenix." and the new picture on Profile | Exactly that | ✅ | ✅ 27 Nov |
| PP4 | The navbar shows it too | Looked at the navbar after saving, then logged out and in again | The navbar picture changes straight away and is still there after logging in again | Phoenix in the navbar, and still Phoenix after logging in again | ✅ | ✅ 27 Nov |
| PP5 | NFR-03: keyboard, and not just colour | Opened the picker and used the arrow keys | The arrow keys move between pictures; the picked one has a tick and a thick outline | The focus started on the current picture and moved with the arrows; the picked one showed "✓" and a dark outline | ✅ | ✅ 27 Nov |
| PP6 | NFR-06: server down while saving | Saved with `?test=offline` | A friendly message, and the picker stays open to try again | "We can't reach the server right now...", picker still open | ✅ | |
| PP7 | NFR-12: a broken reply while saving | Saved with `?test=junk` | A message, not a crash | "We couldn't save your picture. Please try again.", picker still open | ✅ | |
| PP8 | NFR-01: phones to big screens | Opened the picker at 360 and 1440 wide | 3 pictures across on phones, 6 on big screens, no sideways scrolling | Exactly that | ✅ | |
