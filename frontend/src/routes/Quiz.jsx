import {useState, useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import SelectionParallax from '../components/SelectionParallax.jsx';
import quizzes from '../data/quizzes.js';
import {getFavour, sendAnswer} from '../utils/demoServer.js';
import {describeRelationship} from '../utils/relationship.js';
import './Quiz.css';

// TODO BACKEND: set this to false once the favour and quiz answer routes work on the server.
const USE_FAKE_SERVER = true;

// Nora's god pictures (assets/gods/zeus.png ...), the same ones the Gods page shows
const godPictures = import.meta.glob('../assets/gods/*.png', {eager: true, query: '?url', import: 'default'});

/** Turns the god's id from the web address into their name, e.g. "zeus" -> "Zeus". */
function toGodName(id){
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/** Asks the server how much this god likes the player. Replies {ok, godName, favor}. */
async function loadFavour(godName){
  if (USE_FAKE_SERVER) {return getFavour(godName);}

  // TODO BACKEND: GET one god's favour for the logged-in player (Alex's fetchRelationship gives {godName, favor})
  const response = await fetch(`/api/favour?god=${encodeURIComponent(godName)}`);
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

/** Quiz page: 4 questions about one god (/quiz/zeus), one at a time, then the score. */
function Quiz(){
  const {god = ''} = useParams();
  const id = god.toLowerCase();
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
  const headingRef = useRef(null);
  const nextRef = useRef(null);

  const isChecked = result !== null;
  const total = quiz ? quiz.questions.length : 0;
  const question = quiz ? quiz.questions[number] : null;

  // Load how much the god likes the player when the page opens
  useEffect(() => {
    if (!quiz) {return;}
    let isCurrent = true;
    loadFavour(name)
      .then((reply) => {
        if (!isCurrent) {return;}
        const level = reply && reply.ok === true ? readFavour(reply.favor) : null;
        setFavour(level);
        setStartFavour(level);
        setFavourStatus(level === null ? 'failed' : 'ready');
      })
      .catch(() => {
        if (isCurrent) {setFavourStatus('failed');}
      });
    // Ignore a reply that arrives after the player has left the page
    return () => {isCurrent = false;};
  }, [quiz, name]);

  // Move the keyboard focus to whatever just changed, so keyboard and screen reader users keep their place
  useEffect(() => {
    if (stage === 'intro') {return;}
    if (isChecked) {nextRef.current?.focus();}
    else {headingRef.current?.focus();}
  }, [stage, number, isChecked]);

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
      setHint("We can't reach the server right now. Please try again in a moment.");
    }
    setIsSending(false);
  };

  // Go to the next question, or to the results after the last one
  const handleNext = () => {
    setPicked(null);
    setResult(null);
    if (number + 1 < total) {setNumber(number + 1);}
    else {setStage('results');}
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
            <p>How well do you know {name}? Answer {total} questions to find out.</p>
            <button type="button" className="quiz-button" onClick={() => setStage('question')}>Start quiz</button>
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
                <button type="button" ref={nextRef} className="quiz-button" onClick={handleNext}>
                  {number + 1 < total ? 'Next question' : 'See my score'}
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
            <Link className="quiz-button" to="/travel">Back to the gods</Link>
          </>
        )}
      </section>
    </main>
  );
}

export default Quiz;
