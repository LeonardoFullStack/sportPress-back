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
 * Función asíncrona para obtener una noticia y sus comentarios a partir de un ID
 * @function
 * @async
 * @param {string} id - ID de la noticia
 * @param {object} newsLetter - JSON con la información de la noticia
 * @param {object} comments - JSON con los comentarios de esa noticia
 * @returns {Object} - objeto JSON con información de la noticia y sus comentarios
 * @throws {Object} - objeto JSON con información sobre el error ocurrido durante la ejecución
 */
const getNewByIdAndCommentsModel =async (id) => {
    let client,comments,result,newsLetter

    try {

        client = await pool.connect()
        const data = await client.query(queries.getNewById, [id])
        newsLetter = data.rows

        const data2 = await client.query(queries.getCommentsByNew, [id])
        comments = data2.rows

        result = {
            newsLetter,
            comments
        }

    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
}


/**
 * Obtiene el modelo de la última noticia de la base de datos.
 *
 * @async
 * @function
 * @returns {Promise<Array>} Modelo de las últimas 4 noticias
 * @throws {Error} Si ocurre un error al conectar con la base de datos
 *
 */
const getLastNewsModel= async () => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getLastNews)
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
 * Función asincrónica que maneja la solicitud de obtener las últimas noticias de un equipo específico o sin equipo.
 *
 * @async
 * @function
 * @param {string} team Nombre del equipo para filtrar las noticias (opcional, si no se proporciona se devolverán todas las noticias)
 * @returns {Promise<{ withTeam: Object[], withoutTeam: Object[] }>} Objeto que contiene dos arrays de objetos, uno para noticias con equipo y otro para noticias sin equipo.
 *
 */
const getMyLastNewsModel=async (team) => {
    let client,result,result1,result2;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getLastNewsWithTeam,[team])
        result1 = data.rows
        console.log(data)
        const data2 = await client.query(queries.getLastNewsWithoutTeam,[team])
        result2 = data2.rows

        result = {
            withTeam: result1,
            withoutTeam: result2
        }
        
    } catch (error) {

        console.log(error)
        throw error

    } finally {

        client.release()

    }

    return result
}


/**
 * Obtiene las últimas noticias de un equipo específico.
 * @async
 * @function getNewsByTeamModel
 * @param {string} team - Nombre del equipo del cual se desea obtener las noticias.
 * @returns {Promise<Array>} - Un array con las últimas noticias del equipo especificado.
 * @throws {Error} - Si ocurre algún error durante la ejecución de la consulta.
 */
const getNewsByTeamModel=async (team) => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getLastNewsByTeam,[team])
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
 * Obtiene las noticias de un estado específico desde la base de datos.
 * @async
 * @function getNewsByStateModel
 * @param {string} state - El estado del cual se quieren obtener las noticias.
 * @returns {Promise<Array>} - Promesa que se resuelve con un array de objetos JSON que contienen las noticias del estado especificado.
 * @throws {Object} - Objeto de error en caso de fallo en la obtención de noticias.
 */
const getNewsByStateModel=async (state) => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getNewsByState,[state])
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
 * Obtiene las noticias de un estado y un usuario específico.
 *
 * @async
 * @function
 * @param {string} state - El estado del que se quieren obtener las noticias.
 * @param {string} user - El identificador del usuario que creó las noticias.
 * @returns {Promise<Array>} - Una promesa que resuelve en un array con las noticias.
 * @throws {Error} - Si hay algún error al conectarse a la base de datos.
 */
const getNewsByStateAndUserModel =async (state, user) => {
    let client,result;

    try {

        client = await pool.connect()
        const data = await client.query(queries.getNewsByStateAndUser,[state, user])
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
 * Crea una nueva noticia en la base de datos asociada al usuario con un id específico.
 * @async
 * @function createNewByIdModel
 * @param {number} id_user - El id del usuario que está creando la noticia.
 * @param {string} title - El título de la noticia.
 * @param {string} extract - Un extracto de la noticia.
 * @param {string} text - El cuerpo de la noticia.
 * @param {string} image - La URL de la imagen asociada a la noticia.
 * @param {Array<string>} tags - Un array de strings que contiene las etiquetas asociadas a la noticia.
 * @throws {Error} Si ocurre algún error al ejecutar la consulta SQL.
 * @returns {Promise<Array<object>>} Una promesa que retorna un array con los datos de la nueva noticia creada.
 */
const createNewByIdModel = async (id_user, title, extract, text, image, tags) => {
     let client,result;

    try {
        client= await pool.connect()
        const data = await client.query(queries.createNewByIdUser, [id_user, title, extract, text, image, tags])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    }
    return result
}


/**
 * Actualiza el estado de una noticia en la base de datos.
 * @async
 * @param {string} newState - El nuevo estado de la noticia.
 * @param {string} id_new - El ID de la noticia a actualizar.
 * @returns {Promise<Array>} - Una promesa que resuelve con un arreglo de objetos con la información de la noticia actualizada.
 * @throws {Object} - Un objeto de error si ocurre una excepción.
 */
const updateNewStateModel = async (newState, id_new) => {
    let client,result;

    try {
        client= await pool.connect()
        const data = await client.query(queries.updateNewState, [newState, id_new])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    }
    return result
}


/**
 * Actualiza una noticia existente en la base de datos.
 * @async
 * @param {string} title - El título actualizado de la noticia.
 * @param {string} extract - El extracto actualizado de la noticia.
 * @param {string} text - El texto actualizado de la noticia.
 * @param {string} image - La URL de la imagen actualizada de la noticia.
 * @param {string} tags - Las etiquetas actualizadas de la noticia.
 * @param {number} id_new - El ID de la noticia que se actualizará.
 * @returns {Promise<Array<Object>>} El resultado de la consulta como un array de objetos.
 * @throws {Error} Si hay algún error en la consulta a la base de datos.
 */
const updateNewModel = async ( title, extract, text, image, tags, id_new) => {
    let client,result;

    try {
        client= await pool.connect()
        const data = await client.query(queries.updateNew, [title, extract, text, image, tags, id_new])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    }
    return result
}

const deleteNewModel = async (id) => {
    let client,result;


    try {

        client = await pool.connect()
        const data = await client.query(queries.deleteNew,[id])
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
    getNewByIdAndCommentsModel,
    getLastNewsModel,
    getMyLastNewsModel,
    getNewsByTeamModel,
    getNewsByStateModel,
    getNewsByStateAndUserModel,
    createNewByIdModel,
    updateNewStateModel,
    updateNewModel,
    deleteNewModel
}