
import { useState } from 'react';
import './GodSelection.css';
import zeusImage from '../assets/zeus.png';

function GodSelection() {
    const gods = [
      // Olympians
      'Aphrodite',
      'Ares',
      'Athena',
      'Hermes',
      'Poseidon',
      'Zeus',

      // Titans
      'Atlas',
      'Hyperion',
      'Kronos',
      'Prometheus',
      'Rhea',
      'Themis',

      // Primordials
      'Chaos',
      'Chronos',
      'Gaia',
      'Nyx',
      'Tartarus',
      'Uranus'
    ];

    const godGroups = [
      {
        name: 'Olympians',
        gods: gods.slice(0,6)
      },
      {
        name: 'Titans',
        gods: gods.slice(6,12)
      },
      {
        name: 'Primordials',
        gods: gods.slice(12,18)
      }
    ];

    const [selectedGod, setSelectedGod] = useState(null);

  return (
    <div>
      <h2>Choose a Greek God</h2>
      <p>Select a god to begin your journey.</p>

      {godGroups.map((group) => (
        <section key={group.name} className="god-group">
          <h3>{group.name}</h3>

          <ul className="god-list">
            {group.gods.map((god) => (
              <li key={god}>
                <button
                  type="button"
                  className={`god-card ${selectedGod === god ? 'selected' : ''}`}
                  onClick={() => setSelectedGod(god)}
                  >
                    {god === 'Zeus' && (
                      <img
                      src={zeusImage}
                      alt="Zeus holding a lightning bolt"
                      className="god-card-image"
                      />
                    )}
                    <span>{god}</span>
                  </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
        
        {selectedGod && (
        <p>You have selected: {selectedGod}</p>
        )}


    </div>
  );
}

export default GodSelection;
