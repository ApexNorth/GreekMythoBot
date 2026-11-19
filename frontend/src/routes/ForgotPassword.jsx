import {useState} from 'react';
import {Link} from 'react-router-dom';
import SingleInput from '../components/SingleInput.jsx';
import CloudGate from '../components/CloudGate.jsx';
import FormCard from '../components/FormCard.jsx';
import {checkEmail} from '../utils/checks.js';

// TODO BACKEND: set this to false once POST /api/forgot-password works on the server.
const USE_FAKE_SERVER = true;

/**
 * Asks the server to email a "choose a new password" link. The server replies {ok: true}
 * whether or not the email has an account. Throws an error if the server can't be reached.
 */
async function sendResetRequest(email){
  if (USE_FAKE_SERVER) {return fakeServer(email);}

  // TODO BACKEND: POST /api/forgot-password { email }, emails a link to /reset-password?token=... if the account exists
  const response = await fetch('/api/forgot-password', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email}),
  });
  return response.json();
}

/** Pretend server, only used until the real one is ready. offline@example.com = server can't be reached. */
function fakeServer(email){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'offline@example.com') {reject(new Error('Server offline'));}
      else {resolve({ok: true});}
    }, 1000);
  });
}

/** Forgot password page: the player types their email and gets sent a link to choose a new password. */
function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Runs when the button is clicked (or Enter is pressed): checks the email, then sends it.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const problem = checkEmail(email);
    setError(problem);
    if (problem){
      document.getElementById('email').focus();
      return;
    }

    setMessage('');
    setIsSending(true);
    try {
      const reply = await sendResetRequest(email);
      if (reply.ok) {setIsSent(true);}
      else {setMessage('Something went wrong. Please try again.');}
    } catch {
      setMessage("We can't reach the server right now. Please try again in a moment.");
    }
    setIsSending(false);
  };

  return (
    <CloudGate>
      <FormCard title="Forgot your password?" onSubmit={handleSubmit}>
        {isSent ? (
          // Same message whether or not the email has an account, so nobody can use it to find out
          <p className="form-message" role="status">
            If <strong>{email}</strong> has an account, we've sent it a link to choose a new password.
            Check your inbox (and your spam folder).
          </p>
        ) : (
          <>
            <p className="form-hint">Type the email you signed up with and we'll send you a link to choose a new password.</p>
            <SingleInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={error}/>
            <button type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send reset link'}</button>
            {message && <p className="form-message" role="alert">{message}</p>}
          </>
        )}

        <p className="form-switch">Remembered it? <Link to="/login">Back to log in</Link></p>
      </FormCard>
    </CloudGate>
  );
}

export default ForgotPassword;
