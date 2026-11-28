import {addMessage} from '../../../backend/dbquery.js';

console.log(await addMessage({sender: "user", message: "msg", timestamp: "121212", userID: 8, godID: 3}));


function  Chat(){
  return (
  <div>
    <h1>Chat</h1>
  </div>
  );
}

export default Chat;
