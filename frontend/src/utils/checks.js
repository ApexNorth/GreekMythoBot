// Form checks shared by more than one page (Register and Login).

/** Returns an error message for the email, or '' if it's fine. */
export function checkEmail(value){
  if (value.trim() === '') {return 'Please enter your email.';}
  // Must look like name@place.domain with no spaces
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {return "That doesn't look like an email. Try something like name@example.com.";}
  return '';
}
