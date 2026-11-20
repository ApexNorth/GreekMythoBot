// Form checks shared by more than one page (Register, Login and Reset password).
// Each one returns an error message to show under the box, or '' if it's fine.

/** Returns an error message for the email, or '' if it's fine. */
export function checkEmail(value){
  if (value.trim() === '') {return 'Please enter your email.';}
  // Must look like name@place.domain with no spaces
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {return "That doesn't look like an email. Try something like name@example.com.";}
  return '';
}

/** Checks a password someone is choosing (Register, Reset password) is strong enough. */
export function checkNewPassword(value){
  if (value === '') {return 'Please choose a password.';}
  if (value.length < 8) {return 'Your password needs at least 8 characters.';}
  if (!/[A-Z]/.test(value)) {return 'Add at least one capital letter (A-Z).';}
  if (!/[a-z]/.test(value)) {return 'Add at least one small letter (a-z).';}
  if (!/[^A-Za-z0-9]/.test(value)) {return 'Add at least one symbol, like ! ? . or #.';}
  return '';
}

/** Returns an error message if the two passwords are different, or '' if they match. */
export function checkConfirmPassword(password, confirmPassword){
  if (confirmPassword === '') {return 'Please type your password again.';}
  if (password !== confirmPassword) {return "The passwords don't match.";}
  return '';
}
