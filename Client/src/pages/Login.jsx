import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Login = () => {
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    try{
      const response = await fetch(`${BACKEND_URL}/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      if(!response.ok){
        const {message} = await response.json()
        setError(message)
        throw new Error(message)
      } 
      const {token} = await response.json()
      localStorage.setItem("authToken",token)
      navigate('/')
    }catch(err){
      console.error(err)
    }
  }
  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
    <form onSubmit={handleSubmit}>
    <Box display='flex' width='350px' justifyContent='center' alignItems='center' flexDirection='column'>
            <TextField sx={{width:'100%',margin:'10px 0'}} label='Email' name='email' type='email' value={formData.email} onChange={handleChange} />
            <TextField sx={{width:'100%',margin:'10px 0'}} label='Password' name='password' onChange={handleChange} type='password' value={formData.password}/>
            <Button  sx={{width:'100%',margin:'10px 0'}} variant='contained'  type='submit'>Submit</Button>    
    </Box>
    </form>
    {error&&<Alert severity='error' title={error}/>}
</Stack>
  );
}

export default Login;
