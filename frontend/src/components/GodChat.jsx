import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import './GodChat.css';

const godDetails = {
    zeus: {
        name: 'Zeus',
        description: 'King of the Gods. Sky and Thunder',
        openingMessage: 'Who dares climb Olympus uninvited?',
    },
    athena: {
        name: 'Athena',
        description: 'Goddess of Wisdom and Strategy',
        openingMessage: 'Wisdom begins with a question. What would you like to know?',
    },
};

function GodChat() {
  const { god } = useParams();
  const selectedGod =godDetails[god];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function handleSend() {
    if (message.trim() === '') return;

    setMessages((previousMessages) => [...previousMessages, message]);

    setMessage('');
  }

  return (
    <div className={`god-chat-preview ${god}-chat-preview`}>
      <h2>Chat with {selectedGod ? selectedGod.name : god}</h2>
      <Link to="/">Back to God Selection</Link>

      {selectedGod && (
        <div className="god-chat-panel">
          <h3>{selectedGod.name}</h3>
          <p>{selectedGod.description}</p>

          <div className="god-message">
            {selectedGod.openingMessage}
          </div>

          {messages.map((sentMessage, index) => (
            <div key={index} className="god-message user-message">
                {sentMessage}
            </div>
          ))}
          
          <div className="god-chat-input">
            <input
              type="text"
              placeholder={`Ask ${selectedGod.name} a question..`}
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
