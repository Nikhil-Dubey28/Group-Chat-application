import React from 'react'
import '../myStyles.css'
import Sidebar from '../Sidebar/Sidebar'
import ChatArea from '../ChatArea/ChatArea'
import Welcome from '../Welcome/Welcome'
import CreateGroups from '../CreateGroups/CreateGroups'
import { Outlet } from 'react-router-dom'


const MainContainer = () => {
  
  return (
    <div className='main-container'>
        <Sidebar />
        {/* <ChatArea /> */}
        {/* <Welcome /> */}
        {/* <CreateGroups /> */}
        <Outlet />
            
    </div>
  )
}



export default MainContainer


