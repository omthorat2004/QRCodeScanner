
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Student = () => {
    const {id} = useParams()
    const [error,setError] = useState('')
    const [student,setStudent] = useState(null)
    const navigate = useNavigate()
    const handleClick =async ()=>{
        try{
            const response = await fetch(`${BACKEND_URL}/verify}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({id:id})
        })
        if(!response.ok){
            const {message} = await response.json()
            throw new Error(message)
        }
        navigate('/')
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const response = await fetch(`${BACKEND_URL}/students/${id}`) 
                if(!response.ok){
                    const {message} = await response.json()
                    throw new Error(message)
                }
                const {student} = await response.json()
                setStudent(student)
            }catch(err){
                console.error(err)
            }
        }

    },[id])
    if(!student){
        return <h1>Loading</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
  return (
    <div>
      <h2>Email : {student.email}</h2>
      <h2>Name : {student.name}</h2>
      <Button onClick={handleClick} variant='contained'>Verify</Button>
    </div>
  );
}

export default Student;
