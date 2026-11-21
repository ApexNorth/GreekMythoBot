//Helper function to query database

export async function fetchUser(email, password){
  const params = new URLSearchParams({email, password});
  console.log("params", params); 
  const res = await fetch(`/api/user/userInfo/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`ERROR ${res.status}`);
  }

  return await res.json();
  /*
  try{
    const params = new URLSearchParams({username, password});
    const [userRes] = await Promise.all([
      fetch(`/api/user/userInfo/${params.toString()}`)
    ])
    if (!userRes.ok) throw new Error("Network response failed");
    const user = await userRes.json();
    return {user};
  } catch (error){
    console.error("Table fetch failed", error);
  } */
}

export async function addUser(username){
  try{
    const res = await fetch('api/user/addUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username})})

    if (!res.ok){throw new Error('Error adding user')};
    return await res.json()

    }  catch (error) {
    console.error("Error adding user", error);
  }
}
