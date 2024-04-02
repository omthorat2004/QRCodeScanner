import React, { useEffect, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Admin = () => {
  const [students,setStudents] = useState([])
  const [updated,setUpdated] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  useEffect(()=>{
    const fetchStudents =async ()=>{
      try{
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students`)
        if(!response.ok){
          throw new Error('Server Error')
        }
        const {users} = await response.json()
        setStudents(users)
      }catch(err){
        setError('Server Error')
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    fetchStudents()

  },[updated])
 
  const handleUnverifiedClick = async(email)=>{
    // console.log('Unverify')
    try{
      const response = await fetch(`${BACKEND_URL}/unverify/${email}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email})
      })
      if(!response.ok){
        throw new Error('Server Error')
      }
      const {data} = await response.json()
      setUpdated(data)
    }catch(err){
      console.log(err)
      toast.error('Error in Updating student user information')
    }
  }
  const handleVerifiedClick =async (email)=>{
    try{
      const response = await fetch(`${BACKEND_URL}/verify/${email}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email})
      })
      if(!response.ok){
        throw new Error('Server Error')
      }
      const {data} = await response.json()
      setUpdated(data)
    }catch(err){
      console.log(err)
      toast.error('Error in Updating student user information')
    }
  }
  return (
    <div>
      {loading&&<BarLoader width='100vw' height='10px' color="#0275d8" />}
      {error&&<div>{error}</div>}
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">rank</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">Status</th>
      <th scope='col'>Action</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student)=>{
      return <tr>
        <td >{student.rank}</td>
        <td >{student.name}</td>
        <td >{student.email}</td>
        <td >{student.verified==true?<p className='text-success'>Verified</p>:<p className='text-danger'>Unverified</p>}</td>
        <td>{student.verified==true?<button onDoubleClick={()=>handleUnverifiedClick(student.email)} className='btn btn-primary' >Unverify</button>:<button onDoubleClick={()=>handleVerifiedClick(student.email)} className='btn btn-primary'>Verify</button>}</td>
      </tr>
    })}
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
<ToastContainer/>
    </div>
  );
}

export default Admin;
