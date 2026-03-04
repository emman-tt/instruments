import { useState } from 'react'
import Homepage from './pages/Homepage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Testpage from './pages/Testpage'
import LenisProvider from './utils/Lenis'

function App () {
  return (
    <BrowserRouter>
      <LenisProvider>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/test' element={<Testpage />} />
        </Routes>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App
