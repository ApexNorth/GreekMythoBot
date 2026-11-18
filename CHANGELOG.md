# Changelog: The Descent (GreekMythoBot)

All notable changes to this project, newest first. Dates are in
day month year. Each entry says what changed and why, in plain English.

Headings to use under each date: **Added** (new things), **Changed**
(existing things that work differently), **Fixed** (mistakes put right),
**Removed** (things taken out).

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
