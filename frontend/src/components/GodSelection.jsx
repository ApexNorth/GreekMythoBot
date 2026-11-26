import './GodSelection.css';
import { useNavigate } from 'react-router-dom';
import SelectionParallax from './SelectionParallax.jsx';

import olympiansDivider from '../assets/selection/olympians-divider.png';
import titansDivider from '../assets/selection/titans-divider.png';
import primordialsDivider from '../assets/selection/primordials-divider.png';
import headerClouds from '../assets/selection/header-clouds.png';

/* God Images and Era Groups */

const imageFiles = import.meta.glob('../assets/gods/*.png', {
  eager: true,
  query: '?url',
  import: 'default'
});

const godGroups = [
  {
    name: 'Olympians',
    divider: olympiansDivider,
    gods: ['Aphrodite', 'Ares', 'Athena', 'Hermes', 'Poseidon', 'Zeus']
  },
  {
    name: 'Titans',
    divider: titansDivider,
    gods: ['Atlas', 'Hyperion', 'Kronos', 'Prometheus', 'Rhea', 'Themis']
  },
  {
    name: 'Primordials',
    divider: primordialsDivider,
    gods: ['Chaos', 'Chronos', 'Gaia', 'Nyx', 'Tartarus', 'Ouranos']
  }
];

/* Background Parallax */

function handleSelectionParallax(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = event.currentTarget;
  const bounds = section.getBoundingClientRect();

  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  section.style.setProperty('--mountain-x', `${-x * 10}px`);
  section.style.setProperty('--mountain-y', `${-y * 10}px`);
  section.style.setProperty('--frame-x', `${-x * 20}px`);
  section.style.setProperty('--frame-y', `${-y * 20}px`);
}

/* God Selection Component */

function GodSelection() {
  const navigate = useNavigate();

  return (
    <div className="god-selection-page">
      <header className="god-selection-header"
        onMouseMove={handleSelectionParallax}
        >
          <img
          src={headerClouds}
          alt=""
          aria-hidden="true"
          className="god-header-clouds"
          />
        <h2>Choose a Greek God</h2>

        <div className="god-header-divider" aria-hidden="true">
          <span className="god-header-divider-line"></span>
          <span className="god-header-divider-symbol">✦</span>
          <span className="god-header-divider-line"></span>
        </div>

        <p>Select a god to begin your journey.</p>
      </header>

      {godGroups.map((group) => (
        <section
          key={group.name}
          className={`god-group god-group--${group.name.toLowerCase()}`}
          onMouseMove={handleSelectionParallax}
        >
          <SelectionParallax era={group.name} />

          <h3 className="era-heading">
            <img
              src={group.divider}
              alt=""
              className="era-divider era-divider-left"
            />

            <span>{group.name}</span>

            <img
              src={group.divider}
              alt=""
              className="era-divider era-divider-right"
            />
          </h3>

          <ul className="god-list">
            {group.gods.map((god) => {
              const godImage = imageFiles[`../assets/gods/${god.toLowerCase()}.png`];

              return (
                <li key={god}>
                  <div className="god-card">
                    {godImage && (
                      <img
                        src={godImage}
                        alt={`Illustration of ${god}`}
                        className="god-card-image"
                      />
                    )}

                    <span>{god}</span>

                    <div className="god-card-actions">
                      <button
                        type="button"
                        className="god-chat-button"
                        onClick={() => navigate(`/chat/${god.toLowerCase()}`)}
                      >
                        <span aria-hidden="true">💬</span> Chat
                      </button>

                      <button
                        type="button"
                        className="god-quiz-button"
                        disabled
                        title="Quiz coming soon"
                      >
                        <span aria-hidden="true">🎓</span> Quiz
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default GodSelection;