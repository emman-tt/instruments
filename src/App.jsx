import { useState, useEffect } from 'react'
import Homepage from './pages/Homepage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Testpage from './pages/Testpage'
import LenisProvider from './utils/Lenis'
import Loader from './pages/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      {loading && <Loader finishLoading={() => setLoading(false)} />}
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
