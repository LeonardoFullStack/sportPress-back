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
* Obtiene los comentarios realizados por un usuario en concreto
*
* @async
* @function
* @param {number} id_user - El id del usuario del que se quieren obtener los comentarios
* @returns {Promise<Array>} Un array con los comentarios del usuario especificado
* @throws {Error} Si hay algún error al realizar la consulta en la base de datos
*/
const getCommentsByUserModel = async (id_user) => {
    let client, result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getCommentsByUser, [id_user])
        result = data.rows

    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
}

const getAllCommentsModel = async (id_user) => {
    let client, result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getAllComments)
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
 * Crea un comentario para una noticia específica
 * @param {string} text - El texto del comentario
 * @param {number} id_user - El ID del usuario que crea el comentario
 * @param {number} id_new - El ID de la noticia a la que se asocia el comentario
 * @returns {Promise<Object>} - Objeto con los detalles del comentario creado
 * @throws {Error} - Si se produce algún error al interactuar con la base de datos
 */
const createCommentsForNewModel = async (text, id_user, id_new, name) => {
    let client, result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.createCommentForNew, [text, id_user, id_new, name])
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
 * Actualiza el texto de un comentario en la base de datos.
 *
 * @async
 * @function updateCommentByIdModel
 * @param {string} text - El nuevo texto del comentario.
 * @param {number} id_comment - El ID del comentario a actualizar.
 * @returns {Promise<object>} El comentario actualizado en la base de datos.
 * @throws {Error} Si hay un error en la consulta SQL.
 */
const updateCommentByIdModel = async (text, id_comment) => {
    let client, result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.updateNewById, [text, id_comment])
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
 * Elimina un comentario de la base de datos según su ID.
 *
 * @async
 * @function deleteCommentByIdModel
 * @param {number} id_comment - El ID del comentario a eliminar.
 * @throws {Error} Si se produce algún error al realizar la consulta a la base de datos.
 * @returns {Promise<Array>} Una promesa que devuelve un array con los resultados de la consulta.
 */
const deleteCommentByIdModel = async (id_comment) => {
    let client, result;

    try {

        client = await pool.connect()
        

        const data = await client.query(queries.deleteCommentById, [id_comment])
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
 * Elimina los comentarios de una noticia por su id.
 * @async
 * @function
 * @param {number} id - El id de la noticia.
 * @returns {Promise<Object>} El resultado de la consulta a la base de datos.
 * @throws {Error} Si hay un error al conectarse a la base de datos.
 */
const deleteCommentsOfNewModel = async (id) => {
    let client, result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.deleteCommentsOfNew, [id])
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
    getCommentsByUserModel,
    createCommentsForNewModel,
    updateCommentByIdModel,
    deleteCommentByIdModel,
    deleteCommentsOfNewModel,
    getAllCommentsModel
}