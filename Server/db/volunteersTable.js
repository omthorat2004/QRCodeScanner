const pool = require('./pool')

const createVolunteerTable = ()=>{
    try{
        pool.query('CREATE TABLE IF NOT EXISTS volunteers (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(45),email VARCHAR(45),password VARCHAR(55))')


    }catch(err){
        console.log(err)
    }

}
module.exports = {createVolunteerTable}