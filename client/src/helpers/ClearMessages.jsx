import React from 'react'
import { Trash } from 'lucide-react'


const ClearMessages = ({room}) => {

    const clearMessages = () => {
        let msg = confirm(`All messages from ${room} room will be penamently deleted!`);
        if(msg) {
            localStorage.removeItem(`messages_${room}`);
        }
        location.reload();
    }

  return (
    <div><Trash onClick={clearMessages} /></div>
  )
}

export default ClearMessages