# Changelog: The Descent (GreekMythoBot)

All notable changes to this project, newest first. Dates are in
day month year. Each entry says what changed and why, in plain English.

Headings to use under each date: **Added** (new things), **Changed**
(existing things that work differently), **Fixed** (mistakes put right),
**Removed** (things taken out).

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
