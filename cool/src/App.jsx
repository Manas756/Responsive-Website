import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import Agents from './pages/Agents.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/agents' element={<Agents/>} />
      </Routes>
    </div>
    )
}

export default App