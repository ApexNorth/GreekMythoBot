import {addGift, removeGift} from '../../../backend/dbquery.js';

console.log(await removeGift({userID: 8, giftID: 3}));


function  Chat(){
  return (
  <div>
    <h1>Chat</h1>
  </div>
  );
}

export default Chat;
