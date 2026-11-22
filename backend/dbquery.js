//Helper function to query database

export async function fetchUser(email, password){
  //Checks if the username and password exists within the database.
  //param email: Email to check.
  //param password: Password to check.

  const params = new URLSearchParams({email, password});
  console.log("params", params); 
  const res = await fetch(`/api/user/userInfo/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function addUser(username, pass, email, dob){
  //Adds a user to the database.
  //param username: Username to add.
  //param pass: Password to add.
  //param email: Email to add.
  //param dob: Date of Birth to add.

  try{
    const res = await fetch('api/user/addUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, pass, email, dob})})

    if (!res.ok){throw new Error('Error adding user')};
    return await res.json()

    }  catch (error) {
    console.error("Error adding user", error);
  }
}
