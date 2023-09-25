import React, { useEffect, useState } from 'react'
import '../myStyles.css'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import logo from '../../Images/live-chat.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Groups = () => {
    const navigate = useNavigate()

    const [groups,setGroups] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
            const token = localStorage.getItem('token')

            const response = await axios.get(`http://localhost:3000/api/group/fetch-groups`,{
                headers: {
                    Authorization: token
                }
            })
            console.log(response)
            setGroups(response.data)
            } catch (error) {
                    console.log(error)
            }
        }
        fetch()
    }, [])
    return (
        <div className='list-container'>
            <div className='ug-header' style={{justifyContent:"center"}}>
                {/* <img src={logo} style={{ height: "2rem", width: '2rem',justifyContent:"center" }} alt="" /> */}
                <p className='con-title' style={{text:"center", fontSize:"2.5rem"}}>Available Groups</p>
            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input type="text" placeholder='Search' className='search-box' />
            </div>
            <div className='ug-list'>
            {groups.map((group) => {
        return (
            <>
            <div className='list-item' key={group.id} onClick={() => navigate(`/app/chat/${group.id}&${group.name}`)}>
                <p className='con-icon'>{group.name[0]}</p>
                <p className='con-lastMessage4'>{group.name}</p>
            <div>
                {/* <p className='con-lastMessage'>{group.email}</p> */}
                </div>
            </div>

                </>
        );
    })}
                
            </div>
        </div>
    )
}

export default Groups



