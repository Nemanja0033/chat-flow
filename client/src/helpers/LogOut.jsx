import { LogOutIcon } from 'lucide-react'
import React from 'react'

const LogOut = () => {

    const logOut = () => {
        localStorage.removeItem('loggedRoom');
        localStorage.removeItem('loggedUsername');
        location.reload();
    }

  return (
    <div className='logout-icon'><LogOutIcon onClick={logOut} /></div>
  )
}

export default LogOut