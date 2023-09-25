import React from 'react'

const MessageSelf = ({message}) => {
    
  return (
   <div className='self-message-container'>
        <div className='messageBox'>
            <p>{message}</p>
            
        </div>
   </div>
  )
}

export default MessageSelf