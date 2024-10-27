import React from 'react'
import './auth.css'

const Authentication = () => {
  return (
    <div className='auth-body'>
        <img  className='logo' src="https://i.postimg.cc/NFS4V2rK/logo.png" alt="logo" />
        <div className='auth-inputs'>
            <h3>Sing Up</h3>
            <input type="text" name='name' placeholder='Enter name. . . ' />
            <input type="text" name='name' placeholder='Enter Room ID. . .' />
            <button>Log In  </button>
        </div>
    </div>
  )
}

export default Authentication