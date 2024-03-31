const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./db/pool')
const {sign} = require('jsonwebtoken')
const PORT = process.env.PORT
const {createVolunteerTable} = require('./db/volunteersTable')

const app = express()
createVolunteerTable()

app.use(cors())
app.use(express.json()) 

app.post('/login',(req,res)=>{
    try{
        const {email,password} = req.body
        pool.query('SELECT * FROM volunteers WHERE email=? ',[email],(err,result)=>{
            if (err) throw err
            if(!result[0]){
                return res.status(404).json({message:'User not exists'})
            }
            if(result[0].password==password){
                const token = sign({id:result[0].id},process.nextTick.JWT_KEY,{
                    expiresIn:'3d'
                })
                return res.status(200).json({token:token})
            }
            else{
                return res.status(401).json({message:'Email or password is incorrect'})
            }
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Server Error"})
    }
})

app.post('/sign',(req,res)=>{
    try{
        const {name,password,email} = req.body
        pool.query('SELECT * FROM volunteers WHERE email=?',[email],(err,result)=>{
            if (err) throw err
            if(result[0]){
                return res.status(403).json({message:'User already exists'})
            }
            else{
                pool.query('INSERT INTO volunteers (name,email,password) VALUES (?,?,?)',[name,email,password],(insertError,insertResult)=>{
                    if (insertError) throw insertError
                    const token = sign({id:insertResult.insertId},process.env.JWT_KEY,{
                        expiresIn:'3d'
                    })
                    return res.status(201).json({token:token})
                })
            }
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }
})

app.get('/students/:id',(req,res)=>{
    const {id}  = req.params
    try{
        pool.query('SELECT FROM students WHERE id=?',[id],(err,result)=>{
            if (err) throw err
            if(!result[0]){
                return res.status(404).json({message:'Student not found!'})
            }
            if(result[0].verified){
                return res.status(403).json({message:'Student already verified'})
            }
            return res.status(200).json({student:result[0]})
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Server Error'})
    }
})

app.patch('/verify',(req,res)=>{
    try{
        const {id} = req.body
        pool.query('UPDATE students SET verified=1 WHERE id=?',[id],(err,result)=>{
            if (err) throw err
            return res.status(200).json({message:'Verified'})
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Server Error'})
    }
})

app.get('/students',(req,res)=>{
    try{
        pool.query('SELECT * FROM students ORDER BY rank ASC ',(err,result)=>{
            if (err) throw err
            return res.status(200).json({users:result})
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Unexpected error occurred'})
    }
})

app.patch('/unverify/:email',(req,res)=>{
    const {email} = req.params
    try{
        pool.query('UPDATE students SET verified=0 WHERE email=?',[email],(err,result)=>{
            if (err) throw err
            pool.query('SELECT * FROM students ',(err,users)=>{
                return res.status(200).json({users:users})
            })
           
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }
})
app.patch('/verify/:email',(req,res)=>{
    const {email} = req.params
    try{
        pool.query('UPDATE students SET verified=1 WHERE email=?',[email],(err,result)=>{
            if (err) throw err
            pool.query('SELECT * FROM students ',(err,users)=>{
                return res.status(200).json({users:users})
            })
           
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }
})

app.listen(PORT,()=>{
    console.log(PORT)
    console.log('Server Started')
})