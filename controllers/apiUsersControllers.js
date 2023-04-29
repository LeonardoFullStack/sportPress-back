const { getUserModel, getAllUsersModel, createUserModel, updateUserModel, deleteUserModel } = require('../models/users')
const {generarJwt} = require('../helpers/jwt')
const bcrypt = require('bcryptjs')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {Array} petition La petición del modelo a través de elephant
 * @param {string} email El email del usuario proporcionado por el front
 * @throws {Error} Si ocurre un error en la conexión del model
 */
const getUserByEmail = async (req, res) => {
    const email = req.body.email

    try {

        const petition = await getUserModel(email)

        if (petition.length != 0) {

            const token = await generarJwt(petition[0].id_user, petition[0].name)

            res.status(200).json({
                ok: true,
                msg: `Se ha encontrado a ${email}`,
                data: petition,
                token
            })

        } else {

            res.status(404).json({
                ok: false,
                msg: 'No hay ningún usuario con ese email'
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


/**
 * 
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.

 */
const getAllUsers = async (req, res) => {
    try {

        const petition = await getAllUsersModel()



        res.status(200).json({
            ok: true,
            msg: `Todos los usuarios`,
            petition
        })




    } catch (error) {
        res.status(409).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}


/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @async
 * @function createUser
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Array} freeEmail devuelve un array vacío si el email está libre.
 * @throws {Error} Si ocurre algún error durante la operación
 */
const createUser = async (req, res) => {
    let { name, email, password, team } = req.body
    const freeEmail = await getUserModel(email)


    try {
        if (freeEmail.length != 0) res.status(409).json({
            ok: false,
            msg: 'Email ya en uso'
        })
        else {

            let salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt)

            const petition = await createUserModel(name, email, password, team)

            res.status(200).json({
                ok: true,
                msg: 'Se ha creado el usuario',
                data: petition
            })

        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }

}


/**
 * Actualiza el rol del usuario en la base de datos.
 *
 * @async
 * @function updatePass
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} role - rol actualizado del usuario.
 * @param {string} email - email del usuario a actualizar.
 * @param {Array} petition - datos actualizados del usuario.
 * @throws {Error} Error al actualizar la contraseña.
 *
 */
const updateRole = async (req,res) => {

    const {role, email} = req.body

    try {
        const petition = await updateUserModel(email,role)
        
        res.status(200).json({
            ok:true,
            msg: 'Se ha actualizado el usuario',
            data: petition
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}


/**
 * Actualiza la contraseña del usuario en la base de datos.
 *
 * @async
 * @function updatePass
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Array} petition - datos actualizados del usuario.
 * @param {string} password - password actualizado del usuario.
 * @param {string} email - email del usuario a actualizar.
 * @throws {Error} Error al actualizar la contraseña.
 *
 */
const updatePass = async (req,res) => {
    
    const {password, email} = req.body
    const role = 'user'

    try {

        let salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(password, salt)

        const petition = await updateUserModel(email,role,hashedPassword)
        
        res.status(200).json({
            ok:true,
            msg: 'Se ha actualizado la contraseña',
            data: petition
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}


/**
 * Elimina un usuario de la base de datos según su correo electrónico.
 *
 * @async
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {string} email - Email del usuario a eliminar.
 * @returns {Promise} Una promesa que se resuelve con los resultados de la eliminación.
 * @throws {Error} Si se produce algún error al intentar eliminar al usuario.
 */
const deleteUser = async (req,res) => {

    const {email} = req.body

    try {
        const petition = await deleteUserModel(email)

        res.status(200).json({
            ok:true,
            msg:'El usuario ha sido eliminado',
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'contacta con el administrador',
            error
        })
    }
}

module.exports = {
    getUserByEmail,
    getAllUsers,
    createUser,
    updateRole,
    updatePass,
    deleteUser
}