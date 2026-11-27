//Helper function to query database
// When passing data into these functions they MUST be in the correct order with the EXACT same name.
// So if URLSearchParams state {email, password} this is the order and names you must use.

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
    const date = details.date;

    const res = await fetch('/api/user/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pass, email, dob, date })
    });

    const data = await res.json().catch(() => ({}));
    console.log('addUser response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}

export async function fetchRelationship(userID, godID){
  //Fetches a single relationship for the currently logged in user.
  //param userID: The current logged in user.

  const params = new URLSearchParams({userID, godID});

  const res = await fetch(`/api/user/userRelationship/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchRelationships(userID){
  //Fetches all the users relationships.
  //param userID: The current logged in user.

  const params = new URLSearchParams({userID});
  console.log("params", params); 
  const res = await fetch(`/api/user/userRelationships/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchProfile(userID){
  // Fetches the users profile that contains the gifts they have obtained. 
  //param userID: The current users ID.
  const params = new URLSearchParams({userID});
  console.log("params", params); 
  const res = await fetch(`/api/user/userProfile/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchChat(userID, godID){
  // Fetchs a chat for a specific god.  
  //param userID: The Users ID.
  //param godID: The godID that the user is talking to.

  const params = new URLSearchParams({userID, godID});
  console.log("params", params); 
  const res = await fetch(`/api/user/userHistory/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function addMessage(details) {
  // Adds a message to the database and return if it was successful or not.
  // param details - object containing sender, message, timestamp, userID, godID
  try {
    const sender = details.sender;
    const message = details.message;
    const timestamp = details.timestamp;
    const userID = details.userID;
    const godID = details.godID;
    const conversationState = details.conversationState;

    const res = await fetch('/api/user/addMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender, message, timestamp, userID, godID, conversationState })
    });

    const data = await res.json().catch(() => ({}));
    console.log('addMessage response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}

export async function fetchGods(){
  //Fetchs all god names only.

  const res = await fetch(`/api/god/godNames`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGodInfo(){
  //Gets all gods and their fields.

  const res = await fetch(`/api/god/godInfo`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGod(godID){
  //Fetch a single god.
  //param godID: God to select.

  const params = new URLSearchParams({godID});
  console.log("params", params); 
  const res = await fetch(`/api/god/getGod/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGifts(){
  //Fetch all gifts.
  const res = await fetch(`/api/gift/gifts`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGift(giftID){
  //Fetch a single gift from a group.
  //param gift: Email to check.

  const params = new URLSearchParams({giftID});
  console.log("params", params); 
  const res = await fetch(`/api/gift/gift/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGiftGroups(){
  //Fetch all gift groups.
  const res = await fetch(`/api/gift/giftGroups`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function fetchGiftGroup(groupID){
  //Gets a single gift Group.
  //param groupID: Group to get;
  const params = new URLSearchParams({groupID});
  console.log("params", params); 
  const res = await fetch(`/api/gift/giftGroup/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
}

export async function changeUsername(details) {
  // Changes a users username only if the email and password is correct. 
  // param details: object containing newUsername, userID and password.
  try {
    const { newUsername, userID, password } = details;

    const res = await fetch('/api/user/changeUsername', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername, userID, password })
    });

    const data = await res.json().catch(() => ({}));
    console.log('changeUsername response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}

export async function changeEmail(details) {
  // Changes a users email only if the email and password is correct. 
  // param details: object containing newEmail, userID and password.
  try {
    const { newEmail, userID, password } = details;

    const res = await fetch('/api/user/changeEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail, userID, password })
    });

    const data = await res.json().catch(() => ({}));
    console.log('changeEmail response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}

export async function changePassword(details) {
  // Changes a users password only if the email and current password is correct. 
  // param details: object containing newPassword, userID and password.
  try {
    const { newPassword, userID, password } = details;

    const res = await fetch('/api/user/changePassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword, userID, password })
    });

    const data = await res.json().catch(() => ({}));
    console.log('changeEmail response:', res.status, data);

    return Boolean(data.inserted);
  } catch (error) {
    console.error('Error adding user', error);
    return false;
  }
}
