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
import GodSelection from './components/GodSelection.jsx';
import GodChat from './components/GodChat.jsx';
import './App.css';

/** Defines the application's pages and login-only routes. */
function App() {
  // TODO BACKEND: Check the user's login session when the app starts
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO BACKEND: End the user's session on the server when logging out
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route
          path="/registration"
          element={<Registration onLogin={() => setIsLoggedIn(true)} />}
        />

        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
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
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;