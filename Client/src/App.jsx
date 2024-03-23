import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Sign from './pages/Sign'
import Student from './pages/Student'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign' element={<Sign/>}/>
          <Route path='/:id' element={<Student/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
