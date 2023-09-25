import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react'
import MessageOthers from '../MessageOthers/MessageOthers';
import MessageSelf from '../MessageSelf/MessageSelf';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const ChatArea = () => {
  const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const fetchMessages = async (chatId) => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3000/api/chat/get-message/${chatId}`,{
          headers: {
            Authorization:token
          }
        })
        console.log(response)
        // console.log(messages)
        setMessages(response.data)
        console.log(messages)
      } catch (error) {
        console.log(error)
      }
    }
    // const intervalId = setInterval(() => {
    //   fetchMessages(chat_id)
    // },1000)

    // return () => clearInterval(intervalId)
    fetchMessages(chat_id)
  },[])

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('token')

        const response = await axios.post(`http://localhost:3000/api/chat/send-message`,{
          message: messageContent,
          chatId: chat_id
        }, {
          headers:{
Authorization:token
          }
        })
        console.log(response)
        setMessages([...messages,response.data.chat])
        setMessageContent('')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='chatArea-container'>
      <div className='chatArea-header'>
        <p className='con-icon'>{chat_user[0]}</p>
        <div className='header-text'>
          <p className='con-header-title'>{chat_user}</p>
          {/* <p className='con-timeStamp'>today</p> */}
        </div>
        <IconButton
          onClick={() => navigate(`/app/settings/${chat_id}`)}
        >
          <Button>More options</Button>
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>

      </div>
      <div className='messages-container'>
    {messages.map((message,index) => {
      const senderId = message.userId 
      const myId = user.id
      console.log(message)
      if(senderId == myId) {
        return (
          <MessageSelf message= {message.message} key={index}/>
            
          )
        }else {
          return (
            <MessageOthers name={message.name} message={message.message} key={index} />

          )
        }
    })}
        {/* <MessageOthers /> */}
        {/* <MessageSelf /> */}
        {/* <MessageOthers /> */}
        {/* <MessageSelf /> */}
      </div>
      <div className='text-input-area'>
        <textarea type="text" placeholder='Type a message' className='search-box'
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          style={{width: '100%'}}
        />
        <IconButton
          onClick={handleSendMessage}
        >
          <SendIcon />
        </IconButton>
      </div>

    </div>
  )
}

export default ChatArea