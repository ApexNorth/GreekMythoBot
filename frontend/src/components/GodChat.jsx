import { Link, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './GodChat.css';
import ParallaxScene from './ParallaxScene.jsx';
import { scenes } from './parallaxScenes.js';

// Stores the information and opening message for each god

const godDetails = {
  zeus: {
    name: 'Zeus',
    description: 'King of the Gods and God of Thunder',
    openingMessage: 'Who dares climb Olympus uninvited?',
  },
  athena: {
    name: 'Athena',
    description: 'Goddess of Wisdom and Strategy',
    openingMessage: 'Wisdom begins with a question. What would you like to know?',
  },
  aphrodite: {
    name: 'Aphrodite',
    description: 'Goddess of Love, Beauty and Desire',
    openingMessage: 'Welcome, dear mortal! Tell me, what does your heart desire?',
  },
  ares: {
    name: 'Ares',
    description: 'God of War and Battle',
    openingMessage: 'Who enters my battlefield? Speak boldly, mortal. What brings you before Ares?',
  },
  hermes: {
    name: 'Hermes',
    description: 'Messenger of the Gods and God of Travel and Communication',
    openingMessage: 'Well, hello there, traveller! Looking for a story or a little adventure?',
  },
  poseidon: {
    name: 'Poseidon',
    description: 'God of the Sea, Earthquakes and Horses',
    openingMessage: 'The seas have brought you to my kingdom, traveller. What would you like to discover?',
  },
  rhea: {
    name: 'Rhea',
    description: 'Titaness of Motherhood and Mother of Zeus',
    openingMessage: 'Welcome, young traveller. Would you like to hear how I saved Zeus from his father?',
  },
  themis: {
    name: 'Themis',
    description: 'Titaness of Justice and Divine Order',
    openingMessage: 'Even the mighty gods must follow divine law. What brings you before me?',
  },
  atlas: {
    name: 'Atlas',
    description: 'Titan Condemned to Hold Up the Heavens',
    openingMessage: 'I have carried the heavens for ages, mortal. What brings you here?',
  },
  hyperion: {
    name: 'Hyperion',
    description: 'Titan of Heavenly Light',
    openingMessage: 'My children bring the Sun, Moon and Dawn. What would you like to know?',
  },
  kronos: {
    name: 'Kronos',
    description: 'King of the Titans and Father of Zeus',
    openingMessage: 'I ruled before the Olympians, mortal. What do you wish to know of my reign?',
  },
  prometheus: {
    name: 'Prometheus',
    description: 'Titan Who Gave Fire to Humanity',
    openingMessage: 'I gave humanity the gift of fire. What knowledge do you seek, mortal?',
  },
  ouranos: {
    name: 'Ouranos',
    description: 'Primordial God of the Sky',
    openingMessage: 'I am Ouranos, the sky abova all creation. What would you like to discoer about the first gods?',
  },
  chronos: {
    name: 'Chronos',
    description: 'Primordial Personification of Time',
    openingMessage: 'I am Chronos, and time flows through all things. What would you like to discover about eternity?'
  },
  gaia: {
    name: 'Gaia',
    description: 'Primordial Goddess of the Earth',
    openingMessage: 'Welcome, young traveller. I am Gaia, the Earth itself. What would you like the discover about our world?',
  },
  nyx: {
    name: 'Nyx',
    description: 'Primordial Goddess of the Night',
    openingMessage: 'Welcome to my realm, mortal. Even the mighty gods respect the darkness. What mysteries do you seek?',
  },
  tartarus: {
    name: 'Tartarus',
    description: 'Primordial God of the Deepest Abyss',
    openingMessage: 'You have reached the deepest depths, mortal. Few dare to enter my realm. What brings you here?',
  },
  chaos: {
    name: 'Chaos',
    description: 'Primordial Being of the Void and Beginning of Creation',
    openingMessage: 'Before the gods, there was only Chaos. From the endless void, creation began. What would you like to discover?',
  },
};

function GodChat() {
  const { god } = useParams();
  const selectedGod = godDetails[god];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  // Automatic scrolling when new message is added
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Add user message to the chat

  function handleSend() {
    if (message.trim() === '') return;

    setMessages((previousMessages) => [...previousMessages, message]);

    setMessage('');
  }

  // Move background layers when the mouse moves
  function handleMouseMove(event) {
    const layers = scenes[god];

    if (!layers) return;

    const area = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - area.left) / area.width - 0.5;
    const y = (event.clientY - area.top) / area.height - 0.5;

    const page = event.currentTarget;
    page.style.setProperty('--parallax-duration', '180ms');

    layers.forEach((layer) => {
      page.style.setProperty(
        `--${layer.id}-shift`,
        `${-x * layer.depth}px, ${-y * layer.depth}px`
      );
    });
  }

  // Return layers to original position
  function handleMouseLeave(event) {
    const layers = scenes[god];

    if (!layers) return;

    const page = event.currentTarget;
    page.style.setProperty('--parallax-duration', '900ms');

    layers.forEach((layer) => {
      page.style.removeProperty(`--${layer.id}-shift`);
    });
  }


  return (
    <div
      className={`god-chat-preview ${god}-chat-preview`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParallaxScene god={god} />

      <h2>Chat with {selectedGod ? selectedGod.name : god}</h2>
      <Link to="/travel">Back to God Selection</Link>

      {selectedGod && (
        <div className="god-chat-panel">

          <h3>{selectedGod.name}</h3>
          <p>{selectedGod.description}</p>

          <div className="god-chat-messages" ref={messagesRef}>

            <div className="god-message">
              {selectedGod.openingMessage}
            </div>

            {messages.map((sentMessage, index) => (
              <div key={index} className="god-message user-message">
                {sentMessage}
              </div>
            ))}

          </div>

          <div className="god-chat-input">
            <input
              type="text"
              placeholder={`Ask ${selectedGod.name} a question...`}
              aria-label={`Message to ${selectedGod.name}`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSend();
                }
              }}
            />

            <button type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GodChat;
