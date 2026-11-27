import {useState, useEffect, useRef, startTransition} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getProfile, saveAvatar} from '../utils/demoServer.js';
import {DEFAULT_AVATAR, avatars, isAvatar, avatarPicture, avatarName} from '../data/avatars.js';
import {describeRelationship} from '../utils/relationship.js';
import {giftPicture} from '../utils/giftPictures.js';
import './Profile.css';

// TODO BACKEND: set this to false once GET /api/profile and POST /api/user/avatar work on the server.
const USE_FAKE_SERVER = true;

// Small round pictures of each god (assets/profile/zeus.webp ...), found by god id
const godPictures = import.meta.glob('../assets/profile/*.webp', {eager: true, import: 'default'});

// TODO: use Nora's shared list of gods once there is one (same gods and groups as God Selection)
const godGroups = [
  {name: 'Olympians', gods: ['Aphrodite', 'Ares', 'Athena', 'Hermes', 'Poseidon', 'Zeus']},
  {name: 'Titans', gods: ['Atlas', 'Hyperion', 'Kronos', 'Prometheus', 'Rhea', 'Themis']},
  {name: 'Primordials', gods: ['Chaos', 'Chronos', 'Gaia', 'Nyx', 'Tartarus', 'Ouranos']},
];

/**
 * Asks the server for the logged-in player's profile. The server replies with
 * {ok: true, username, avatar, relationships: [{godName, favor}], gifts: [{giftName, groupName}]}.
 * Throws an error if the server can't be reached.
 */
async function loadProfile(){
  // Pretend server (utils/demoServer.js), shared with the Quiz page
  if (USE_FAKE_SERVER) {return getProfile();}

  // TODO BACKEND: GET /api/profile for the logged-in player (uses the login session cookie),
  // built from Alex's userRelationships + userProfile queries
  const response = await fetch('/api/profile');
  return response.json();
}

/** Saves the player's new profile picture (one of the 6 ids). The server replies {ok: true, avatar}. */
async function savePicture(avatar){
  if (USE_FAKE_SERVER) {return saveAvatar(avatar);}

  // TODO BACKEND: POST /api/user/avatar { avatar } for the logged-in player (saved in the user table)
  const response = await fetch('/api/user/avatar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({avatar}),
  });
  return response.json();
}

/** Turns the server's reply into the profile the page shows, or null if the reply doesn't make sense (NFR-12). */
function readProfile(reply){
  if (!reply || reply.ok !== true) {return null;}

  // Keep only relationships that have a god name and a number, kept between 0 and 100
  const levels = {};
  if (Array.isArray(reply.relationships)){
    reply.relationships.forEach((item) => {
      if (item && typeof item.godName === 'string' && Number.isFinite(item.favor)){
        levels[item.godName.toLowerCase()] = Math.min(100, Math.max(0, item.favor));
      }
    });
  }

  // Keep only gifts that have a name (giftName and groupName come from the database)
  const gifts = Array.isArray(reply.gifts)
    ? reply.gifts
      .filter((gift) => gift && typeof gift.giftName === 'string' && gift.giftName !== '')
      .map((gift) => ({name: gift.giftName, type: typeof gift.groupName === 'string' ? gift.groupName : ''}))
    : [];

  return {
    username: typeof reply.username === 'string' ? reply.username : '',
    avatar: isAvatar(reply.avatar) ? reply.avatar : DEFAULT_AVATAR,
    levels,
    gifts,
  };
}

/** One gift: its picture (or a gift box icon if we have no art for it), name and type. */
function GiftItem({name, type}){
  const picture = giftPicture(name);

  return (
    <li className="gift-item">
      {/* Decorative: the gift's name is written right next to it */}
      {picture ? (
        <img className="gift-picture" src={picture} alt="" width="56" height="56"/>
      ) : (
        <svg className="gift-picture gift-box" viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
          <path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2-4-6-4-6-1s6 1 6 1c2-4 6-4 6-1s-6 1-6 1"/>
        </svg>
      )}
      <div>
        <p className="gift-name">{name}</p>
        {type && <p className="gift-type">{type}</p>}
      </div>
    </li>
  );
}

/** Lets the player pick one of the 6 profile pictures. Escape or Cancel closes it without saving. */
function AvatarPicker({current, isSaving, onSave, onCancel}){
  const [picked, setPicked] = useState(current);
  const checkedRef = useRef(null);

  // Start on the picture the player has now, so arrow keys move between the pictures
  useEffect(() => {
    checkedRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(picked);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !isSaving) {onCancel();}
  };

  return (
    <form className="avatar-picker" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <fieldset disabled={isSaving}>
        <legend>Choose your picture</legend>
        <div className="avatar-options">
          {avatars.map((avatar) => (
            <label key={avatar.id} className="avatar-option">
              <input
                type="radio"
                name="avatar"
                ref={avatar.id === current ? checkedRef : undefined}
                checked={picked === avatar.id}
                onChange={() => setPicked(avatar.id)}
              />
              {/* Decorative: the picture's name is written underneath */}
              <img src={avatarPicture(avatar.id)} alt="" width="88" height="88"/>
              <span>{avatar.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="avatar-actions">
        <button type="submit" className="profile-button" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save picture'}</button>
        <button type="button" className="profile-button profile-button-light" onClick={onCancel} disabled={isSaving}>Cancel</button>
      </div>
    </form>
  );
}

/** One god's row: picture, name, how they feel about you and a bar out of 100. */
function GodRelationship({name, level}){
  const id = name.toLowerCase();
  const {word, mood} = describeRelationship(level);

  return (
    <li className={`god-row god-row-${mood}`}>
      {/* Decorative: the god's name is written right next to it */}
      <img className="god-row-picture" src={godPictures[`../assets/profile/${id}.webp`]} alt="" width="64" height="64"/>

      <div className="god-row-info">
        <h4>{name}</h4>
        <p className="god-row-word">
          {/* Feather icon from the wireframe */}
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M20 4c-7 0-12 5-12 12v4h4c7 0 12-5 8-16zM4 20l9-9"/>
          </svg>
          {word}
        </p>
        {level !== undefined && (
          <p className="god-row-level">
            <meter min="0" max="100" value={level} aria-label={`${name}'s relationship`}></meter>
            <span>{level} / 100</span>
          </p>
        )}
      </div>
    </li>
  );
}

// Used when no onAvatarChange is passed (one shared function, so the page doesn't keep reloading)
const doNothing = () => {};

/**
 * Profile page: shows the logged-in player's name, how they're getting on with the gods
 * and their gifts (FE-31, FE-32). onLogout runs when Log out is clicked (FE-04).
 * onAvatarChange tells the navbar which profile picture to show.
 */
function Profile({onLogout = () => {}, onAvatarChange = doNothing}){
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [isPicking, setIsPicking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pictureMessage, setPictureMessage] = useState({text: '', isError: false});
  const changeRef = useRef(null);
  const wasPicking = useRef(false);
  const navigate = useNavigate();

  // Load the profile when the page opens, and again when "Try again" is clicked
  useEffect(() => {
    let isCurrent = true;
    loadProfile()
      .then((reply) => {
        if (!isCurrent) {return;}
        const newProfile = readProfile(reply);
        setProfile(newProfile);
        setStatus(newProfile ? 'ready' : 'broken');
        if (newProfile) {onAvatarChange(newProfile.avatar);}
      })
      .catch(() => {
        if (isCurrent) {setStatus('offline');}
      });
    // Ignore a reply that arrives after the player has left the page
    return () => {isCurrent = false;};
  }, [attempt, onAvatarChange]);

  // When the picture picker closes, put the keyboard focus back on "Change picture"
  useEffect(() => {
    if (!isPicking && wasPicking.current) {changeRef.current?.focus();}
    wasPicking.current = isPicking;
  }, [isPicking]);

  // "Try again" after an error: show the loading message and ask again
  const handleRetry = () => {
    setStatus('loading');
    setAttempt(attempt + 1);
  };

  // Open the picture picker
  const handleChangePicture = () => {
    setPictureMessage({text: '', isError: false});
    setIsPicking(true);
  };

  // Save the picked picture, then close the picker (it stays open if saving didn't work)
  const handleSavePicture = async (avatar) => {
    setPictureMessage({text: '', isError: false});
    setIsSaving(true);
    try {
      const reply = await savePicture(avatar);
      if (reply && reply.ok === true && reply.avatar === avatar){
        setProfile({...profile, avatar});
        onAvatarChange(avatar);
        setIsPicking(false);
        setPictureMessage({text: `Picture changed to ${avatarName(avatar)}.`, isError: false});
      } else {
        setPictureMessage({text: "We couldn't save your picture. Please try again.", isError: true});
      }
    } catch {
      setPictureMessage({text: "We can't reach the server right now. Please try again in a moment.", isError: true});
    }
    setIsSaving(false);
  };

  // Log out the same way as the navbar: go home first, then forget the login
  const handleLogout = () => {
    navigate('/');
    startTransition(() => onLogout());
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
            {/* The player's profile picture, with a button to pick a different one */}
            <img className="profile-avatar" src={avatarPicture(profile.avatar)} alt={`Your profile picture: ${avatarName(profile.avatar)}`} width="120" height="120"/>
            <p className="profile-hello">{profile.username ? `Hello, ${profile.username}!` : 'Hello!'}</p>
            {isPicking ? (
              <AvatarPicker
                current={profile.avatar}
                isSaving={isSaving}
                onSave={handleSavePicture}
                onCancel={() => setIsPicking(false)}
              />
            ) : (
              <button type="button" ref={changeRef} className="profile-button profile-button-light" onClick={handleChangePicture}>Change picture</button>
            )}
            <p className={`avatar-message${pictureMessage.isError ? ' avatar-message-error' : ''}`} role="status">{pictureMessage.text}</p>
            <p className="profile-note">See how you're getting on with the gods of Olympus.</p>

            {/* Relationships with every god, in the same groups as God Selection (FE-32) */}
            <section className="profile-section" aria-labelledby="relationships-heading">
              <h2 id="relationships-heading">Relationships</h2>

              {Object.keys(profile.levels).length === 0 && (
                <p className="profile-note">
                  You haven't met any gods yet. <Link to="/travel">Choose a god</Link> to start chatting.
                </p>
              )}

              {godGroups.map((group) => (
                <div key={group.name} className="god-group-block">
                  <h3>{group.name}</h3>
                  <ul className="god-rows">
                    {group.gods.map((name) => (
                      <GodRelationship key={name} name={name} level={profile.levels[name.toLowerCase()]}/>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Gifts on the player's profile (PROFILE.gifts in the ERD, bottom row of the wireframe) */}
            <section className="profile-section" aria-labelledby="gifts-heading">
              <h2 id="gifts-heading">Gifts</h2>
              {profile.gifts.length === 0 ? (
                <p className="profile-note">No gifts yet.</p>
              ) : (
                <ul className="gift-list">
                  {profile.gifts.map((gift, index) => (
                    <GiftItem key={`${gift.name}-${index}`} name={gift.name} type={gift.type}/>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        {/* Log out is always here, even if the profile didn't load */}
        {status !== 'loading' && (
          <div className="profile-logout">
            <button type="button" className="profile-button" onClick={handleLogout}>Log out</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
