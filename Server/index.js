const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const pool = require('./db/pool')
const { sign } = require('jsonwebtoken');
const PORT = process.env.PORT;
const { createVolunteerTable } = require('./db/volunteersTable');
const createStudentTable = require('./db/studentsTable')



const app = express();
createVolunteerTable();
createStudentTable()

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM volunteers WHERE email=$1', [email]);
    if (!result.rows[0]) {
      return res.status(404).json({ message: 'User not exists' });
    }
    if (result.rows[0].password === password) {
      const token = sign({ id: result.rows[0].id }, process.env.JWT_KEY, {
        expiresIn: '3d',
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});


app.post('/',async(req,res)=>{
     const {studentData2} = req.body
     for(let x = 0;x<studentData2.length;x++){
        let studentData = studentData2[x]
        const insertQuery = `
  INSERT INTO students (
    Tier_id, 
    completed_gen_ai, 
    created_at, 
    dateofCompletion, 
    eligible_for_certificate, 
    email, 
    name, 
    pathwaycompleted, 
    rank, 
    sized_entered, 
    uid, 
    updated_at
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
  )
`;
const values = [
    studentData.Tier_id,
    studentData.completed_gen_ai,
    studentData.created_at,
    studentData.dateofCompletion,
    studentData.eligible_for_certificate,
    studentData.email,
    studentData.name,
    studentData.pathwaycompleted,
    studentData.rank,
    studentData.sized_entered,
    studentData.uid,
    studentData.updated_at
  ];
  
  // Execute the query with parameters
 await pool.query(insertQuery, values)
    .then(() => {
      console.log('Data inserted successfully');
      // You can proceed with further operations here
    })
    .catch(error => {
      console.error('Error inserting data:', error.message);
    });

     }


})
app.post('/sign', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const result = await pool.query('SELECT * FROM volunteers WHERE email=$1', [email]);
    if (result.rows[0]) {
      return res.status(403).json({ message: 'User already exists' });
    } else {
      const insertResult = await pool.query('INSERT INTO volunteers (name,email,password) VALUES ($1,$2,$3) RETURNING id', [name, email, password]);
      const token = sign({ id: insertResult.rows[0].id }, process.env.JWT_KEY, {
        expiresIn: '3d',
      });
      return res.status(201).json({ token });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT FROM students WHERE id=$1', [id]);
    if (!result.rows[0]) {
      return res.status(404).json({ message: 'Student not found!' });
    }
    if (result.rows[0].verified) {
      return res.status(403).json({ message: 'Student already verified' });
    }
    return res.status(200).json({ student: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.patch('/verify', async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query('UPDATE students SET verified=TRUE WHERE id=$1', [id]);
    return res.status(200).json({ message: 'Verified' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY rank ASC');
    console.log(result.rows.length)
    return res.status(200).json({ users: result.rows });
  
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Unexpected error occurred' });
  }
});

app.patch('/unverify/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await pool.query('UPDATE students SET verified=FALSE WHERE email=$1 ', [email]);
   
    return res.status(200).json({ data : 'Make it false' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Unexpected error occurred' });
  }
});

app.patch('/verify/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await pool.query('UPDATE students SET verified=TRUE WHERE email=$1 ', [email]);
    return res.status(200).json({ data:'Make it true' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Unexpected error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(PORT);
  console.log('Server Started');
});
