import {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import SingleInput from '../components/SingleInput.jsx';
import CloudGate from '../components/CloudGate.jsx';
import FormCard from '../components/FormCard.jsx';
import {checkNewPassword, checkConfirmPassword} from '../utils/checks.js';

// TODO BACKEND: set this to false once POST /api/reset-password works on the server.
const USE_FAKE_SERVER = true;

/**
 * Sends the new password and the token from the emailed link to the server. The server replies
 * {ok: true}, or {ok: false, error: 'expired'} if the link is old, already used or made up.
 * Throws an error if the server can't be reached.
 */
async function sendNewPassword(details){
  if (USE_FAKE_SERVER) {return fakeServer(details);}

  // TODO BACKEND: POST /api/reset-password { token, password }, checks the token and saves the new password
  const response = await fetch('/api/reset-password', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(details),
  });
  return response.json();
}

/** Pretend server, only used until the real one is ready. Test links: ?token=expired and ?token=offline. */
function fakeServer(details){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (details.token === 'offline') {reject(new Error('Server offline'));}
      else if (details.token === 'expired') {resolve({ok: false, error: 'expired'});}
      else {resolve({ok: true});}
    }, 1000);
  });
}

/** Reset password page: opened from the emailed link (/reset-password?token=...) to choose a new password. */
function ResetPassword(){
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Runs when the button is clicked (or Enter is pressed): checks both boxes, then sends them.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      password: checkNewPassword(password),
      'confirm-password': checkConfirmPassword(password, confirmPassword),
    };
    setErrors(newErrors);

    const firstProblem = Object.keys(newErrors).find((field) => newErrors[field] !== '');
    if (firstProblem){
      document.getElementById(firstProblem).focus();
      return;
    }

    setMessage('');
    setIsSending(true);
    try {
      const reply = await sendNewPassword({token, password});
      if (reply.ok) {setIsDone(true);}
      else if (reply.error === 'expired') {setIsExpired(true);}
      else {setMessage('Something went wrong. Please try again.');}
    } catch {
      setMessage("We can't reach the server right now. Please try again in a moment.");
    }
    setIsSending(false);
  };

  // What to show: done, a broken/old link, or the form
  let content;
  if (isDone){
    content = (
      <p className="form-message" role="status">
        Your password has been changed. <Link to="/login">Log in with your new password</Link>
      </p>
    );
  } else if (!token || isExpired){
    content = (
      <p className="form-message" role="alert">
        This link has expired or isn't complete. <Link to="/forgot-password">Ask for a new one</Link>
      </p>
    );
  } else {
    content = (
      <>
        <SingleInput id="password" label="New password" type="password" placeholder="8+ characters, A-Z, a-z and a symbol" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password}/>
        <SingleInput id="confirm-password" label="Confirm new password" type="password" placeholder="Type it again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors['confirm-password']}/>
        <button type="submit" disabled={isSending}>{isSending ? 'Saving...' : 'Save new password'}</button>
        {message && <p className="form-message" role="alert">{message}</p>}
      </>
    );
  }

  return (
    <CloudGate>
      <FormCard title="Choose a new password" onSubmit={handleSubmit}>
        {content}
      </FormCard>
    </CloudGate>
  );
}

export default ResetPassword;
