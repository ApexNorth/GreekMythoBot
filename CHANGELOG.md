# Changelog: The Descent (GreekMythoBot)

All notable changes to this project, newest first. Dates are in
day month year. Each entry says what changed and why, in plain English.

Headings to use under each date: **Added** (new things), **Changed**
(existing things that work differently), **Fixed** (mistakes put right),
**Removed** (things taken out).

---

## 27 November 2026: Testing log, batch 2 Log in, Forgot and Reset password (George)

**Added**
- Batch 2 of `docs/testing/testing-log.md`: 22 tests for the Log in, Forgot password
  and Reset password pages, run on `main` (commit `3259205`) now that these pages are
  merged. 21 passed. One failed: Forgot password now gives a different message when an
  email has no account, so it needs fixing and testing again. Plus two screenshots.
  First run on 24 November, run again on 27 November before uploading (same results);
  the six checks marked "By hand" were done by hand on 27 November.
- A "Front end only" note in "How we test": the log checks what the pages do in the
  browser, not the server or database, so it's clear what the results cover.

**Changed**
- The pretend-server table now explains that Log in and Forgot password are connected to
  the server code, so the test script answers in the server's place for those tests.

## 22 November 2026: Testing log, batch 1 Registration (George)

**Added**
- `docs/testing/testing-log.md`, a record of how George's pages are tested
  against the requirements (FE / NFR numbers), plus a screenshot. This first batch
  covers the Registration page: 19 tests, all passed, 6 of them also checked by
  hand. The other pages will be added in later batches, so the testing can be
  followed step by step and each batch is tested on the day it goes up.

## 22 November 2026: Registration page, captcha (Alex)

**Added**
- Captcha now uses a function to generate a 6-digit code that comprises of 
  a random lowercase, uppercase and number. 


## 19 November 2026: Registration page, minimum age 13 (George)

**Added**
- Register now checks the player is 13 or older and, if not, says "Sorry, you need
  to be 13 or older to join The Descent." The team decided to aim the game at
  13 and up: under UK data protection rules (UK GDPR Article 8 and the ICO
  Children's Code), under-13s would need a parent's consent, which would make
  sign-up much more complicated. The server should check this again.

## 19 November 2026: Registration page, date of birth (George)

**Added**
- A "Date of birth" box after Username (Alex's suggestion), using a date picker.
  It shows a message under the box if it's empty, in the future or before 1900.
  The date is sent to the server with the other details as `dateOfBirth`
  ('YYYY-MM-DD'), so the database will need a column for it.
- `SingleInput` takes an optional `max`, so the date picker can't go past today.

## 18 November 2026: Registration page, step 8 (George)

**Added**
- Two more cloud layers in front. When closed they sit a little further out so
  the clouds look layered, and when opening they slide away faster than the back
  clouds, which gives the reveal some depth.
- A pale sky colour behind the cloud pictures, so the title and form stay
  readable if the pictures don't load (and in dark mode).

**Changed**
- The page's outer box is now a `<main>` element, so screen-reader users can jump
  straight to the form.

**Tested**
- No sideways scrolling and the card fits at 360, 768, 1440 and 1920px wide.
- Lighthouse on phone and desktop: Accessibility 95, Best Practices 100. The
  only accessibility issue left is the Home / Chat / Registration links in the
  shared nav (`App.jsx`), which are hard to read on the light sky.

---

## 18 November 2026: Registration page, step 7 (George)

**Added**
- The form is now sent to the server through one function, `sendRegistration`,
  which already has the real `fetch('/api/register')` code in it. Until the
  backend is ready, a switch (`USE_FAKE_SERVER = true`) uses a pretend server so
  the page can be demoed and tested. Set it to `false` to use the real one.
- The server should reply `{ok: true}`, or `{ok: false, error: 'captcha'}` /
  `{ok: false, error: 'email-taken'}`, as in the Registration flowchart.
- Messages for each way sign-up can fail: wrong captcha (under the captcha box),
  email already used (under Email), and server can't be reached (under the
  button), so the page never just breaks (FE-03, NFR-06, NFR-12).
- The button says "Registering..." and can't be clicked again while sending.
- "Welcome, [username]!" appears over Olympus once the clouds open, using a new
  `openMessage` setting on `CloudGate`. Screen readers read it out.

**Changed**
- The page now only checks that the captcha isn't empty. Whether it's right is
  checked by the server, because only the server will know the real code.

---

## 18 November 2026: Registration page, step 6 (George)

**Added**
- The clouds now open after a successful sign-up: the form fades, the cloud
  walls slide off to each side and Mount Olympus is revealed (FE-06). Done with
  plain CSS, switched on by a new `isOpen` setting on `CloudGate`, so Login can
  use the same effect.
- When "reduce motion" is turned on, the clouds disappear without sliding (NFR-04).
- Once the form has faded, it can't be reached with the Tab key, so keyboard
  users don't get lost in invisible boxes.

**Changed**
- Until the server is connected, a valid form opens the clouds straight away.
  `TODO` notes mark where the server reply and the move to the Travel screen go.

**Fixed**
- The Olympus picture was compressed too much and the sky looked stripy once it
  was fully visible. Re-exported at higher quality (10 KB to 39 KB).

---

## 18 November 2026: Registration page, step 5 (George)

**Added**
- `CloudGate`, a reusable component that puts a full-screen wall of clouds,
  with Mount Olympus behind it, under whatever is inside it. The Registration
  form now sits on the closed clouds. This is the first step towards the clouds
  opening to reveal Olympus after sign-up (FE-06). Login can reuse it.
- Four cloud pictures from `Assets/12. Login Screen Background`, converted to
  WebP with `cwebp -q 80`. They went from 4.9 MB to 140 KB, so the page loads
  quickly and the repo stays small.

**Changed**
- The plain sky colour behind the form is gone; the clouds replace it.
- On pages that use `CloudGate`, the side borders from `index.css` are hidden,
  because they showed as black lines over the clouds. Other pages are unchanged.

---

## 18 November 2026: Registration page, step 4 (George)

**Added**
- A clear message under each field that says exactly what is wrong (for
  example "Add at least one capital letter"), instead of one message for the
  whole form. The box with the problem gets a red border, and the cursor jumps
  to the first one. Our users are 12-16, so the messages use plain words (FE-03).
- Screen readers read each field's message (`aria-invalid` and
  `aria-describedby`), so the errors are not shown by colour alone.
- `SingleInput` takes an `error` prop, so Login can show messages the same way.

**Changed**
- Each check now returns a message instead of true/false. The rules build on
  Alex's original checks: email must look like `name@example.com`; username is
  3-20 letters, numbers or `_`; password needs 8+ characters, a capital, a
  small letter and any symbol (before, only `. , ; : ! ?` counted).
- The password placeholder now shows the password rules up front.
- Turned off the browser's own email pop-up (`noValidate`), so only our
  friendly messages appear.

---

## 18 November 2026: Registration page, step 3 (George)

**Added**
- Greek pottery styling for the Registration page: a cream card with a thick
  black outline and a thin terracotta line inside, pill-shaped inputs, and a
  black Register button that turns terracotta on hover. Matches the team's
  agreed colours and the UI element art.
- `SingleInput.css`, so every page that uses `SingleInput` (e.g. Login) gets the
  same input style.
- Clear focus rings on inputs, the checkbox and the button, so keyboard users
  can see where they are (NFR-03).
- Mobile layout below 600px. Tested at 360, 390 and 768px with no sideways
  scrolling (NFR-01).
- Button animations switch off when the device is set to reduce motion (NFR-04).

**Fixed**
- In dark mode the checkbox showed as a dark square on the cream card. The page
  now always uses light form controls.

---

## 18 November 2026: Registration page, step 2 (George)

**Added**
- Confirm password field, so a typo in the password is caught before the
  account is made.
- "I agree to the Terms and Privacy Policy" checkbox, which must be ticked to
  register, because we store personal details (email).
- Results now show as a message on the page instead of a pop-up, and screen
  readers read it out (`role="alert"`).
- `TODO BACKEND` markers where the captcha and the register request will connect
  to the server.

**Changed**
- Fields now follow the agreed list and the Figma wireframe: Email, Username,
  Password, Confirm password, Captcha, terms checkbox, Register button.
- The fields are now a real `<form>`, so pressing Enter submits it (keyboard use).
- Page heading is "The Descent" with a "Register" card title, as in the wireframe.

**Fixed**
- The captcha check was called without the typed code, so it always failed.
- Removed `alert()` pop-ups and `console.log` debugging.

---

## 18 November 2026: Registration page, step 1 (George)

**Added**
- This changelog, so the team can see how the project changed over time and why.
- A `<label>` for every input in `SingleInput`, so screen readers can name each
  field and clicking the label focuses the box (accessibility, WCAG 2.2).

**Changed**
- `SingleInput` now takes `id`, `label` and `type` props, so the same component
  can be used for email, password and text fields.

**Fixed**
- Every input had the same `id="user-input"`. Each input now has its own id, so
  labels point at the right box.
- The password field showed the password as plain text. It now uses
  `type="password"`.
- Removed an unused `useState` import from `SingleInput`.

---

## 16 November 2026: Registration placeholder (Alex)

**Added**
- First Registration page with email, password, username and captcha checks.
  Uses placeholders until the database is ready.

---

## 15 November 2026: Routing (Alex)

**Added**
- React Router with Home and Chat pages, and a `components` folder.

---

## 13 October 2026: Project started (Alex)

**Added**
- Base project: React + Vite front end, Express back end, and one command
  (`npm run dev`) to run both.
