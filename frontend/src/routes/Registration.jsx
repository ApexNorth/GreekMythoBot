import {useState} from 'react';
import SingleInput from '../components/SingleInput.jsx';
import './Registration.css';

const charsToCheck = [".", ",", ";", ":", "!", "?"];
// TODO BACKEND: GET /api/captcha should give us the captcha. Fake code until then.
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

function checkCaptcha(value){
  if (value === tempCap) {return true;}

  return false;
}

/** Registration page: the form a new user fills in to create an account. */
function Registration(){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');

  // Runs when Register is clicked (or Enter is pressed) and shows the result on the page.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkEmail(email) || !checkUsername(username) || !checkPassword(password)){
      setMessage('Please check your email, username and password.');
    } else if (password !== confirmPassword){
      setMessage('The two passwords do not match.');
    } else if (!checkCaptcha(captcha)){
      setMessage('The captcha is incorrect. Please try again.');
    } else if (!agreed){
      setMessage('Please agree to the Terms and Privacy Policy.');
    } else {
      // TODO BACKEND: POST /api/register { email, username, password, captcha }
      // then go to the Travel screen if it worked.
      setMessage('Everything looks good! (The server is not connected yet.)');
    }
  };

  return (
    <div className="registration-page">
      <h1>The Descent</h1>

      {/* Registration form: same fields and order as the Figma wireframe */}
      <form className="registration-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <SingleInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <SingleInput id="username" label="Username" placeholder="Pick a name the gods will call you" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <SingleInput id="password" label="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <SingleInput id="confirm-password" label="Confirm password" type="password" placeholder="Type your password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

        {/* Captcha: shows the code to copy. Becomes an image from the backend later. */}
        <p className="captcha-code">Captcha code: <strong>{tempCap}</strong></p>
        <SingleInput id="captcha" label="Enter captcha" placeholder="Type the code above" value={captcha} onChange={(e) => setCaptcha(e.target.value)}/>

        <div className="terms">
          <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}/>
          <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
        </div>

        <button type="submit">Register</button>

        {message && <p className="form-message" role="alert">{message}</p>}
      </form>
    </div>
  );
}

export default Registration;
