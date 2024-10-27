import React, { useEffect, useState } from 'react'
import './style.css';
import {SendHorizontal } from 'lucide-react'


const ChatBody = ({socket, username, room}) => {

  const [currentMessage, setCurrentMessage] = useState("")

  const sendMessage = async () => {
    if(currentMessage !== ''){
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
      }

      await socket.emit("send_message", messageData);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    })
  }, [socket]);

  return (
    <div>
       <div className='app-body'>
        <div className='header-section'>
          <img  className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        </div>

        <div className='messages-section'>

        </div>

        <div className='messages-input'>
          <div className='input-section'>
            <input type="text" placeholder='Type. . .' onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={sendMessage}><SendHorizontal /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBody