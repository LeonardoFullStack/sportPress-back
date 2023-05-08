const {
    getCommentsByUserModel, createCommentsForNewModel, updateCommentByIdModel, deleteCommentByIdModel,
    deleteCommentsOfNewModel, getAllCommentsModel
} = require('../models/comments')
const { getNewByIdAndCommentsModel } = require('../models/news')


/**
 * Obtiene todos los comentarios de un usuario específico.
 *
 * @async
 * @function
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @param {string} req.params.id_user - El ID del usuario cuyos comentarios se desean obtener.
 * @param {object} petition - Petición de la consulta.
 * @throws {Error} - Si hay un error al ejecutar la consulta.
 */
const getCommentsByUser = async (req, res) => {
    const { id_user } = req.params

    try {
        const petition = await getCommentsByUserModel(id_user)

        res.status(200).json({
            ok: true,
            msg: `Todos los comentarios del usuario con id ${id_user}`,
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
 * Crea un comentario para una noticia
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} req.body.text - El contenido del comentario.
 * @param {number} req.body.id_user - El ID del usuario que hizo el comentario.
 * @param {number} req.body.id_new - El ID de la noticia donde se publicó el comentario.
 * @throws {Object} - El objeto de error en caso de que algo falle en la operación.
 */
const createCommentForNew = async (req, res) => {
    const { text, id_user, id_new, name } = req.body

    if (!id_user || !id_new) {
        res.status(404).json({
            ok: false,
            msg: 'noticia/usuario desconocidos',

        })
    } else {

        try {
            const petition = await createCommentsForNewModel(text, id_user, id_new, name)
            const newData = await getNewByIdAndCommentsModel(id_new)
            console.log(newData)
            res.status(200).json({
                ok: true,
                msg: 'El comentario ha sido publicado',
                data:newData
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


/**
 * Actualiza el texto de un comentario dado su id.
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} req.body.text - Texto actualizado del comentario.
 * @param {string} req.body.id_comment - Id del comentario a actualizar.
 * @throws {Error} Error al actualizar el comentario.
 */
const updateCommentById = async (req, res) => {
    const { text, id_comment } = req.body


    if (!id_comment) {
        res.status(404).json({
            ok: false,
            msg: 'No hay id del comentario en la petición',

        })
    } else {
        try {
            const petition = updateCommentByIdModel(text, id_comment)
            res.status(200).json({
                ok: true,
                msg: 'Se ha editado el comentario',

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


/**
 * Elimina un comentario por su id.
 * @async
 * @function deleteCommentById
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {string} req.params.id - Id del comentario a eliminar.
 * @throws {object} - Error de servidor si la solicitud no puede ser manejada.
 */
const deleteCommentById = async (req, res) => {
    const { id } = req.params


    if (isNaN(id)) {

        res.status(404).json({
            ok: false,
            msg: ' id del comentario inválido',
        })

    } else {

        try {
            const comments = await getAllCommentsModel()
            console.log(comments)
            const commentExist = comments.filter(comment => comment.id_comment == id)
            console.log(comments)
            if (commentExist.length == 0) {

                res.status(404).json({
                    ok: false,
                    msg: `El comentario con id ${id} no existe`
                })

            } else {

                const petition = deleteCommentByIdModel(id)

                res.status(200).json({
                    ok: true,
                    msg: `Se ha eliminado el comentario con id ${id}`
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
 * Elimina los comentarios de una noticia dado su ID.
 *
 * @async
 * @function deleteCommentsOfNew
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 *
 * @throws {Error} - Si hay un error al eliminar los comentarios de la noticia.
 */
const deleteCommentsOfNew = async (req, res) => {
    const { id } = req.params


    if (isNaN(id)) {

        res.status(404).json({
            ok: false,
            msg: 'id de la noticia inválida',
        })

    } else {

        try {
            const petition = deleteCommentsOfNewModel(id)
            res.status(200).json({
                ok: true,
                msg: `Se ha eliminado los comentarios de la noticia ${id}`
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

module.exports = {
    getCommentsByUser,
    createCommentForNew,
    updateCommentById,
    deleteCommentById,
    deleteCommentsOfNew
}