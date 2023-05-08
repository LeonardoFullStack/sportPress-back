

const {
    getNewByIdAndCommentsModel, getLastNewsModel, getMyLastNewsModel, getNewsByTeamModel, getNewsByStateModel,
    getNewsByStateAndUserModel, createNewByIdModel, updateNewStateModel, updateNewModel, deleteNewModel,
    getRestOfNewsModel
} = require('../models/news')

const {deleteCommentsOfNewModel} = require('../models/comments')

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
const getNewByIdAndComments = async (req, res) => {
    const { id } = req.params
    try {
        const petition = await getNewByIdAndCommentsModel(id)

        if (petition.newsLetter.length == 0) res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado la noticia'
        })
        else res.status(200).json({
            ok: true,
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
const getLastNews = async (req, res) => {


    try {
        const petition = await getLastNewsModel()

        res.status(200).json({
            ok: true,
            msg: 'últimas 4 noticias',
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
const getMyLastNews = async (req, res) => {
    const { team } = req.params

    try {
        const petition = await getMyLastNewsModel(team)
        res.status(200).json({
            ok: true,
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
const getLastNewsByTeam = async (req, res) => {
    const { team } = req.params

    try {
        const petition = await getNewsByTeamModel(team)
        res.status(200).json({
            ok: true,
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


/**
 * Obtiene las noticias de un estado específico.
 * @async
 * @function getNewsByState
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.params.state - El estado del cual se quieren obtener las noticias.
 * @throws {Object} - Objeto de error en caso de fallo en la obtención de noticias.
 */
const getNewsByState = async (req, res) => {
    const { state } = req.params


    try {
        const petition = await getNewsByStateModel(state)

        res.status(200).json({
            ok: true,
            msg: `Noticias en estado ${state}`,
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
 * Obtiene las noticias de un estado y un usuario específico y las devuelve como respuesta HTTP.
 *
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {string} req.body.state - El estado del que se desea obtener noticias.
 * @param {number} req.body.id_user - El ID del usuario del que se desea obtener noticias.
 
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se envía la respuesta HTTP.
 */
const getNewsByStateAndUser = async (req, res) => {
    const { state, id_user } = req.body

    if (!state || !id_user) {
        res.status(404).json({
            ok: false,
            msg: 'No se ha recibido el estado o el usuario correctamente',

        })

    } else {




        try {
            const petition = await getNewsByStateAndUserModel(state, id_user)

            if (petition.length == 0) {
                res.status(404).json({
                    ok: false,
                    msg: `No se han encontrado noticias del usuario ${id_user} en ese estado`,
                })

            } else {
                res.status(200).json({
                    ok: true,
                    msg: `Noticias en estado ${state} del usuario con id ${id_user}`,
                    data: petition
                })

            }



        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'contacta con el administrador',
                error
            })
        }
    }

}


/**
 * Controlador que se encarga de crear una nueva noticia asociada a un usuario específico en la base de datos.
 * @async
 * @function
 * @param {Object} req - Objeto que contiene los datos de la solicitud HTTP.
 * @param {Object} res - Objeto que se encarga de enviar la respuesta HTTP.
 * @param {number} req.body.id_user - ID del usuario que crea la noticia.
 * @param {string} req.body.title - Título de la noticia.
 * @param {string} req.body.extract - Extracto de la noticia.
 * @param {string} req.body.text - Texto completo de la noticia.
 * @param {string} req.body.image - URL de la imagen asociada a la noticia.
 * @param {string} req.body.tags - Etiquetas relacionadas con la noticia.
 */
const createNewById = async (req, res) => {
    const { id_user, title, extract, text, image, tags, altimage } = req.body

    try {
        const petition = await createNewByIdModel(id_user, title, extract, text, image, tags, altimage)
        res.status(200).json({
            ok: true,
            msg: 'Se ha creado la noticia.',
            data: {
                ...req.body
            }
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
 * Actualiza el estado de una noticia.
 * @async
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.state - El nuevo estado de la noticia.
 * @param {string} req.body.id_new - El ID de la noticia a actualizar.
 * @returns {Promise<void>} - Una promesa que resuelve con nada.
 * @throws {Object} - Un objeto de error si ocurre una excepción.
 */
const updateNewState = async (req, res) => {
    const { state, id_new } = req.body

    try {

        const petition = await updateNewStateModel(state, id_new)

        res.status(200).json({
            ok: true,
            msg: `Se ha modificado el estado de la noticia en ${state}.`
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
 * Actualiza una noticia existente en la base de datos.
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.body - El objeto que contiene los datos de la noticia a actualizar.
 * @param {string} req.body.title - El nuevo título de la noticia.
 * @param {string} req.body.extract - El nuevo extracto de la noticia.
 * @param {string} req.body.text - El nuevo texto completo de la noticia.
 * @param {string} req.body.image - La nueva URL de la imagen de la noticia.
 * @param {string[]} req.body.tags - Un array con las nuevas etiquetas de la noticia.
 * @param {number} req.body.id_new - El ID de la noticia que se va a actualizar.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación de actualización.
 * @throws {Error} Si la operación de actualización falla por alguna razón.
 */
const updateNew = async (req, res) => {
    const { title, extract, text, image, tags, id_new, altimage } = req.body

    try {

        const petition = await updateNewModel(title, extract, text, image, tags, id_new, altimage)

        res.status(200).json({
            ok: true,
            msg: `Se ha modificado la noticia con id ${id_new}.`
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
 * Elimina una noticia y sus comentarios asociados en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.params.id_new - ID de la noticia a eliminar
 */
const deleteNewAndComments = async (req, res) => {
    const { id_new } = req.params

    if (!id_new) {
        res.status(500).json({
            ok: false,
            msg: 'Falta el id en la consulta',
            
        })
    } else {

        try {
            const deleteComments = await deleteCommentsOfNewModel(id_new)
            const petition = await deleteNewModel(id_new)
            res.status(200).json({
                ok: true,
                msg: `Se ha eliminado la noticia con id ${id_new}`
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'contacta con el administrador',
                error
            })
        }
    }
}

const getRestOfNews = async (req,res) => {
    try {
        const petition = await getRestOfNewsModel()

        res.status(200).json({
            ok: true,
            msg: 'Resto de las noticias',
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
    getLastNewsByTeam,
    getNewsByState,
    getNewsByStateAndUser,
    createNewById,
    updateNewState,
    updateNew,
    deleteNewAndComments,
    getRestOfNews
}