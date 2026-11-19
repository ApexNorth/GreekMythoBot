import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './routes/Home.jsx';
import Chat from './routes/Chat.jsx';
import Registration from './routes/Registration.jsx';
import Login from './routes/Login.jsx';
import ForgotPassword from './routes/ForgotPassword.jsx';
import ResetPassword from './routes/ResetPassword.jsx';
import './App.css';

function App() {
  // TODO BACKEND: GET /api/me on start-up to check for a login session, so a page refresh doesn't log you out
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO BACKEND: POST /api/logout so the server ends the login session too
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/registration" element={<Registration onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
