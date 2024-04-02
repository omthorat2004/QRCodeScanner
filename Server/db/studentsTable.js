const pool = require('./pool')
const createStudentTable = ()=>{
    const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    Tier_id VARCHAR(32),
    completed_gen_ai INTEGER,
    created_at DATE,
    dateofCompletion DATE,
    eligible_for_certificate INTEGER,
    email VARCHAR(255),
    name VARCHAR(255),
    pathwaycompleted INTEGER,
    rank INTEGER,
    sized_entered INTEGER,
    uid VARCHAR(32),
    updated_at DATE,
    verified  BOOLEAN DEFAULT FALSE
  )
`;
pool.query(createTableQuery)
  .then(() => {
    console.log('Table created successfully');
    // You can proceed with further operations here
  })
  .catch(error => {
    console.error('Error creating table:', error.message);
  });
}
module.exports=createStudentTable;