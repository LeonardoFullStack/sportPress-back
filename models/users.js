const { Pool } = require('pg')
const queries = require('./queries')

const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'rrnjbnic',
    database: 'rrnjbnic',
    password: process.env.POSTGREPASS,
    port: 5432, // Puerto por defecto para PostgreSQL
    ssl: {
      rejectUnauthorized: false // Habilitar SSL sin verificar el certificado
    }
  });


  /**
   * 
   * @param {string} email el email obtenido por el usuario en el front
   * @returns {Promise<Array>} el resultado de la consulta
   */
  const getUserModel =async (email) => {
    let client,result;

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

  const getUserByIdModel =async (id) => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getUserById, [id])
        result = data.rows

    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
  }

/**
 * Obtiene todos los usuarios de la base de datos.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve en un array de objetos que representan los usuarios.
 * @throws {Error} Si ocurre un error al conectarse a la base de datos o al ejecutar la consulta.
 *
 * @example
 *
 * // Retorna un array de objetos que representan los usuarios.*/
  const getAllUsersModel =async () => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllUsers)
        result = data.rows

    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
  }


  /**
 * Crea un nuevo usuario en la base de datos.
 * @async
 * @function
 * @param {string} name - Nombre del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {string} team - Equipo al que pertenece el usuario.
 * @returns {Promise<object>} Objeto con la información del usuario creado.
 * @throws {Error} Si ocurre un error al crear el usuario.
 */
  const createUserModel = async (name, email, password, team) => {

    let client,result,fullData;
    const role = 'user'


    try {

        client = await pool.connect()
        const data = await client.query(queries.createUser, [name, email, password, role, team])
         fullData = await client.query(queries.getUserByEmail, [email]) //para saber también el id
        

    } catch (error) {

        throw error

    } finally {

        client.release()

    }

    return fullData.rows

  }


  /**
 * Actualiza los datos del usuario en la base de datos.Si no se pasa password, actualiza el rol. Si se pasa password, actualiza
 * ésta.
 *
 * @async
 * @function updateUserModel
 * @param {string} email - El email del usuario.
 * @param {string} role - El rol del usuario.
 * @param {string} [password] - La contraseña del usuario (opcional).
 * @returns {Promise<Array>} Promesa que resuelve un array de objetos con los datos actualizados del usuario.
 * @throws {Error} Error al actualizar los datos del usuario.
 *
 */
  const updateUserModel = async (email, role, password) => {

    let client,result,fullData;

    
    try {

      if (!password) {
        
        client = await pool.connect()
        const data = await client.query(queries.updateUserRole, [ email,role, ])
         fullData = await client.query(queries.getUserByEmail, [email]) //para saber también el id

      } else {
        
        client = await pool.connect()
        const data = await client.query(queries.updateUserPass, [ email,password, ])
         fullData = await client.query(queries.getUserByEmail, [email]) //para saber también el id

      }

        
        

    } catch (error) {
      console.log(error)
        throw error

    } finally {

        client.release()

    }
    
    return fullData.rows

  }


  /**
 * Elimina un usuario de la base de datos según su correo electrónico.
 *
 * @async
 * @param {string} email - Correo electrónico del usuario que se desea eliminar.
 * @returns {Promise} Una promesa que se resuelve con los resultados de la eliminación.
 * @throws {Error} Si se produce algún error al intentar eliminar al usuario.
 */
  const deleteUserModel = async (id) => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.deleteUser, [id])
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
    getUserModel,
    getUserByIdModel,
    getAllUsersModel,
    createUserModel,
    updateUserModel,
    deleteUserModel
  }