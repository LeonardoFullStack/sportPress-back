


const queries = {
    getUserByEmail : 
    `SELECT *
    FROM USERS
    WHERE email=$1`,
    getAllUsers : 
    `SELECT *
    FROM USERS`,
    createUser :
    `INSERT INTO users (name, email, password, role, team)
    VALUES
    ($1, $2, $3, $4, $5)`,
    updateUserPass:
    `UPDATE users
    SET password =$2
    WHERE email =$1`,
    updateUserRole: 
    `UPDATE users
    SET role =$2
    WHERE email =$1`,
    deleteUser: 
    `DELETE FROM users
    WHERE email=$1`
}

module.exports = queries