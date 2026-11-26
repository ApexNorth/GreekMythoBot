/**
 * Pretend server for the demo, shared by the Profile and Quiz pages so a quiz changes
 * what Profile shows. It only lives in memory: refreshing the page starts it again.
 * Field names match Alex's database (godName, favor, giftName, groupName).
 * TODO BACKEND: not needed once the real server works (USE_FAKE_SERVER in each page).
 */

// Demo starting point: gods in every mood (Zeus is close to "Likes you", Ares is angry)
const demo = {
  username: 'Demo Player',
  favour: {Zeus: 64, Athena: 50, Hermes: 45, Ares: 0, Kronos: 20, Gaia: 90},
  gifts: [
    {giftName: 'Worn Copper Coin', groupName: 'Coins'},
    {giftName: 'Faded Papyrus Note', groupName: 'Scrolls'},
    {giftName: 'Smooth River Pebble', groupName: 'Stones'},
    {giftName: 'Frankincense Resin Bundle', groupName: 'Incense'},
  ],
};

/**
 * Waits 1 second like a real server, then replies with makeReply(test).
 * Add ?test=offline (server can't be reached) or ?test=junk (broken reply) to the address.
 */
function reply(makeReply){
  const test = new URLSearchParams(window.location.search).get('test');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (test === 'offline') {reject(new Error('Server offline'));}
      else if (test === 'junk') {resolve('not a real reply');}
      else {resolve(makeReply(test));}
    }, 1000);
  });
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
