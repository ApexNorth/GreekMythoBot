import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GodSelection from './components/GodSelection.jsx';
import GodChat from './components/GodChat.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GodSelection />} />
        <Route path="/chat/:god" element={<GodChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;