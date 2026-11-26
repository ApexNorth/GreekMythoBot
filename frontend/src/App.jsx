import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './routes/Home.jsx';
import Chat from './routes/Chat.jsx';
import Registration from './routes/Registration.jsx';
import Login from './routes/Login.jsx';
import ForgotPassword from './routes/ForgotPassword.jsx';
import ResetPassword from './routes/ResetPassword.jsx';
import Profile from './routes/Profile.jsx';
import Quiz from './routes/Quiz.jsx';
import GodSelection from './components/GodSelection.jsx';
import GodChat from './components/GodChat.jsx';
import {DEFAULT_AVATAR} from './data/avatars.js';
import {getProfile} from './utils/demoServer.js';
import './App.css';

function test(test){
  alert(test);
}

/** Defines the application's pages and login-only routes. */
function App() {
  // TODO BACKEND: Check the user's login session when the app starts
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

  // After logging in, show the player's profile picture in the navbar
  const handleLogin = () => {
    setIsLoggedIn(true);
    // TODO BACKEND: the login reply should send the player's avatar; until then ask the pretend server
    getProfile()
      .then((reply) => {
        if (reply && typeof reply.avatar === 'string') {setAvatar(reply.avatar);}
      })
      .catch(() => {});
  };

  // TODO BACKEND: End the user's session on the server when logging out
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAvatar(DEFAULT_AVATAR);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} avatar={avatar} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route
          path="/registration"
          element={<Registration onLogin={handleLogin} />}
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Players must log in before accessing god selection or chat */}
        <Route
          path="/travel"
          element={isLoggedIn ? <GodSelection /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/chat/:god"
          element={isLoggedIn ? <GodChat /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/quiz/:god"
          element={isLoggedIn ? <Quiz /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile onLogout={handleLogout} onAvatarChange={setAvatar} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;