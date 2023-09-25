import React from 'react'
import logo from '../../Images/live-chat.png'


const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='welcome-container'>
        <img src={logo} alt='logo' className='welcome-logo'></img>
        <p className='ug-header' style={{color:"black",padding:"10px 10px"}}>Welcome {user.name[0].toUpperCase()}{user.name.slice(1)}!</p>
        <p>"Empowering Real-Time Connections: Chat Anytime, Anywhere."</p>
    </div>
  )
}

export default Welcome