import {useState} from 'react';
import ProgressBar from "../components/ProgressBar.jsx";
import ChatBox from "../components/ChatBox.jsx";
import WordList from "../insult_compliments.json";

const tGod = {
  tolerance: 70,
  gift_type: "Gems",
  relationship: 50
}

const testGift = {
  gift_name: "Gift Name",
  gift_type: "Gem",
  gift_value: 25
}

let tolerance = 100 - tGod.tolerance;


function getRelationshipStatus(){
  // Used to get what facial expression the god should be.
  if (tGod.relationship > 66){
    return 'Happy Face';
  } else if (tGod.relationship > 33){
    return 'Netural Face';
  } else {
    return 'Bad Face';
  }
}

function checkRelationship(){
  //Checks to see if the player should be booted back to the 
  //Travel Screen
  console.log(tGod.relationship);
  if (tGod.relationship <= 0){
    console.log("Boot Player");
    alert("Player booted to Travel Screen");
  } else {
    console.log(getRelationshipStatus());
  }
}

function  Chat(){
  const [progress, setProgress] = useState(tGod.relationship);

  const setNewProgress = (value) => {
    setProgress(value);
    tGod.relationship = value;
    checkRelationship()
  }

  const increaseRelationship = (value) => {
    let newProgress = 0;
    newProgress = progress < 100 ? progress + value : 100;
    if (newProgress > 100) {newProgress = 100;}
    setNewProgress(newProgress);
  }

  const decreaseRelationship = (value) => {
    let newProgress = 0;
    newProgress = progress > 0 ? progress - value : 0;
    setNewProgress(newProgress);
  }

  const checkWords = (message) => {
    //Checks to see if there is any profanity or compliments within the 
    //message and incrases/decreases the relationship.

    let insults = 0;
    let compliments = 0;
    let wordLength = 0;

    //Checks if both arrays are the same length.
    if (WordList.insults.length === WordList.compliments.length){
      wordLength = WordList.insults.length;
    } else {return}


    message = message.toLowerCase();

    //Loop through both arrays and check if the message contains any of strings.
    for (let i = 0; i < wordLength; ++i){
      if (message.includes(WordList.insults[i])){
        insults++;
      }
      if (message.includes(WordList.compliments[i])){
        compliments++;
      }
    }

    //Increase or decrease the relationship based on the score.
    if (insults == 1 && compliments > 0){
      increaseRelationship(Math.floor(Math.random() * tolerance));
    } else if (insults > 0){
      decreaseRelationship(Math.floor(Math.random() * tolerance));
    } else if (compliments > 0) {
      increaseRelationship(Math.floor(Math.random() * tolerance)); 
    }
  }

  const giveGift = () => {
    // Checks if the offered gift matches the gods prefered type.
    if (testGift.gift_type.toLowerCase() === tGod.gift_type.toLowerCase()){
      increaseRelationship(testGift.gift_value);
    } else {
      decreaseRelationship(testGift.gift_value);      
    }
  };

  const handleSendMessage = (text) => {
    if (text === ''){
      alert("Please, enter a message");
    } else {
      checkWords(text);
    }
  }

  return (
  <div>
    <h1>Chat</h1>
      <ProgressBar progress={progress} />
      <button
      onClick={giveGift}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      Give Gift
    </button>
    <ChatBox onSendMessage={handleSendMessage}></ChatBox>
  </div>
  );
}

export default Chat;
