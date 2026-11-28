import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './routes/Home.jsx';
import Chat from './routes/Chat.jsx';
import Registration from './routes/Registration.jsx';
import Login from './routes/Login.jsx';
import ForgotPassword from './routes/ForgotPassword.jsx';
import ResetPassword from './routes/ResetPassword.jsx';

import './App.css';

function test(test){
  alert(test);
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
