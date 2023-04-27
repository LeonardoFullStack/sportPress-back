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


module.exports = {
    getNewByIdAndCommentsModel,
    getLastNewsModel,
    getMyLastNewsModel,
    getNewsByTeamModel
}