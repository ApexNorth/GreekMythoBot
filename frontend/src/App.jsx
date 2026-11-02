import { useState, useEffect } from 'react';
import './App.css';
import GodSelection from './components/GodSelection.jsx';


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + Vite + Express</h1>
      <p>{message ? message : 'If you see this then everything works!'}</p>
     
      <GodSelection />
    </div>
  );
}

export default App;
