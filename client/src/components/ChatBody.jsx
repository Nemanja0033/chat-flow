import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { SendHorizontal } from 'lucide-react';
import { PRIVATE_ROOM } from '../utils/privateRoom';

const ChatBody = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(`messages_${room}`));
    if (savedMessages) {
      setMessageList(savedMessages);
    }
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => {
        const updatedList = [...list, messageData];
        localStorage.setItem(`messages_${room}`, JSON.stringify(updatedList)); 
        return updatedList;
      });
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => {
        const updatedList = [...list, data];
        localStorage.setItem(`messages_${room}`, JSON.stringify(updatedList));
        return updatedList;
      });
    });
  }, [socket, room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

 const private_room = PRIVATE_ROOM;

  return (
    <div>
      <div className='app-body'>
        <div className='header-section'>
          <img className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        </div>

        <div className={room === private_room ? 'private-room' : 'message-section'}>
          {messageList.map((msg, index) => (
            <React.Fragment key={index}>
              <div className='message-bar' id={username === msg.user ? 'you' : 'other'}>
                <h2 className='message'>{msg.message}</h2>
              </div>
              <div className='msg-info' id={username === msg.user ? 'youInfo' : 'otherInfo'}>
                <p style={{ marginRight: '5px', fontWeight: 'lighter' }}>{msg.time}</p>
                <p style={{ fontWeight: 'bolder' }}>{msg.user === username ? 'You' : msg.user}</p>
              </div>
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className='messages-input'>
          <div className='input-section'>
            <input
              value={currentMessage}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              type='text'
              placeholder='Type...'
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button onClick={sendMessage}><SendHorizontal /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
