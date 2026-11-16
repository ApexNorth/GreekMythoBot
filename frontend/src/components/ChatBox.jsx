import {useState} from 'react';

function ChatBox({onSendMessage}){
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message != ''){
      onSendMessage(message);
      setMessage('')
    } else {
      alert('Please, enter a message!');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey){
      handleSend();
    }
  };

  return (
  <div>
    <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown}>
      </textarea>
    </div>
  )
}

export default ChatBox;
