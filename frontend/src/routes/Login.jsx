import {useState} from 'react';
import {Link} from 'react-router-dom';
import SingleInput from '../components/SingleInput.jsx';
import CloudGate from '../components/CloudGate.jsx';
import FormCard from '../components/FormCard.jsx';
import {checkEmail} from '../utils/checks.js';

// TODO BACKEND: set this to false once POST /api/login works on the server.
const USE_FAKE_SERVER = true;

/** Returns an error message if the password is empty, or ''. The server checks if it's right. */
function checkPassword(value){
  if (value === '') {return 'Please enter your password.';}
  return '';
}

/**
 * Sends the email and password to the server. The server replies with
 * {ok: true, username: 'Hermes'} or {ok: false, error: 'invalid'}.
 * Throws an error if the server can't be reached.
 */
async function sendLogin(details){
  if (USE_FAKE_SERVER) {return fakeServer(details);}

  // TODO BACKEND: POST /api/login { email, password }, should also start the login session (cookie)
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(details),
  });
  return response.json();
}

/**
 * Pretend server, only used until the real one is ready. Waits 1 second, then replies.
 * Any email and password log in, except wrong@example.com (wrong details)
 * and offline@example.com (server can't be reached).
 */
function fakeServer(details){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (details.email === 'offline@example.com') {reject(new Error('Server offline'));}
      else if (details.email === 'wrong@example.com') {resolve({ok: false, error: 'invalid'});}
      else {resolve({ok: true, username: details.email.split('@')[0]});}
    }, 1000);
  });
}

/** Login page: the form a player with an account fills in to log in (email + password). */
function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Runs when Log in is clicked (or Enter is pressed): checks both boxes, then sends them.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: checkEmail(email),
      password: checkPassword(password),
    };
    setErrors(newErrors);

    // Find the first box with a problem and move the cursor there
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
      const reply = await sendLogin({email, password});
      if (reply.ok){
        // Only use the name if the server sent a real piece of text (NFR-12)
        setUsername(typeof reply.username === 'string' ? reply.username : '');
        setIsOpen(true);
        // TODO: go to the Travel screen after the clouds open (that page isn't built yet).
      } else if (reply.error === 'invalid'){
        // Don't say which one was wrong, so nobody can find out which emails have accounts
        setMessage("That email or password isn't right. Check them and try again.");
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setMessage("We can't reach the server right now. Please try again in a moment.");
    }
    setIsSending(false);
  };

  return (
    <CloudGate isOpen={isOpen} openMessage={username ? `Welcome back, ${username}!` : 'Welcome back!'}>
      <FormCard title="Log in" onSubmit={handleSubmit}>
        <SingleInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email}/>
        <SingleInput id="password" label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password}/>
        <p className="forgot-link"><Link to="/forgot-password">Forgot your password?</Link></p>

        <button type="submit" disabled={isSending}>{isSending ? 'Logging in...' : 'Log in'}</button>

        {message && <p className="form-message" role="alert">{message}</p>}

        <p className="form-switch">New here? <Link to="/registration">Create an account</Link></p>
      </FormCard>
    </CloudGate>
  );
}

export default Login;
