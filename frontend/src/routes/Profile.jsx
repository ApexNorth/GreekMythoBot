import {useState, useEffect} from 'react';
import './Profile.css';

// TODO BACKEND: set this to false once GET /api/profile works on the server.
const USE_FAKE_SERVER = true;

/**
 * Asks the server for the logged-in player's profile. The server replies with
 * {ok: true, username, relationships: [{god, relationshipStatus}], gifts: [{gift_name, gift_type}]}.
 * Throws an error if the server can't be reached.
 */
async function loadProfile(){
  if (USE_FAKE_SERVER) {return fakeServer();}

  // TODO BACKEND: GET /api/profile for the logged-in player (uses the login session cookie)
  const response = await fetch('/api/profile');
  return response.json();
}

/**
 * Pretend server, only used until the real one is ready. Waits 1 second, then replies.
 * Add ?test=offline (server can't be reached) or ?test=junk (broken reply) to the address to try the errors.
 */
function fakeServer(){
  const test = new URLSearchParams(window.location.search).get('test');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (test === 'offline') {reject(new Error('Server offline'));}
      else if (test === 'junk') {resolve('not a profile');}
      else {
        resolve({
          ok: true,
          username: 'Hermes',
          relationships: [
            {god: 'zeus', relationshipStatus: 72},
            {god: 'athena', relationshipStatus: 50},
            {god: 'ares', relationshipStatus: 20},
            {god: 'kronos', relationshipStatus: 0},
            {god: 'gaia', relationshipStatus: 90},
          ],
          gifts: [
            {gift_name: 'Honey', gift_type: 'food'},
            {gift_name: 'Pomegranate', gift_type: 'food'},
          ],
        });
      }
    }, 1000);
  });
}

/** Turns the server's reply into the profile the page shows, or null if the reply doesn't make sense (NFR-12). */
function readProfile(reply){
  if (!reply || reply.ok !== true) {return null;}
  return {
    username: typeof reply.username === 'string' ? reply.username : '',
  };
}

/** Profile page: shows the logged-in player's name and how they're getting on with the gods (FE-31, FE-32). */
function Profile(){
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  // Load the profile when the page opens, and again when "Try again" is clicked
  useEffect(() => {
    let isCurrent = true;
    loadProfile()
      .then((reply) => {
        if (!isCurrent) {return;}
        const newProfile = readProfile(reply);
        setProfile(newProfile);
        setStatus(newProfile ? 'ready' : 'broken');
      })
      .catch(() => {
        if (isCurrent) {setStatus('offline');}
      });
    // Ignore a reply that arrives after the player has left the page
    return () => {isCurrent = false;};
  }, [attempt]);

  // "Try again" after an error: show the loading message and ask again
  const handleRetry = () => {
    setStatus('loading');
    setAttempt(attempt + 1);
  };

  return (
    <main className="profile-page">
      <section className="profile-card" aria-busy={status === 'loading'}>
        <h1>Profile</h1>

        {status === 'loading' && <p className="profile-note" role="status">Loading your profile...</p>}

        {/* Something went wrong: say what, never a blank page (NFR-06) */}
        {(status === 'offline' || status === 'broken') && (
          <div className="profile-error" role="alert">
            <p>
              {status === 'offline'
                ? "We can't reach the server right now. Please try again in a moment."
                : 'Something went wrong loading your profile. Please try again.'}
            </p>
            <button type="button" className="profile-button" onClick={handleRetry}>Try again</button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <p className="profile-hello">{profile.username ? `Hello, ${profile.username}!` : 'Hello!'}</p>
            <p className="profile-note">See how you're getting on with the gods of Olympus.</p>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
