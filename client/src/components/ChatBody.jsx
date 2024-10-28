import React, { useEffect, useState } from 'react'
import './style.css';
import {SendHorizontal } from 'lucide-react'

const ChatBody = ({socket, username, room}) => {

  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if(currentMessage !== ''){
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
      }

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    })
  }, [socket]);


  return (
    <div>
       <div className='app-body'>
        <div className='header-section'>
          <img  className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        </div>


        <div className='messages-section'>
          {messageList.map((msg) => {
            return <><div className='message-bar' id={username === msg.user ? 'you' : 'other'}>
              <h2 className='message'>{msg.message}</h2>
            </div>
             <div className='msg-info' id={username === msg.user ? 'youInfo' : 'otherInfo'}>
             <p  style={{marginRight: '5px', fontWeight: 'lighter'}}>{msg.time}</p>
             <p  style={{fontWeight: 'bolder'}}>{msg.user === username ? 'You' : msg.user}</p>
             </div></>
          })}  
        </div>

        <div className='messages-input'>
          <div className='input-section'>
            <input value={currentMessage}  onKeyDown={(e) => { if(e.key === "Enter") sendMessage()}} type="text" placeholder='Type. . .' onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={sendMessage}><SendHorizontal /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBody