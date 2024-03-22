import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Sign from './pages/Sign'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign' element={<Sign/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
