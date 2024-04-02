const pool = require('./pool')

const createVolunteerTable = ()=>{
    try{
        pool.query('CREATE TABLE IF NOT EXISTS volunteers (id SERIAL PRIMARY KEY ,name VARCHAR(45),email VARCHAR(45),password VARCHAR(55))')


    }catch(err){
        console.log(err)
    }

}
module.exports = {createVolunteerTable}