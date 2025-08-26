import React from 'react'
import { Routes, Route } from 'react-router-dom'   
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
