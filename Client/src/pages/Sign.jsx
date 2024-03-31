import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Sign = () => {
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name:'',
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
  console.log(import.meta.env.VITE_BACKEND_URL)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    try{
      const response = await fetch(`http://localhost:3001/sign`,{
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
      const data = await response.json()
      const {token} = data
      localStorage.setItem('auth-token',token)
      navigate('/')

    }catch(err){
      console.error(err)
    }
  }
  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
    <form onSubmit={handleSubmit}>
    <Box display='flex' width='350px' justifyContent='center' alignItems='center' flexDirection='column'>
            <TextField label='Name'  sx={{width:'100%',margin:'10px 0'}} name='name' type='text' value={formData.name} onChange={handleChange} />
            <TextField label='Email'  sx={{width:'100%',margin:'10px 0'}} name='email' type='email' value={formData.email} onChange={handleChange} />
            <TextField label='Password'  sx={{width:'100%',margin:'10px 0'}} name='password' type='password' onChange={handleChange} value={formData.password}/>
            <Button variant='contained'  sx={{width:'100%',margin:'10px 0'}}  type='submit'>Submit</Button>    
    </Box>
    {error&&<Alert severity='error' title={error}/>}
    </form>
</Stack>
  );
}

export default Sign;
