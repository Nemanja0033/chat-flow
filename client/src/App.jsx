import { io } from 'socket.io-client'; 
import { useEffect, useState } from 'react';
import './auth.css';
import './style.css';
import ChatBody from './components/ChatBody';

const socket = io("https://chatflow-mls4.onrender.com", {
  transports: ["websocket", "polling"]
});

export const App = () => {
  const [username, setUsername] = useState("");
  const [ room, setRoom ] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
        socket.emit('join_room', (room));
        localStorage.setItem('loggedRoom', room);
        localStorage.setItem('loggedUsername', username);
        setIsJoined(true);
    }
    else{
      alert("Please log in!")
    }
};

  useEffect(() => {
    const savedRoom = localStorage.getItem('loggedRoom');
    const savedUsername = localStorage.getItem('loggedUsername');
    if(savedRoom && savedUsername) {
      setUsername(savedUsername);
      setRoom(savedRoom);
      socket.emit("join_room", savedRoom);
      setIsJoined(true);
    }
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  }, [])


  return (
    <>
    {!isJoined ? (
    <div className='auth-body'>
        <img  className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        <div className='auth-inputs'>
            <h3>Log In</h3>
            <input type="text" name='name' placeholder='Enter name. . . ' onChange={(e) => setUsername(e.target.value)} />
            <input type="text" name='name' placeholder='Enter Room ID. . .' onChange={(e) => setRoom(e.target.value)} />
            <button onClick={joinRoom}>Log In  </button>
        </div>
    </div>)
    :
    (<ChatBody socket={socket} username={username} room={room} />)}
 </>
    
  )
};

export default App;
