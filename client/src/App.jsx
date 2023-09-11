import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import {BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'

function App() {
    

  return (
  <Router>
    <Routes>
      <Route path= '/signup' element ={<Signup />} />
      <Route path= '/login' element = {<Login />} />
     </Routes>
  </Router>
    
  )
}
    

      

export default App
