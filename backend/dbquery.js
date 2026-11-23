//Helper function to query database

export async function fetchEmail(email){
  const params = new URLSearchParams({email});
  const res = await fetch(`/api/user/userEmail/?${params.toString()}`);
  if (!res.ok){
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchUser(email, password){
  //Checks if the email and password exists within the database.
  //param email: Email to check.
  //param password: Password to check.

  const params = new URLSearchParams({email, password});
  console.log("params", params); 
  const res = await fetch(`/api/user/userEmail/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function addUser(details) {
  // Adds a user to the database and return if it was successful or not.
  // param details - object containing username, password, email and dateOfBirth.
  try {
    const username = details.username;
    const pass = details.password;
    const email = details.email;
    const dob = details.dateOfBirth;

    const res = await fetch('/api/user/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pass, email, dob })
    });

    const data = await res.json().catch(() => ({}));
    console.log('addUser response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}
