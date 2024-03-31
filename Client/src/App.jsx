//email: ppj8988@gmail.com
import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPrivateRoute from './AdminPrivateRoute'
import './App.css'
import PrivateRoute from './PrivateRoute'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import Login from './pages/Login'
import Sign from './pages/Sign'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign' element={<Sign/>}/>
          <Route path='/:id' element={<PrivateRoute/>}/>
          <Route path='admin-login' element={<AdminLogin/>}/>
          <Route path='/admin' element={<AdminPrivateRoute><Admin/></AdminPrivateRoute>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
