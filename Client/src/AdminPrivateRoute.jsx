import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPrivateRoute = ({children}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        const adminToken = localStorage.getItem('admin-token')
        if(!adminToken){
            navigate('/admin-login')
        }
    },[])
  return (
    <>
        {children}
    </>
  );
}

export default AdminPrivateRoute;
