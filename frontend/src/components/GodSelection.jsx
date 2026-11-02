
import { useState } from 'react';
import './GodSelection.css';

function GodSelection() {
    const gods = ['Zeus', 'Athena', 'Poseidon'];
    const [selectedGod, setSelectedGod] = useState(null);

  return (
    <div>
      <h2>Choose a Greek God</h2>
      <p>Select a god to begin your journey.</p>
      
        <ul className="god-list">
        {gods.map((god) => (            
            <li key={god}>
            
            <button 
            type="button"           
            className={`god-card ${selectedGod === god ? 'selected' : ''}`}
            onClick={() => setSelectedGod(god)}
            >
            {god}
            </button>

            </li>
        ))}
        </ul>
        
        {selectedGod && (
        <p>You have selected: {selectedGod}</p>
        )}


    </div>
  );
}

export default GodSelection;
