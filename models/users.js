const { Pool } = require('pg')
const queries = require('./queries')

const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'rrnjbnic',
    database: 'rrnjbnic',
    password: 'R7Q-PyZAJiVv75lLUXl_1B6ANxKfrVBn',
    port: 5432, // Puerto por defecto para PostgreSQL
    ssl: {
      rejectUnauthorized: false // Habilitar SSL sin verificar el certificado
    }
  });

  const getUserModel =async (email) => {
    let client,result,response;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getUserByEmail, [email])
        result = data.rows

    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
  }

  module.exports = {
    getUserModel
  }