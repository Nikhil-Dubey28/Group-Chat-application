import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, ListItemButton } from '@mui/material'

const Settings = () => {
    const navigate = useNavigate()
    const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')
    return (
        <div className='list-container'>
            <div className='ug-header' style={{justifyContent:"center"}}>
                <h1 className='con-title' style={{textAlign:'center'}}>Options</h1>
            </div>
            <div className='ug-list'>

            <ul style={{display:"flex",flexDirection:"column"}}>
            
                {/* <Button className='list-item' onClick = {() => navigate(`/app/view-members/${chat_id}`)}style={{background: "linear-gradient(to right, rgb(49, 70, 162),rgb(200, 48, 48))",borderRadius:"20px", color:"white",fontSize:"1.2rem"}} ><p className='con-lastMessage'>View Members</p></Button> */}
                <Button className='list-item' onClick = {() => navigate(`/app/view-members/${chat_id}`)}style={{borderRadius:"20px", color:"white",fontSize:"1.2rem",marginRight: "30px"}} ><p className='con-lastMessage3' style={{marginTop:"14px"}}>View Members</p></Button>
                <Button className="list-item"onClick={() => navigate(`/app/add-members/${chat_id}`)} style={{borderRadius:"20px", marginTop:"10px",color:"white",fontSize:"1.2rem",marginRight:"30px"}}><p className='con-lastMessage3' style={{marginTop:"14px"}}>Add Members to group</p></Button>
                <Button className="list-item"onClick={() => navigate(`/app/remove-members/${chat_id}`)} style={{borderRadius:"20px", marginTop:"10px", color:"white",fontSize:"1.2rem",marginRight:"30px"}}><p className='con-lastMessage3'style={{marginTop:"14px"}}>Remove Members from group</p></Button>
                {/* <Button className="list-item" style={{background: "linear-gradient(to right, rgb(49, 70, 162),rgb(200, 48, 48))",borderRadius:"20px", marginTop:"10px", color:"white",fontSize:"1.2rem"}}>Admins</Button>
                <Button className="list-item" style={{background: "linear-gradient(to right, rgb(49, 70, 162),rgb(200, 48, 48))",borderRadius:"20px", marginTop:"10px", color:"white",fontSize:"1.2rem"}}>Leave Group</Button> */}
            </ul>
            </div>
        </div>
    )
}

export default Settings