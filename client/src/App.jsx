import React from 'react'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dadhboard from './pages/Dadhboard'
import Navbar from './components/Navbar'
import CreateQuestions from './components/CreateQuestions'
import ProgressTrack from './pages/ProgressTrack'
import Questions from './pages/Questions'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dadhboard />} />
        <Route path='/add-quetions' element={<CreateQuestions />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/progress-track' element={<ProgressTrack />} />
      </Routes>
    <Footer />
    </>
  )
}

export default App