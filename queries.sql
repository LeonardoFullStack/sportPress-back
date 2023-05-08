const pool = new Pool({
    host: 'horton.db.elephantsql.com',
    user: 'rrnjbnic',
    database: 'rrnjbnic',
    password: 'R7Q-PyZAJiVv75lLUXl_1B6ANxKfrVBn',
    port: 5432, // Puerto por defecto para PostgreSQL
    ssl: {
      rejectUnauthorized: false // Habilitar SSL sin verificar el certificado
    }
  });

CREATE TABLE users (
    id_user serial  NOT NULL PRIMARY KEY,
    name varchar(45) NOT NULL, 
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    role varchar(45) NOT NULL,
    team varchar(45)
    )

CREATE TABLE comments (
    id_comment serial NOT NULL PRIMARY KEY,
    text TEXT NOT NULL,
    id_new FOREIGN KEY (id_new) REFERENCES news(id_new),
    id_user FOREIGN KEY (id_user) REFERENCES users(id_user), --faltan estas dos
    date TIMESTAMP DEFAULT to_timestamp(to_char(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS'), 'DD/MM/YYYY HH24:MI:SS'),
    edited boolean DEFAULT false
)

CREATE TABLE news (
    id_new serial NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    text TEXT,
    extract varchar(100) NOT NULL,
    image varchar(255) NOT NULL,
    tags varchar(100) NOT NULL,
    date TIMESTAMP DEFAULT to_timestamp(to_char(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS'), 'DD/MM/YYYY HH24:MI:SS'),
    state varchar(50),
    altimage varchar(100)
)
