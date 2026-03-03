import { useState } from 'react'
import Homepage from './pages/Homepage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Testpage from './pages/Testpage'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/test' element={<Testpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
