import React from 'react'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dadhboard from './pages/Dadhboard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dadhboard />} />
      </Routes>
    <Footer />
    </>
  )
}

export default App