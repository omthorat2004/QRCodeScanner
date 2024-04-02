
const {Pool} = require('pg')

const pool = new Pool({
    connectionString:"postgres://default:MnQaFtIdr96i@ep-broad-glitter-a402vlpy-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
})

module.exports = pool