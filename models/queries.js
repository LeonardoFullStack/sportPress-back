


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
    WHERE id_user=$1`,
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
    WHERE state='aproved'
    ORDER BY n.date DESC
    LIMIT 4`,
    getLastNewsWithoutTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags NOT LIKE '%' || $1 || '%' AND state='aproved'
    ORDER BY n.date DESC
    LIMIT 2`,
    getLastNewsWithTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags LIKE '%' || $1 || '%' AND state='aproved'
    ORDER BY n.date DESC
    LIMIT 2`,
    getLastNewsByTeam:
    `SELECT *
    FROM news AS n
    WHERE n.tags LIKE '%' || $1 || '%' AND state='aproved'
    ORDER BY n.date DESC
    LIMIT 4`,
    getNewsByState:
    `SELECT *
    FROM news
    WHERE state=$1`,
    getNewsByStateAndUser:
    `SELECT *
    FROM news
    WHERE state=$1 AND id_user=$2`,
    createNewByIdUser:
    `INSERT INTO news (id_user, title, extract, text, image, tags)
    VALUES
    ($1, $2, $3, $4, $5, $6)`,
    updateNewState:
    `UPDATE news
    SET state=$1
    WHERE id_new=$2`,
    updateNew:
    `UPDATE news
    SET title = $1, extract = $2, text = $3, image = $4, tags = $5, date = DEFAULT
    WHERE id_new = $6`,
    deleteNew:
    `DELETE FROM news
    WHERE id_new=$1`,
    getCommentsByUser:
    `SELECT *
    FROM comments
    WHERE id_user=$1`,
    getAllComments:
    `SELECT *
    FROM comments`,
    createCommentForNew:
    `INSERT INTO comments (text, id_user, id_new)
    VALUES
    ($1, $2, $3)
     `,
     updateNewById:
     `UPDATE comments
     SET text=$1, date = DEFAULT , edited=true
     WHERE id_comment=$2`,
     deleteCommentById:
     `DELETE 
     FROM comments
     WHERE id_comment=$1`,
     deleteCommentsOfNew:
     `DELETE 
     FROM comments
     WHERE id_new=$1`
}

module.exports = queries