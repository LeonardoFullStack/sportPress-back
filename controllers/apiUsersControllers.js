const {getUserModel} = require('../models/users')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {Array} petition La petición del modelo a través de elephant
 * @param {string} email El email del usuario proporcionado por el front
 * @throws {Error} Si ocurre un error en la conexión del model
 */
const getUserByEmail =async (req,res) => {
    const email = req.body.email

    try {

        const petition = await getUserModel(email)

        if (petition.length != 0) {
            
            res.status(200).json({
                ok:true,
                msg: `Se ha encontrado a ${email}`,
                petition
            })  

        } else {

            res.status(404).json({
                ok:false,
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

const getAllUsers = async (res,res) => {
    
}

module.exports = {
    getUserByEmail
}