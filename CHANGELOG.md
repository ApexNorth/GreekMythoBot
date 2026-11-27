
# Changelog

## 27 November 2026: Quiz step 3b: styles for tries and gifts (George)

**Added**
- Styles for the new quiz parts, in Nora's look: the angry-god warning in a coral outline,
  "Tries left today" in gold, the gift in a gold-bordered box with its picture, and
  "Reset for demo" as a small underlined link under "Back to the gods".
- Buttons look faded and can't be clicked while the server is answering (NFR-09).

**Tested**
- Contrast at least 4.5:1 on the new text (the coral warning has no tinted background,
  which would have dropped it to about 4.4:1). No sideways scrolling at 360 or 1920px.

## 27 November 2026: Quiz step 3a: tries, scoring and gifts (George)

**Added**
- Gifts: get 3 or more of the 4 questions right and the god gives you a gift from their own
  gift group (Alex's list, e.g. Zeus gives Gold, Ares gives Weapons), picked at random from
  the ones you don't have yet. The results show its picture and name, and it appears on
  your Profile. If you already have them all, the results say so.
- 2 tries per god per day (George's rule). A try counts when you press "Start quiz", so
  quitting halfway doesn't give a free retry. The start screen says how many are left,
  and after 2 tries the page says "Come back tomorrow".
- "Reset for demo" under "Come back tomorrow", so all of this can be shown in a demo. It
  only appears while the pretend server is on and goes away with the real server.
- Angry gods (favour 0) can still be quizzed: the start screen says the god is angry and
  that doing well is how to win back their favour.
- The score is added up by the server, not the browser, and each question only counts
  once (so nobody can farm favour). Where the real server goes: `TODO BACKEND` notes for
  `GET /api/quiz/info`, `POST /api/quiz/start` and `POST /api/quiz/finish`.
- `data/gifts.js` (which gift group each god likes, and the gifts in each group, copied
  from the database) and `utils/giftPictures.js` (finds a gift's picture by its name,
  now shared by Profile and the Quiz instead of living in Profile).

**Fixed**
- Going straight from one god's quiz to another (e.g. with the browser's Back button)
  kept the first quiz's answers and score. Each god now starts a fresh quiz.

**Tested**
- Every case with the pretend server: winning gifts, owning every gift, a low score, an
  angry god, no tries left + reset, a god without a quiz yet, and the server being
  unreachable at the start and at the end (the player can try again).

## 26 November 2026: Pictures for all 43 gifts (George)

**Added**
- A picture for every gift in Alex's list (43, in `frontend/src/assets/gifts/`), drawn in
  the same Greek pottery sticker style as the rest of the site. Each file is named after
  the gift (e.g. "Worn Copper Coin" -> `worn-copper-coin.webp`), so Profile shows them
  straight away and the quiz can use them when it starts giving gifts.
- Shrunk to small WebP files (about 10 KB each, 408 KB in total instead of 44 MB) so
  pages stay quick to load.

## 26 November 2026: Quiz step 2c: the Quiz page in Nora's look (George)

**Added**
- `Quiz.css`: the Quiz page now looks like Nora's Gods page (navy card, gold border,
  Georgia headings, gold pill buttons) on her background for the god's age, so the two
  pages match. Answers are big rounded boxes that are easy to tap on phones.
- The god's favour bar is gold on navy, under the god's name. It slides to its new size
  after each answer (it just jumps if the player has turned on reduced motion, NFR-04).
- The right answer gets a green border and the wrong pick a coral one, as well as the
  words "Right answer" / "Your answer", so it doesn't rely on colour alone.

**Tested**
- All text on the card has a contrast of at least 5.3:1 (needs 4.5:1), with visible
  focus rings on the answers and buttons.
- No sideways scrolling at 360, 768, 1440 and 1920px. No errors in the console.

## 26 November 2026: Quiz step 2b: the Quiz page (George)

**Added**
- A Quiz page for each god at `/quiz/<god>` (logged-in players only). It starts with the
  god's picture, how much the god likes you and a Start button, then asks 4 questions
  one at a time, each with 3 answers. After each answer it shows "Correct!" or "Not
  quite.", marks the right answer (and yours, if it was wrong) and gives a short "Did
  you know?" fact, so players learn something either way.
- The god's favour is shown as a word ("Neutral", "Likes you"...), a bar out of 100 and
  the number, and it changes straight after every answer (George asked for this). The
  feedback says what happened, e.g. "+5 favour. Zeus now likes you!" or "Ares's favour
  can't go any lower." The results show your score and how the favour changed overall.
- Messages for when the favour can't load or an answer can't be sent, so the page never
  breaks (NFR-06, NFR-12). "Check answer" says "Checking..." and can't be clicked twice.

**Changed**
- The Quiz button on each god card on the Gods page now opens that god's quiz (it was
  greyed out). It also gets a hover and focus colour like the Chat button. Nora agreed.

**Tested**
- Zeus goes from 64 (Neutral) to 69 (Likes you) with one right answer; angry Ares stays
  at 0 on a wrong answer and goes to 5 on a right one; Profile shows the new numbers.
- Works with just a keyboard: Tab to an answer, arrow keys to change it, Enter to check,
  and the focus moves to "Next question" and then to the next question's heading.
  "Pick an answer first." shows if you check without choosing.
- `?test=offline` shows the can't-reach-server messages. No errors in the console.

## 26 November 2026: Quiz step 2a: quiz questions and favour rules (George)

**Added**
- Questions for Zeus, Ares and Hermes (`data/quizzes.js`): 4 each, 3 answers to choose
  from, and a short "Did you know?" fact for after answering. The other 15 gods come in a
  later step.
- The pretend server can now give one god's favour and mark a quiz answer. A right
  answer gives +5 favour and a wrong one takes 3 away, always staying between 0 and 100
  (agreed 26 Nov). The new favour is saved, so Profile shows it too. With the real server,
  marking the answer and saving the favour happen on the server (`TODO BACKEND`).

**Changed**
- The words for how a god feels about you ("Likes you", "Neutral", "Dislikes you",
  "Angry") moved from the Profile page into `utils/relationship.js`, so the Quiz page
  uses exactly the same words and limits.

## 26 November 2026: Quiz step 1: Profile joins Nora's branch, one pretend server (George)

**Changed**
- The quiz is built on Nora's new Gods page (`feature/god-selection-redesign`), so the
  Profile page was brought into that branch. It merged in with no clashes.
- The Profile page's pretend server moved into `utils/demoServer.js`, which the Quiz will
  share. That way, when a quiz changes a god's favour or gives you a gift, Profile shows
  it straight away in the demo.
- The pretend replies now use the same names as Alex's database (`godName`, `favor`,
  `giftName`, `groupName`), so connecting the real server later needs fewer changes.
- The demo starts with gods in every mood (Zeus nearly "Likes you", Ares angry) and four
  gifts from Alex's gift list instead of the old made-up ones (honey, pomegranate...).
- Gift pictures are now found by the gift's name (e.g. `assets/gifts/worn-copper-coin.webp`),
  ready for the new gift art. Until then gifts show the gift box icon.

**Tested**
- Profile still shows the normal, new-player (`?test=new`), server-down (`?test=offline`)
  and broken-reply (`?test=junk`) states, with no errors in the console.

## 21 November 2026: Profile page step 4: Log out and final checks (George)

**Added**
- A Log out button at the bottom of the Profile page (FE-04). It works the same as the
  navbar's Log out: you go back to the homepage and the navbar shows Log in and Register
  again. It also shows when the profile fails to load, so you can always log out.

**Removed**
- The Chat button on each god. Players should go to the gods page (the Gods link in the
  navbar) to choose who to chat with, so the profile is only for seeing how you're
  getting on with them.

**Fixed**
- The "Relationships" and "Gifts" headings were almost invisible in dark mode, because
  the shared `index.css` makes headings light in dark mode. They now always use the
  dark text colour (NFR-02).

**Tested**
- No sideways scrolling at 360, 390, 768, 1440 and 1920px. Usable with just a keyboard
  (Tab to the profile icon, Enter, Tab to Log out) with a visible focus ring. Lighthouse
  (phone, logged in): Accessibility 100, Best Practices 100.

## 21 November 2026: Profile page step 3: gifts (George)

**Added**
- A Gifts section at the bottom of the Profile page, like the bottom row of the
  Figma wireframe. It lists the gifts on the player's profile (PROFILE.gifts in the
  ERD), each with its name and type (`gift_name`, `gift_type`).
- Honey, pomegranate, golden apples and oak wreath reuse the small pictures from the
  homepage. Any other gift gets a simple gift box icon, so a new gift from the server
  never shows a broken picture.
- Players with no gifts see "No gifts yet."

## 20 November 2026: Profile page step 2: relationships (George)

**Added**
- The Profile page now shows how the player is getting on with every god (FE-32),
  grouped into Olympians, Titans and Primordials in the same order as God Selection.
- Each god has a round picture, their name, a feather icon with a word and a bar out
  of 100: **Likes you** (67-100), **Neutral** (34-66), **Dislikes you** (1-33) or
  **Angry: won't talk to you** (0, matching the Gifts flowchart). Gods the player
  hasn't met yet say **Not met yet**. The word means it doesn't rely on colour alone.
- A Chat button on each god opens their chat. Angry gods have no Chat button, because
  they won't talk to you.
- New players see "You haven't met any gods yet" with a link to choose a god.
- 18 small round god pictures (128px WebP, 176 KB in total) made from the god
  artwork, so the page doesn't load the 2 MB originals.

**Changed**
- The profile card is wider (960px) so the gods sit in two columns on big screens.

## 20 November 2026: Profile page step 1 (George)

**Added**
- A Profile page at `/profile` (FE-31), opened from the round profile icon in the
  navbar. Only logged-in players can open it; anyone else is sent to Log in, the same
  as god selection and chat. Until now the icon led to an empty page.
- It greets the player by name and shows a message while it loads. If the server
  can't be reached or sends back something strange, it says so with a Try again button
  instead of showing a blank page (NFR-06, NFR-12).
- Until the server is ready, a pretend server answers (`TODO BACKEND: GET /api/profile`).
  Its reply uses the names from our database plan (ERD) so the backend can match it.

## 20 November 2026

### Added
- Added initial parallax backgrounds for Ouranos, Chronos, Gaia, Nyx and Tartarus.
- Added Chaos to the god selection assets.
- Added login protection for God Selection and individual god chats.

### Changed
- Updated Zeus's scene to use his complete character image.
- Moved the background image imports and scene configurations into a separate `parallaxScenes.js` file to organise the code.
- Connected God Selection and God Chat to the homepage, login and navbar.
- Moved God Selection to `/travel` so the homepage can use `/`.
- Updated login and registration to open God Selection after the cloud animation.
- Updated the Back to God Selection link and logout navigation.

### Fixed
- Fixed the React Fast Refresh lint error in `ParallaxScene.jsx`.

### Removed
- Removed the separate Zeus eagle and lightning images after updating his character artwork.

## 19 November 2026: Navbar step 3: tidy up (George)

**Changed**
- On the cloud pages (Log in, Register, Forgot / Reset password) the navbar now
  stretches across the whole screen instead of sitting in a 1126px box.
- The page fills exactly the space under the navbar, so Log in no longer scrolls
  a little on bigger screens.
- The card's title ("Log in", "Register" ...) is now the page's main heading.

**Removed**
- The big "The Descent" heading above the card, because the navbar already shows
  the name and it appeared twice.

**Tested**
- No sideways scrolling and the navbar stays on one line at 360, 768, 1440 and
  1920px, logged in and logged out. Lighthouse (phone): Accessibility 100, Best
  Practices 100. The old nav-link contrast problem is gone.

## 19 November 2026: Registration page, minimum age 13 (George)

**Added**
- Register now checks the player is 13 or older and, if not, says "Sorry, you need
  to be 13 or older to join The Descent." The team decided to aim the game at
  13 and up: under UK data protection rules (UK GDPR Article 8 and the ICO
  Children's Code), under-13s would need a parent's consent, which would make
  sign-up much more complicated. The server should check this again.

## 19 November 2026: Navbar step 2: connected to Log in and Register (George)

**Added**
- The navbar now knows if you're logged in. After logging in or registering it
  shows **Gods** (back to picking a god), a round **profile** icon and **Log out**
  (FE-04, FE-11, FE-31). Logging out takes you home and brings back Log in and Register.
- `App.jsx` keeps track of whether you're logged in and passes it to the navbar.
  Nothing is saved in the browser (NFR-14). Until the server can check for a login
  session, refreshing the page logs you out (`TODO BACKEND` notes in `App.jsx`).

**Changed**
- Brought the Log in, Register, Forgot password and Reset password pages into the
  navbar branch so they can be connected. The old plain links in `App.jsx` are
  replaced by the navbar on every page.

## 19 November 2026: Navbar step 1 (George)

**Added**
- One shared navbar for the top of every page (`components/Navbar.jsx`) in the
  pottery style: "The Descent" on the left (goes home), "Log in", and "Register" as
  a pill button. It replaces the plain Home / Chat links, which were too faint to
  read on the light background (1.7:1 contrast, NFR-02). It highlights the page
  you're on, works with the keyboard and fits on one line at 360px.

**Removed**
- The Chat link at the top, because you need to pick a god before you can chat.

## 19 November 2026: Login page, step 5: Reset password (George)

**Added**
- A "Choose a new password" page at `/reset-password`. It's the page the emailed
  reset link opens (`/reset-password?token=...`). It sends the token and the new
  password to the server (`POST /api/reset-password`), then says the password has
  changed with a link to log in. Uses a pretend server until the backend is ready.
- If the link has expired, was already used or is missing its token, the page
  says so and links back to ask for a new one, instead of showing a broken form.

**Changed**
- The password strength rules and the "passwords match" check moved into
  `utils/checks.js` (as `checkNewPassword` and `checkConfirmPassword`), so Register
  and Reset password use exactly the same rules.

## 19 November 2026: Login page, step 4: Forgot password (George)

**Added**
- A "Forgot your password?" link under the Password box on Log in, so players who
  forget their password aren't locked out.
- A Forgot password page at `/forgot-password`: type your email and the server
  (`POST /api/forgot-password`) sends a link to choose a new password. It always
  gives the same answer ("If that email has an account, we've sent it a link"), so
  nobody can use it to find out which emails have accounts. Uses a pretend server
  until the backend is ready, with the same "can't reach the server" message.

**Changed**
- The bold, terracotta-underlined link style now applies to every link in a form
  card, not only the one at the bottom, so all the form links look the same.

## 19 November 2026: Login page, step 2 (George)

**Added**
- Log in now sends the email and password to the server (`POST /api/login`), with
  the button greyed out ("Logging in...") so it can't be clicked twice. Until the
  server is ready, a pretend server answers so the page can be tested.
- Clear messages when the email or password is wrong (FE-03) and when the server
  can't be reached (NFR-06). The wrong-details message doesn't say which one was
  wrong, so nobody can use it to find out which emails have accounts.
- When the details are right the clouds open with "Welcome back, <name>!"
  (FE-06). An odd reply from the server shows a message instead of crashing (NFR-12).

## 19 November 2026: Login page, step 1 (George)

**Added**
- A Log in page at `/login` with Email and Password boxes, on the same cloud wall
  as Register (FE-02). It shows a message under a box that's empty or has an
  email that doesn't look right. Sending to the server comes in the next step.
- Links between the two forms: "New here? Create an account" on Log in and
  "Already have an account? Log in" on Register, so nobody gets stuck.

**Changed**
- The cream card, page layout and big black button moved out of `Registration.css`
  into a reusable `FormCard` component, so Register and Log in share one look
  instead of copying the same CSS (NFR-07, NFR-08). Register looks the same as before.
- The email check moved into `utils/checks.js` so both pages use the same rules.

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
