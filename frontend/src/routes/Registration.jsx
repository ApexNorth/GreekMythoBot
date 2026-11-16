import {useState} from 'react'
import SingleInput from './../components/SingleInput.jsx';



const charsToCheck = [".", ",", ";", ":", "!", "?"];
const tempCap = '2s1';

function checkEmail(value){
  let slicedEmail = value.split('@')[1];
  if (value.charAt(0) === '.') {return false;}
  if (!value.includes('@') || value.includes('@') > 1) {return false;}
  if (slicedEmail.length < 2) {return false;} 

  //TODO check if email exists in DB.
  return true;  
}

function checkPassword(value){
  if (!charsToCheck.some(char => value.includes(char))) {return false;}
  if (value == value.toLowerCase()) {return false}
  if (value == value.toUpperCase()) {return false;}

  return true;
}

function checkUsername(value){
  if (charsToCheck.some(char => value.includes(char))) {return false;}
  // TODO Check if username is already in db.
  return true;
}

function checkCapcha(value){
  if (value === tempCap) {return true;}

  return false;
}

function Registration(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [cap, setCap] = useState('');

  const handleOK = () => {
    console.log(checkPassword(password));
    if (checkEmail(email) && checkPassword(password) && checkUsername(user)){
      if (checkCapcha()){
        alert("Continue to Travel Screen");
        //Insert all data into the db.
      } else {
        alert("CAPATCHA is incorrect");
      }
    } else {
      alert("Please check email and username");
    }
  }

  return(
    <div>
    <h1>Registration</h1>
    <SingleInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <SingleInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <SingleInput placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
    <SingleInput placeholder="CAPATCHA" value={cap} onChange={(e) => setCap(e.target.value)}/>
    <button onClick={handleOK}>OK</button>
  </div>
  )
}

export default Registration
