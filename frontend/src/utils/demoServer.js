/**
 * Pretend server for the demo, shared by the Profile and Quiz pages so a quiz changes
 * what Profile shows. It only lives in memory: refreshing the page starts it again.
 * Field names match Alex's database (godName, favor, giftName, groupName).
 * TODO BACKEND: not needed once the real server works (USE_FAKE_SERVER in each page).
 */
import {godGiftGroups, giftGroups} from '../data/gifts.js';
import quizzes from '../data/quizzes.js';

// Quiz favour rules (George, 26 Nov): right answer +5, wrong answer -3, always 0-100
const RIGHT_ANSWER_FAVOUR = 5;
const WRONG_ANSWER_FAVOUR = -3;
// A god the player hasn't met yet starts in the middle (TODO BACKEND: decide with Alex)
const NEW_GOD_FAVOUR = 50;
// Quiz tries and gifts (George, 26 Nov): 2 tries per god per day, 3 or more right answers earn a gift
const TRIES_PER_DAY = 2;
const GIFT_SCORE = 3;

// Demo starting point: gods in every mood (Zeus is close to "Likes you", Ares is angry),
// and Hermes has already used both of today's quiz tries (to show "Come back tomorrow")
const demo = {
  username: 'Demo Player',
  favour: {Zeus: 64, Athena: 50, Hermes: 45, Ares: 0, Kronos: 20, Gaia: 90},
  gifts: [
    {giftName: 'Worn Copper Coin', groupName: 'Coins'},
    {giftName: 'Faded Papyrus Note', groupName: 'Scrolls'},
    {giftName: 'Smooth River Pebble', groupName: 'Stones'},
    {giftName: 'Frankincense Resin Bundle', groupName: 'Incense'},
  ],
  triesUsed: {Hermes: 2},
  // The quiz each god is giving right now: which questions are answered, and if they were right
  quizInProgress: {},
};

/**
 * Waits like a real server (1 second unless told otherwise), then replies with makeReply(test).
 * Add ?test=offline (server can't be reached) or ?test=junk (broken reply) to the address.
 */
function reply(makeReply, wait = 1000){
  const test = new URLSearchParams(window.location.search).get('test');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (test === 'offline') {reject(new Error('Server offline'));}
      else if (test === 'junk') {resolve('not a real reply');}
      else {resolve(makeReply(test));}
    }, wait);
  });
}

/** How many of today's quiz tries the player has left for this god. */
function triesLeft(godName){
  return Math.max(0, TRIES_PER_DAY - (demo.triesUsed[godName] ?? 0));
}

/** Pretend GET /api/quiz/info?god=: the god's favour and today's tries left, {ok, godName, favor, triesLeft}. */
export function getQuizInfo(godName){
  return reply(() => ({ok: true, godName, favor: demo.favour[godName] ?? NEW_GOD_FAVOUR, triesLeft: triesLeft(godName)}));
}

/**
 * Pretend POST /api/quiz/answer: marks one answer and saves the god's new favour, so
 * Profile shows it too. Replies {ok, correct, answer (the right choice), favor}.
 * Each question counts once, and only after the quiz has been started.
 */
export function sendAnswer(godName, questionNumber, choice){
  return reply(() => {
    const question = quizzes[godName.toLowerCase()]?.questions[questionNumber];
    const quiz = demo.quizInProgress[godName];
    if (!question || !quiz || questionNumber in quiz.answers) {return {ok: false};}

    const correct = choice === question.answer;
    const before = demo.favour[godName] ?? NEW_GOD_FAVOUR;
    const change = correct ? RIGHT_ANSWER_FAVOUR : WRONG_ANSWER_FAVOUR;
    demo.favour[godName] = Math.min(100, Math.max(0, before + change));
    quiz.answers[questionNumber] = correct;
    return {ok: true, correct, answer: question.answer, favor: demo.favour[godName]};
  }, 400);
}

/** Pretend POST /api/quiz/start: uses up one of today's tries. Replies {ok, triesLeft} or {ok: false, error: 'no-tries'}. */
export function startQuiz(godName){
  return reply(() => {
    if (!quizzes[godName.toLowerCase()]) {return {ok: false};}
    if (triesLeft(godName) === 0) {return {ok: false, error: 'no-tries', triesLeft: 0};}
    demo.triesUsed[godName] = (demo.triesUsed[godName] ?? 0) + 1;
    demo.quizInProgress[godName] = {answers: {}};
    return {ok: true, triesLeft: triesLeft(godName)};
  }, 400);
}

/**
 * Pretend POST /api/quiz/finish: adds up the right answers. For 3 or more, the god gives a random
 * gift from their gift group that the player doesn't have yet (it goes on Profile).
 * Replies {ok, score, gift: {giftName, groupName} or null, hasAllGifts}.
 */
export function finishQuiz(godName){
  return reply(() => {
    const quiz = demo.quizInProgress[godName];
    const total = quizzes[godName.toLowerCase()]?.questions.length;
    if (!quiz || Object.keys(quiz.answers).length !== total) {return {ok: false};}
    delete demo.quizInProgress[godName];

    const score = Object.values(quiz.answers).filter(Boolean).length;
    if (score < GIFT_SCORE) {return {ok: true, score, gift: null, hasAllGifts: false};}

    const groupName = godGiftGroups[godName];
    const owned = demo.gifts.map((gift) => gift.giftName);
    const choices = (giftGroups[groupName] ?? []).filter((giftName) => !owned.includes(giftName));
    if (choices.length === 0) {return {ok: true, score, gift: null, hasAllGifts: true};}

    const gift = {giftName: choices[Math.floor(Math.random() * choices.length)], groupName};
    demo.gifts.push(gift);
    return {ok: true, score, gift, hasAllGifts: false};
  }, 600);
}

/** Demo only (the "Reset for demo" link): gives the player today's tries for this god back. Replies {ok, triesLeft}. */
export function resetQuizTries(godName){
  return reply(() => {
    demo.triesUsed[godName] = 0;
    return {ok: true, triesLeft: triesLeft(godName)};
  }, 400);
}

/** Pretend GET /api/profile. Add ?test=new for a player who hasn't met any gods yet. */
export function getProfile(){
  return reply((test) => ({
    ok: true,
    username: demo.username,
    relationships: test === 'new'
      ? []
      : Object.entries(demo.favour).map(([godName, favor]) => ({godName, favor})),
    gifts: test === 'new' ? [] : [...demo.gifts],
  }));
}
