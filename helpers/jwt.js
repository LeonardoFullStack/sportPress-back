const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT a partir del id y el nombre del usuario.
 *
 * @function generarJwt
 * @param {string} uid - El uid del usuario.
 * @param {string} name - El nombre del usuario.
 * @returns {Promise<string>} Promesa que resuelve un string con el token JWT generado.
 * @throws {Error} Error al generar el token JWT.
 *
 * @example
 * generarJwt('123456', 'Juan Manuel')
 */
const generarJwt = (uid, name) => {
    
    return new Promise((resolve, reject)=>{
        let payload = {uid,name};
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'3h'},(error,token)=>{
            if (error) {
                reject({msg:'error al generar el token',error})
            }
            
            resolve(token)
        })
    })

}

module.exports = {
    generarJwt
}