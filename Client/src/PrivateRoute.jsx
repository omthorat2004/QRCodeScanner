import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {
  const navigate = useNavigate()
    useEffect(()=>{
        
        const token = localStorage.getItem('auth-token')
        if(!token){
            navigate('/login')
        }
    },[])
  return (
    <>
      {children}
    </>
  );
}

export default PrivateRoute;
