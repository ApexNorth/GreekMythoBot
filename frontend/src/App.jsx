import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import './App.css';
import GodSelection from './components/GodSelection.jsx';

function ChatPlaceholder() {
  const { god } = useParams();

  return (
    <div>
      <h2>Chat with {god}</h2>
      <Link to="/">Back to God Selection</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GodSelection />} />
        <Route path="/chat/:god" element={<ChatPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;