const {
    getNewByIdAndCommentsModel, getLastNewsModel, getMyLastNewsModel, getNewsByTeamModel
} = require('../models/news')


/**
 * Función asíncrona para obtener una noticia y sus comentarios a partir de un ID
 * @function
 * @async
 * @param {Object} req - objeto de solicitud HTTP
 * @param {Object} res - objeto de respuesta HTTP
 * @param {string} req.params.id - ID de la noticia
 * @returns {Object} - objeto JSON con información de la noticia y sus comentarios
 * @throws {Object} - objeto JSON con información sobre el error ocurrido durante la ejecución
 */
const getNewByIdAndComments =async (req,res) => {
    const {id} = req.params
    try {
       const petition = await getNewByIdAndCommentsModel(id) 
       
        if (petition.newsLetter.length == 0) res.status(404).json({
                                                ok:false,
                                                msg: 'No se ha encontrado la noticia'
                                                })
        else res.status(200).json({
                ok:true,
                msg: `Noticia con id ${id} y sus comentarios`,
                data: petition
             })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}

/**
 * Función asincrónica que maneja la solicitud de obtener la última noticia de la base de datos.
 *
 * @async
 * @function
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @param {object} petition - datos de las últimas 4 noticias.
 *
 */
const getLastNews= async(req,res) => {


    try {
        const petition = await getLastNewsModel()

        res.status(200).json({
            ok:true,
            msg:'últimas 4 noticias',
            data: petition
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}


/**
 * Obtiene las últimas noticias combinadas con las de un equipo determinado
 * @async
 * @function getMyLastNews
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} req.params.team - El nombre del equipo del que se desean obtener las noticias.
 * @returns {Promise} Una promesa que se resuelve con un objeto que contiene las últimas noticias relacionadas y no relacionadas con el equipo especificado.
 * @throws {Error} Si se produce algún error al obtener las noticias.
 */
const getMyLastNews=async (req,res) => {
    const {team} = req.params

    try {
        const petition = await getMyLastNewsModel(team)
        res.status(200).json({
            ok:true,
            msg: '4 noticias combinadas',
            data: petition
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}


/**
 * Obtiene las últimas 4 noticias del equipo especificado.
 * @async
 * @function getLastNewsByTeam
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {string} req.params.team - Nombre del equipo.
 * @returns {object} Objeto que contiene las últimas 4 noticias del equipo.
 * @throws {Error} Si ocurre algún error al consultar la base de datos.
 */
const getLastNewsByTeam =async (req,res) => {
    const {team} = req.params

    try {
        const petition = await getNewsByTeamModel(team)
        res.status(200).json({
            ok:true,
            msg: `4 noticias del equipo ${team}`,
            data: petition
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}
module.exports = {
    getNewByIdAndComments,
    getLastNews,
    getMyLastNews,
    getLastNewsByTeam
}