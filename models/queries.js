


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
    WHERE email=$1`,
    getNewById:
    `SELECT * 
    FROM news AS n
    WHERE n.id_new = $1;`,
    getCommentsByNew:
    `SELECT c.*
    FROM comments AS c
    WHERE c.id_new = $1;`,
    getLastNews:
    `SELECT *
    FROM news AS n
    ORDER BY n.date DESC
    LIMIT 4`,
    getLastNewsWithoutTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags NOT LIKE '%' || $1 || '%'
    ORDER BY n.date DESC
    LIMIT 2`,
    getLastNewsWithTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags LIKE '%' || $1 || '%'
    ORDER BY n.date DESC
    LIMIT 2`,
    getLastNewsByTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags LIKE '%' || $1 || '%'
    ORDER BY n.date DESC
    LIMIT 4`
}

module.exports = queries