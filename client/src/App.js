import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);
  const inputRef = useRef();

  const sendMessage = () => {
    socket.emit('message', { message, room });
    inputRef.current.value = '';
  }

  const sendRoom = () => {
    if (room === '') return;
    socket.emit('join_room', {room});
  }

  const sendName = () => {
    if (room === '') return;
    socket.emit('join_room', {name});
  }

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessageReceived((prev) => [...prev, data]);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <div className="App">
      <input placeholder='Room...' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={sendRoom}>Join</button>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <button onClick={sendName}>Join</button>

      <input ref={inputRef} placeholder='Message...' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messageReceived.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
}

export default App;
