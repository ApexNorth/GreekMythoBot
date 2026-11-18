import {useState} from 'react';
import SingleInput from '../components/SingleInput.jsx';
import CloudGate from '../components/CloudGate.jsx';
import './Registration.css';

// TODO BACKEND: GET /api/captcha should give us the captcha. Fake code until then.
const tempCap = '2s1';

// TODO BACKEND: set this to false once POST /api/register works on the server.
const USE_FAKE_SERVER = true;

/** Returns an error message for the email, or '' if it's fine. */
function checkEmail(value){
  if (value.trim() === '') {return 'Please enter your email.';}
  // Must look like name@place.domain with no spaces
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {return "That doesn't look like an email. Try something like name@example.com.";}
  return '';
}

/** Returns an error message for the username, or '' if it's fine. */
function checkUsername(value){
  if (value.trim() === '') {return 'Please choose a username.';}
  if (value.length < 3 || value.length > 20) {return 'Your username needs 3 to 20 characters.';}
  if (!/^[A-Za-z0-9_]+$/.test(value)) {return 'Use only letters, numbers and _ (no spaces).';}
  return '';
}

/** Returns an error message for the password, or '' if it's fine. */
function checkPassword(value){
  if (value === '') {return 'Please choose a password.';}
  if (value.length < 8) {return 'Your password needs at least 8 characters.';}
  if (!/[A-Z]/.test(value)) {return 'Add at least one capital letter (A-Z).';}
  if (!/[a-z]/.test(value)) {return 'Add at least one small letter (a-z).';}
  if (!/[^A-Za-z0-9]/.test(value)) {return 'Add at least one symbol, like ! ? . or #.';}
  return '';
}

/** Returns an error message if the two passwords are different, or '' if they match. */
function checkConfirmPassword(password, confirmPassword){
  if (confirmPassword === '') {return 'Please type your password again.';}
  if (password !== confirmPassword) {return "The passwords don't match.";}
  return '';
}

/** Returns an error message if the captcha is empty, or ''. The server checks if it's right. */
function checkCaptcha(value){
  if (value.trim() === '') {return 'Please type the code you see above.';}
  return '';
}

/**
 * Sends the new account to the server. The server replies with
 * {ok: true}, or {ok: false, error: 'captcha'} / {ok: false, error: 'email-taken'}.
 * Throws an error if the server can't be reached.
 */
async function sendRegistration(details){
  if (USE_FAKE_SERVER) {return fakeServer(details);}

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(details),
  });
  return response.json();
}

/**
 * Pretend server, only used until the real one is ready. Waits 1 second, then replies.
 * To test the error messages: use taken@example.com (email already used)
 * or offline@example.com (server can't be reached).
 */
function fakeServer(details){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (details.email === 'offline@example.com') {reject(new Error('Server offline'));}
      else if (details.captcha.trim() !== tempCap) {resolve({ok: false, error: 'captcha'});}
      else if (details.email === 'taken@example.com') {resolve({ok: false, error: 'email-taken'});}
      else {resolve({ok: true});}
    }, 1000);
  });
}

/** Registration page: the form a new user fills in to create an account. */
function Registration(){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Runs when Register is clicked (or Enter is pressed): checks every field and shows any problems.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: checkEmail(email),
      username: checkUsername(username),
      password: checkPassword(password),
      'confirm-password': checkConfirmPassword(password, confirmPassword),
      captcha: checkCaptcha(captcha),
      terms: agreed ? '' : 'Please tick the box to agree before you register.',
    };
    setErrors(newErrors);

    // Find the first field with a problem and move the cursor there
    const firstProblem = Object.keys(newErrors).find((field) => newErrors[field] !== '');
    if (firstProblem){
      setMessage('Please fix the problems shown above.');
      document.getElementById(firstProblem).focus();
      return;
    }

    // Send to the server, then open the clouds or show what went wrong
    setMessage('');
    setIsSending(true);
    try {
      const reply = await sendRegistration({email, username, password, captcha});
      if (reply.ok){
        setIsOpen(true);
        // TODO: go to the Travel screen after the clouds open (that page isn't built yet).
      } else if (reply.error === 'captcha'){
        setErrors({captcha: "That code isn't right. Check it and try again."});
        document.getElementById('captcha').focus();
      } else if (reply.error === 'email-taken'){
        setErrors({email: 'That email already has an account. Try logging in instead.'});
        document.getElementById('email').focus();
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setMessage("We can't reach the server right now. Please try again in a moment.");
    }
    setIsSending(false);
  };

  return (
    <CloudGate isOpen={isOpen} openMessage={`Welcome, ${username}!`}>
      <main className="registration-page">
        <h1>The Descent</h1>

        {/* Registration form: same fields and order as the Figma wireframe */}
        <form className="registration-card" onSubmit={handleSubmit} noValidate>
          <h2>Register</h2>
          <SingleInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email}/>
          <SingleInput id="username" label="Username" placeholder="Pick a name the gods will call you" value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username}/>
          <SingleInput id="password" label="Password" type="password" placeholder="8+ characters, A-Z, a-z and a symbol" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password}/>
          <SingleInput id="confirm-password" label="Confirm password" type="password" placeholder="Type your password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors['confirm-password']}/>

          {/* Captcha: shows the code to copy. Becomes an image from the backend later. */}
          <p className="captcha-code">Captcha code: <strong>{tempCap}</strong></p>
          <SingleInput id="captcha" label="Enter captcha" placeholder="Type the code above" value={captcha} onChange={(e) => setCaptcha(e.target.value)} error={errors.captcha}/>

          <div className="terms">
            <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              aria-invalid={errors.terms ? 'true' : 'false'} aria-describedby={errors.terms ? 'terms-error' : undefined}/>
            <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
          </div>
          {errors.terms && <p id="terms-error" className="input-error terms-error">{errors.terms}</p>}

          <button type="submit" disabled={isSending}>{isSending ? 'Registering...' : 'Register'}</button>

          {message && <p className="form-message" role="alert">{message}</p>}
        </form>
      </main>
    </CloudGate>
  );
}

export default Registration;
