import {useState} from 'react';
import {Link} from 'react-router-dom';
import SingleInput from '../components/SingleInput.jsx';
import CloudGate from '../components/CloudGate.jsx';
import FormCard from '../components/FormCard.jsx';
import {checkEmail} from '../utils/checks.js';

/** Returns an error message if the password is empty, or ''. The server checks if it's right. */
function checkPassword(value){
  if (value === '') {return 'Please enter your password.';}
  return '';
}

/** Login page: the form a player with an account fills in to log in (email + password). */
function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Runs when Log in is clicked (or Enter is pressed): checks both boxes and shows any problems.
  const handleSubmit = (e) => {
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
    setMessage('');
    // Sending the details to the server comes in the next step
  };

  return (
    <CloudGate>
      <FormCard title="Log in" onSubmit={handleSubmit}>
        <SingleInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email}/>
        <SingleInput id="password" label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password}/>

        <button type="submit">Log in</button>

        {message && <p className="form-message" role="alert">{message}</p>}

        <p className="form-switch">New here? <Link to="/registration">Create an account</Link></p>
      </FormCard>
    </CloudGate>
  );
}

export default Login;
