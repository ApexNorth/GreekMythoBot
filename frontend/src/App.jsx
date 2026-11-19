import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './routes/Home.jsx';
import Chat from './routes/Chat.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
