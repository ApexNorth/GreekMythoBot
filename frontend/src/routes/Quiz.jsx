import {useState, useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import SelectionParallax from '../components/SelectionParallax.jsx';
import quizzes from '../data/quizzes.js';
import {getQuizInfo, sendAnswer, startQuiz, finishQuiz, resetQuizTries} from '../utils/demoServer.js';
import {describeRelationship} from '../utils/relationship.js';
import {giftPicture} from '../utils/giftPictures.js';
import './Quiz.css';

// TODO BACKEND: set this to false once the quiz routes (info, start, answer, finish) work on the server.
const USE_FAKE_SERVER = true;

// Quiz rules (George, 26 Nov). The server checks them; the page only uses them for its messages.
const TRIES_PER_DAY = 2;
const GIFT_SCORE = 3;
const CANT_REACH = "We can't reach the server right now. Please try again in a moment.";

// Nora's god pictures (assets/gods/zeus.png ...), the same ones the Gods page shows
const godPictures = import.meta.glob('../assets/gods/*.png', {eager: true, query: '?url', import: 'default'});

/** Turns the god's id from the web address into their name, e.g. "zeus" -> "Zeus". */
function toGodName(id){
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/** Asks the server how much this god likes the player and how many tries are left today: {ok, godName, favor, triesLeft}. */
async function loadQuizInfo(godName){
  if (USE_FAKE_SERVER) {return getQuizInfo(godName);}

  // TODO BACKEND: GET the god's favour (Alex's fetchRelationship) + quiz tries left today (2 per god, new ones each day)
  const response = await fetch(`/api/quiz/info?god=${encodeURIComponent(godName)}`);
  return response.json();
}

/** Starts the quiz, using up one of today's tries: {ok: true, triesLeft} or {ok: false, error: 'no-tries'}. */
async function startTry(godName){
  if (USE_FAKE_SERVER) {return startQuiz(godName);}

  // TODO BACKEND: POST /api/quiz/start { godName }, counts a try (refuse with 'no-tries' after 2 today)
  const response = await fetch('/api/quiz/start', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({godName}),
  });
  return response.json();
}

/** Sends one answer. The server marks it and saves the new favour: {ok, correct, answer, favor}. */
async function checkAnswer(godName, questionNumber, choice){
  if (USE_FAKE_SERVER) {return sendAnswer(godName, questionNumber, choice);}

  // TODO BACKEND: POST /api/quiz/answer { godName, questionNumber, choice } (+5 favour right, -3 wrong, kept 0-100)
  const response = await fetch('/api/quiz/answer', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({godName, questionNumber, choice}),
  });
  return response.json();
}

/**
 * Ends the quiz. The server adds up the right answers itself (never trust the browser's score) and,
 * for 3 or more, gives a gift from the god's gift group: {ok, score, gift: {giftName, groupName} or null, hasAllGifts}.
 */
async function finishTry(godName){
  if (USE_FAKE_SERVER) {return finishQuiz(godName);}

  // TODO BACKEND: POST /api/quiz/finish { godName }, saves the gift in the player's profile
  const response = await fetch('/api/quiz/finish', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({godName}),
  });
  return response.json();
}

/** Tries left from the server (0, 1 or 2), or null if it isn't a sensible number (NFR-12). */
function readTries(value){
  return Number.isInteger(value) && value >= 0 ? Math.min(TRIES_PER_DAY, value) : null;
}

/** The gift from the server's reply as {name, group}, or null if there isn't a proper one. */
function readGift(gift){
  if (!gift || typeof gift.giftName !== 'string' || gift.giftName === '') {return null;}
  return {name: gift.giftName, group: typeof gift.groupName === 'string' ? gift.groupName : ''};
}

/** A favour number from the server, kept between 0 and 100, or null if it isn't a number (NFR-12). */
function readFavour(value){
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : null;
}

/** A short line under the score, so every result feels like progress. */
function describeScore(score, total, name){
  if (score === total) {return `Perfect! ${name} is impressed.`;}
  if (score >= total - 1) {return `Great work! ${name} is pleased with you.`;}
  if (score > 0) {return 'Good try! Every answer teaches you something new.';}
  return 'Not this time, but now you know the answers.';
}

/** What the last answer did to the god's favour, in words, e.g. "+5 favour. Zeus now likes you!" */
function describeChange(name, before, after){
  const change = after - before;
  let text = change > 0 ? `+${change} favour.` : `${change} favour.`;
  if (change === 0) {text = after === 0 ? `${name}'s favour can't go any lower.` : `${name} can't like you any more than this!`;}

  // Say so when the god's mood changes, worded for going up or down (e.g. Neutral -> Likes you)
  const oldMood = describeRelationship(before).mood;
  const newMood = describeRelationship(after).mood;
  const better = {
    dislike: `${name} isn't angry with you any more.`,
    neutral: `${name} now feels neutral about you.`,
    like: `${name} now likes you!`,
  };
  const worse = {
    neutral: `${name} doesn't like you as much now.`,
    dislike: `${name} now dislikes you.`,
    angry: `${name} is now angry with you!`,
  };
  const moods = change > 0 ? better : worse;
  return oldMood === newMood ? text : `${text} ${moods[newMood]}`;
}

/** The god's favour: their mood in words, a bar out of 100 and the number (same words as Profile). */
function FavourBar({name, favour}){
  const {word, mood} = describeRelationship(favour);
  return (
    <div className={`quiz-favour quiz-favour-${mood}`}>
      <p className="quiz-favour-word">{name}&apos;s favour: <strong>{word}</strong></p>
      <p className="quiz-favour-level">
        <meter min="0" max="100" value={favour} aria-label={`${name}'s favour`}></meter>
        <span>{favour} / 100</span>
      </p>
    </div>
  );
}

/** The end of the quiz: the gift the god gave (picture + name), or how to earn one. */
function QuizGift({name, score, reward}){
  if (reward && reward.gift){
    const picture = giftPicture(reward.gift.name);
    return (
      <div className="quiz-gift">
        {/* Decorative: the gift's name is written right below */}
        {picture && <img src={picture} alt="" width="96" height="96"/>}
        <p>{name} gave you a gift: <strong>{reward.gift.name}</strong>! You&apos;ll find it on your Profile.</p>
      </div>
    );
  }
  if (reward && reward.hasAllGifts) {return <p>{name} is pleased, but you already have every gift {name} can give.</p>;}
  if (score >= GIFT_SCORE) {return null;}
  return <p>Get {GIFT_SCORE} or more right to earn a gift from {name}.</p>;
}

/** One god's quiz: 4 questions, one at a time, then the score and maybe a gift. id is e.g. 'zeus'. */
function GodQuiz({id}){
  const name = toGodName(id);
  const quiz = quizzes[id];
  const picture = godPictures[`../assets/gods/${id}.png`];

  const [stage, setStage] = useState('intro');
  const [number, setNumber] = useState(0);
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState('');
  const [favour, setFavour] = useState(null);
  const [startFavour, setStartFavour] = useState(null);
  const [favourStatus, setFavourStatus] = useState('loading');
  const [triesLeft, setTriesLeft] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [reward, setReward] = useState(null);
  const headingRef = useRef(null);
  const nextRef = useRef(null);
  const startRef = useRef(null);
  const focusStart = useRef(false);

  const isChecked = result !== null;
  const total = quiz ? quiz.questions.length : 0;
  const question = quiz ? quiz.questions[number] : null;

  // When the page opens, load how much the god likes the player and how many tries are left today
  useEffect(() => {
    if (!quiz) {return;}
    let isCurrent = true;
    loadQuizInfo(name)
      .then((reply) => {
        if (!isCurrent) {return;}
        const isOk = reply && reply.ok === true;
        const level = isOk ? readFavour(reply.favor) : null;
        const tries = isOk ? readTries(reply.triesLeft) : null;
        setFavour(level);
        setStartFavour(level);
        setFavourStatus(level === null ? 'failed' : 'ready');
        setTriesLeft(tries);
        if (tries === 0) {setStage('no-tries');}
      })
      .catch(() => {
        if (isCurrent) {setFavourStatus('failed');}
      });
    // Ignore a reply that arrives after the player has left the page
    return () => {isCurrent = false;};
  }, [quiz, name]);

  // Move the keyboard focus to whatever just changed, so keyboard and screen reader users keep their place
  useEffect(() => {
    if (stage === 'intro'){
      // After "Reset for demo", go straight to the Start button
      if (focusStart.current) {startRef.current?.focus();}
      focusStart.current = false;
      return;
    }
    if (isChecked) {nextRef.current?.focus();}
    else {headingRef.current?.focus();}
  }, [stage, number, isChecked]);

  // Start the quiz: the server uses up one of today's tries (or says there are none left)
  const handleStart = async () => {
    setHint('');
    setIsBusy(true);
    try {
      const reply = await startTry(name);
      if (reply && reply.ok === true){
        setTriesLeft(readTries(reply.triesLeft));
        setStage('question');
      } else if (reply && reply.error === 'no-tries'){
        setTriesLeft(0);
        setStage('no-tries');
      } else {
        setHint('Something went wrong starting the quiz. Please try again.');
      }
    } catch {
      setHint(CANT_REACH);
    }
    setIsBusy(false);
  };

  // Demo only: give the tries back so the quiz can be shown again
  const handleReset = async () => {
    setHint('');
    setIsBusy(true);
    try {
      const reply = await resetQuizTries(name);
      if (reply && reply.ok === true){
        setTriesLeft(readTries(reply.triesLeft));
        focusStart.current = true;
        setStage('intro');
      } else {
        setHint('Something went wrong. Please try again.');
      }
    } catch {
      setHint(CANT_REACH);
    }
    setIsBusy(false);
  };

  // Send the picked answer; the server marks it and changes the god's favour
  const handleCheck = async (e) => {
    e.preventDefault();
    if (picked === null) {
      setHint('Pick an answer first.');
      return;
    }
    setHint('');
    setIsSending(true);
    try {
      const reply = await checkAnswer(name, number, picked);
      const newFavour = reply && reply.ok === true ? readFavour(reply.favor) : null;
      if (newFavour === null || typeof reply.correct !== 'boolean' || !Number.isInteger(reply.answer)){
        setHint('Something went wrong checking your answer. Please try again.');
      } else {
        // No "before" number if the favour didn't load at the start, so no change to describe
        const change = favour === null ? '' : describeChange(name, favour, newFavour);
        setResult({correct: reply.correct, answer: reply.answer, change});
        setFavour(newFavour);
        if (reply.correct) {setScore(score + 1);}
      }
    } catch {
      setHint(CANT_REACH);
    }
    setIsSending(false);
  };

  // After the last answer: the server adds up the score and decides the gift, then show the results
  const handleFinish = async () => {
    setHint('');
    setIsBusy(true);
    try {
      const reply = await finishTry(name);
      if (reply && reply.ok === true){
        setReward({gift: readGift(reply.gift), hasAllGifts: reply.hasAllGifts === true});
        setPicked(null);
        setResult(null);
        setStage('results');
      } else {
        setHint('Something went wrong adding up your score. Please try again.');
      }
    } catch {
      setHint(CANT_REACH);
    }
    setIsBusy(false);
  };

  // Go to the next question, or finish after the last one
  const handleNext = () => {
    if (number + 1 < total){
      setPicked(null);
      setResult(null);
      setNumber(number + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <main className="quiz-page">
      <SelectionParallax era={quiz ? quiz.era : 'Olympians'} />

      <section className="quiz-card" aria-labelledby="quiz-title">
        {/* Decorative: the god's name is in the heading right below */}
        {picture && <img className="quiz-god" src={picture} alt="" width="120" height="120"/>}
        <h1 id="quiz-title">{name}&apos;s quiz</h1>

        {/* A god with no quiz (or a made-up address) */}
        {!quiz && (
          <>
            <p>There&apos;s no quiz for {name} yet.</p>
            <Link className="quiz-button" to="/travel">Back to the gods</Link>
          </>
        )}

        {/* How much the god likes the player, updated after every answer */}
        {quiz && favourStatus === 'loading' && <p className="quiz-favour-note" role="status">Loading {name}&apos;s favour...</p>}
        {quiz && favourStatus === 'failed' && <p className="quiz-favour-note">We couldn&apos;t load {name}&apos;s favour right now.</p>}
        {quiz && favour !== null && <FavourBar name={name} favour={favour}/>}

        {quiz && stage === 'intro' && (
          <>
            {favour === 0 && (
              <p className="quiz-angry">{name} is angry with you right now. Do well in the quiz to win back {name}&apos;s favour.</p>
            )}
            <p>How well do you know {name}? Answer {total} questions to find out. Get {GIFT_SCORE} or more right to earn a gift!</p>
            {triesLeft !== null && <p className="quiz-tries">Tries left today: {triesLeft} of {TRIES_PER_DAY}</p>}
            <button type="button" ref={startRef} className="quiz-button" onClick={handleStart} disabled={isBusy}>
              {isBusy ? 'Starting...' : 'Start quiz'}
            </button>
            <p className="quiz-hint quiz-hint-below" role="status">{hint}</p>
          </>
        )}

        {/* Both of today's tries used */}
        {quiz && stage === 'no-tries' && (
          <>
            <h2 ref={headingRef} tabIndex="-1">Come back tomorrow</h2>
            <p>You&apos;ve used both of today&apos;s tries for {name}&apos;s quiz. {name} will be ready for you again tomorrow.</p>
            <Link className="quiz-button" to="/travel">Back to the gods</Link>
            {/* Demo only: this link disappears once the real server is used */}
            {USE_FAKE_SERVER && (
              <p className="quiz-demo">
                <button type="button" className="quiz-link-button" onClick={handleReset} disabled={isBusy}>
                  {isBusy ? 'Resetting...' : 'Reset for demo'}
                </button>
              </p>
            )}
            <p className="quiz-hint" role="status">{hint}</p>
          </>
        )}

        {/* One question at a time: pick an answer, check it, then see the right one and a fact */}
        {quiz && stage === 'question' && (
          <form onSubmit={handleCheck} noValidate>
            <h2 ref={headingRef} tabIndex="-1">Question {number + 1} of {total}</h2>

            <fieldset className="quiz-question" disabled={isChecked || isSending}>
              <legend>{question.question}</legend>
              <div className="quiz-choices">
                {question.choices.map((choice, index) => {
                  const isRight = isChecked && index === result.answer;
                  const isWrong = isChecked && index === picked && !isRight;
                  return (
                    <label key={choice} className={`quiz-choice${isRight ? ' quiz-choice-right' : ''}${isWrong ? ' quiz-choice-wrong' : ''}`}>
                      <input
                        type="radio"
                        name="answer"
                        checked={picked === index}
                        onChange={() => {setPicked(index); setHint('');}}
                      />
                      <span>{choice}</span>
                      {isRight && <span className="quiz-mark">✓ Right answer</span>}
                      {isWrong && <span className="quiz-mark">✗ Your answer</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p className="quiz-hint" role="status">{hint}</p>

            {isChecked ? (
              <>
                <div className="quiz-feedback" role="status">
                  <p><strong>{result.correct ? 'Correct!' : 'Not quite.'}</strong> {result.change}</p>
                  <p>Did you know? {question.fact}</p>
                </div>
                <button type="button" ref={nextRef} className="quiz-button" onClick={handleNext} disabled={isBusy}>
                  {number + 1 < total ? 'Next question' : isBusy ? 'Adding up...' : 'See my score'}
                </button>
              </>
            ) : (
              <button type="submit" className="quiz-button" disabled={isSending}>
                {isSending ? 'Checking...' : 'Check answer'}
              </button>
            )}
          </form>
        )}

        {quiz && stage === 'results' && (
          <>
            <h2 ref={headingRef} tabIndex="-1">You got {score} out of {total}!</h2>
            <p>{describeScore(score, total, name)}</p>
            {startFavour !== null && favour !== null && (
              <p>{name}&apos;s favour went from {startFavour} to {favour}.</p>
            )}
            <QuizGift name={name} score={score} reward={reward}/>
            {triesLeft === 1 && <p>You have 1 more try at {name}&apos;s quiz today.</p>}
            {triesLeft === 0 && <p>That was your last try for today. Come back tomorrow!</p>}
            <Link className="quiz-button" to="/travel">Back to the gods</Link>
          </>
        )}
      </section>
    </main>
  );
}

/** Quiz page (/quiz/zeus). The key starts a fresh quiz if the address changes to another god. */
function Quiz(){
  const {god = ''} = useParams();
  const id = god.toLowerCase();
  return <GodQuiz key={id} id={id}/>;
}

export default Quiz;
