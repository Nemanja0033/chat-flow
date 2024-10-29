import React from 'react'
import './auth.css'
import { useState } from 'react';
import { Socket } from 'socket.io-client';

const Authentication = () => {
  
  const [username, setUsername] = useState("");
  const [ room, setRoom ] = useState("");

  const joinRoom = () => {
    if(username !== "" && room !== ""){
        Socket.emit("join_room", room);
        localStorage.setItem('loggedRoom', room);
    }
  }

  return (
    <div className='auth-body'>
        <img  className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        <div className='auth-inputs'>
            <h3>Sing Up</h3>
            <input type="text" name='name' placeholder='Enter name. . . ' onChange={(e) => setUsername(e.target.value)} />
            <input type="text" name='name' placeholder='Enter Room ID. . .' onChange={(e) => setRoom(e.target.value)} />
            <button onClick={joinRoomoinRoom}>Log In  </button>
        </div>
    </div>
  )
}

export default Authentication