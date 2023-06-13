import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server.');
    });

    socket.on('server_message', (message) => {
      console.log('Server says:', message);
      setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const message = document.getElementById('messageInput').value.trim();
    if (message !== '') {
      socket.emit('client_message', message);
      document.getElementById('messageInput').value = '';
    }
  };

  return (
    <div>
      <h1>Socket.IO Boilerplate</h1>
      <div>
        {chatHistory.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input type="text" id="messageInput" placeholder="Enter a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
