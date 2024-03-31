import React, { useEffect, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';
const Admin = () => {
  const [students,setStudents] = useState([])
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

  },[])
  const handleUnverifiedClick = ()=>{
    console.log('Unverify')
  }
  const handleVerifiedClick = ()=>{
    console.log('Verify')
  }
  return (
    <div>
      {loading&&<BarLoader color="#36d7b7" />}
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
        <td >{student.verified?<p className='text-success'>Verified</p>:<p className='text-danger'>Unverified</p>}</td>
        <td>{student.verified?<button onDoubleClick={handleUnverifiedClick} className='btn btn-primary'>Unverify</button>:<button className='btn btn-primary'>Verify</button>}</td>
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
    </div>
  );
}

export default Admin;
