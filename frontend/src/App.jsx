import { useState, useEffect, Button } from 'react';
import {playSound, sound_lib} from '../src/sound.jsx';
import './App.css';

function test(test){
  alert(test);
}

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
      <button
        onClick={() => playSound('test')}
        >
        Click Me
        </button>
    </div>
  );
}

export default App;
