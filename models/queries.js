


const queries = {
    getUserByEmail : 
    `SELECT *
    FROM USERS
    WHERE email=$1`,
    getAllUsers : 
    `SELECT *
    FROM USERS`
}

module.exports = queries