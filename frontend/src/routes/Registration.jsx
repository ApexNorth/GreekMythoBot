import {useState} from 'react';
import SingleInput from '../components/SingleInput.jsx';
import './Registration.css';

// TODO BACKEND: GET /api/captcha should give us the captcha. Fake code until then.
const tempCap = '2s1';

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

/** Returns an error message for the captcha, or '' if it's right. */
function checkCaptcha(value){
  if (value.trim() === '') {return 'Please type the code you see above.';}
  if (value.trim() !== tempCap) {return "That code isn't right. Check it and try again.";}
  return '';
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

  // Runs when Register is clicked (or Enter is pressed): checks every field and shows any problems.
  const handleSubmit = (e) => {
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

    // TODO BACKEND: POST /api/register { email, username, password, captcha }
    // The server replies if the captcha is wrong or the email is already used;
    // otherwise go to the Travel screen.
    setMessage('Everything looks good! (The server is not connected yet.)');
  };

  return (
    <div className="registration-page">
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

        <button type="submit">Register</button>

        {message && <p className="form-message" role="alert">{message}</p>}
      </form>
    </div>
  );
}

export default Registration;
