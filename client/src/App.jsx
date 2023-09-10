import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Signup from './Components/Signup/Signup'
import {BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'

function App() {
    

  return (
  <Router>
    <Routes>
      <Route path= '/signup' element ={<Signup />} />
    

      
    </Routes>
  </Router>
    
  )
}

export default App
