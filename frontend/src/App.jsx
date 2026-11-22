import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './routes/Home.jsx';
import Chat from './routes/Chat.jsx';

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
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
