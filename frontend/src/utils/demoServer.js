/**
 * Pretend server for the demo, shared by the Profile and Quiz pages so a quiz changes
 * what Profile shows. It only lives in memory: refreshing the page starts it again.
 * Field names match Alex's database (godName, favor, giftName, groupName).
 * TODO BACKEND: not needed once the real server works (USE_FAKE_SERVER in each page).
 */
import quizzes from '../data/quizzes.js';
import {DEFAULT_AVATAR, isAvatar} from '../data/avatars.js';

// Quiz favour rules (George, 26 Nov): right answer +5, wrong answer -3, always 0-100
const RIGHT_ANSWER_FAVOUR = 5;
const WRONG_ANSWER_FAVOUR = -3;
// A god the player hasn't met yet starts in the middle (TODO BACKEND: decide with Alex)
const NEW_GOD_FAVOUR = 50;

// Demo starting point: gods in every mood (Zeus is close to "Likes you", Ares is angry)
const demo = {
  username: 'Demo Player',
  avatar: DEFAULT_AVATAR,
  favour: {Zeus: 64, Athena: 50, Hermes: 45, Ares: 0, Kronos: 20, Gaia: 90},
  gifts: [
    {giftName: 'Worn Copper Coin', groupName: 'Coins'},
    {giftName: 'Faded Papyrus Note', groupName: 'Scrolls'},
    {giftName: 'Smooth River Pebble', groupName: 'Stones'},
    {giftName: 'Frankincense Resin Bundle', groupName: 'Incense'},
  ],
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

/** Pretend GET of one god's favour for the player, e.g. getFavour('Zeus') -> {ok, godName, favor}. */
export function getFavour(godName){
  return reply(() => ({ok: true, godName, favor: demo.favour[godName] ?? NEW_GOD_FAVOUR}));
}

/**
 * Pretend POST /api/quiz/answer: marks one answer and saves the god's new favour, so
 * Profile shows it too. Replies {ok, correct, answer (the right choice), favor}.
 */
export function sendAnswer(godName, questionNumber, choice){
  return reply(() => {
    const question = quizzes[godName.toLowerCase()]?.questions[questionNumber];
    if (!question) {return {ok: false};}

    const correct = choice === question.answer;
    const before = demo.favour[godName] ?? NEW_GOD_FAVOUR;
    const change = correct ? RIGHT_ANSWER_FAVOUR : WRONG_ANSWER_FAVOUR;
    demo.favour[godName] = Math.min(100, Math.max(0, before + change));
    return {ok: true, correct, answer: question.answer, favor: demo.favour[godName]};
  }, 400);
}

/** Pretend GET /api/profile. Add ?test=new for a player who hasn't met any gods yet. */
export function getProfile(){
  return reply((test) => ({
    ok: true,
    username: demo.username,
    avatar: test === 'new' ? DEFAULT_AVATAR : demo.avatar,
    relationships: test === 'new'
      ? []
      : Object.entries(demo.favour).map(([godName, favor]) => ({godName, favor})),
    gifts: test === 'new' ? [] : [...demo.gifts],
  }));
}

/** Pretend POST /api/user/avatar: saves the player's profile picture if it's one of the 6. Replies {ok, avatar}. */
export function saveAvatar(avatar){
  return reply(() => {
    if (!isAvatar(avatar)) {return {ok: false};}
    demo.avatar = avatar;
    return {ok: true, avatar};
  }, 600);
}
