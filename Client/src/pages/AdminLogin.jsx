import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(formData.email=='ppj8988@gmail.com'&&formData.password=='pass'){
            localStorage.setItem('admin-token',"Token")
            navigate('/admin')
        }else{
            setError('Incorrect email or password')
        }

    }
  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
    <Typography>Login As Admin</Typography>
    <form onSubmit={handleSubmit}>
    <Box display='flex' width='350px' justifyContent='center' alignItems='center' flexDirection='column'>
            <TextField sx={{width:'100%',margin:'10px 0'}} label='Email' name='email' type='email' value={formData.email} onChange={handleChange} required />
            <TextField sx={{width:'100%',margin:'10px 0'}} label='Password' name='password' onChange={handleChange} type='password' value={formData.password} required/>
            <Button  sx={{width:'100%',margin:'10px 0'}} variant='contained'  type='submit'>Submit</Button>    
    </Box>
    </form>
    {error&&<Alert severity='error'  >{error}</Alert>}
</Stack>
  );
}

export default AdminLogin;
