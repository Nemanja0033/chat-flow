import React, { useState } from 'react'
import './style.css';
import {SendHorizontal } from 'lucide-react'


const ChatBody = ({socket, uername, room}) => {

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
            <input type="text" placeholder='Type. . .' />
            <button><SendHorizontal /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBody