import React from 'react'

const MessageOthers = ({name,message}) => {
   
  return (
    <div className='other-message-container'>
        <div className='conversation-container'>
            <p className='con-icon'>{name[0]}</p>
            <div className='other-text-content'>
                <p className='con-title'>{name}</p>
                <p className='con-lastMessage'>{message}</p>
                {/* <p className='self-timeStamp'>12:00am</p> */}
            </div>
        </div>
    </div>
  )
}

export default MessageOthers