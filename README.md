# SportPress

Bienvenido a la documentación de back-end de la aplicación de SportPress de Leonardo, desde los comandos para iniciar el proyecto hasta las rutas para la administración de la
base de datos.
***

## PARA COMENZAR
Deberemos descargar el repositorio en nuestro ordenador con un git clone .

Luego deberemos añadir los datos proporcionados por classroom en el archivo ```.env.template``` , y eliminar el ```.template```.

A continuación, instalaremos las dependencias del proyecto, con el
comando ```npm install``` .

Y para finalizar, deberemos iniciar el proyecto con el comando
```npm run start``` .

***
## Endpoints
>https://documenter.getpostman.com/view/26092514/2s93eYWYD8

### users
- GET http://localhost:3000/api/users : Recoge a todos los usuarios 
- POST http://localhost:3000/api/users : Recoge a un usuario por su email, enviado por body como ```"email"```.
- POST http://localhost:3000/api/users/signup : Crea un usuario, con los siguientes datos enviados por body: ```name, email, role, password, team```
- PUT http://localhost:3000/api/users/updaterole : Modifica el rol del usuario, con ```role, email``` enviados por body.
- PUT http://localhost:3000/api/users/updatepass : Modifica la contraseña del usuario con ```email, password, newPassword``` enviados por body.
- DELETE http://localhost:3000/api/users/deleteuser/:id : Elimina el usuario, enviando el id por URL .
***

### news
- GET http://localhost:3000/api/news/viewone/:id : Obtiene los datos de una noticia y sus comentarios, enviando el id de la noticia por URL.
- GET http://localhost:3000/api/news/mylastnews/:team : Obtiene 4 noticias combinadas, siendo 2 con relación a un equipo (```:team```) y 2 no.
- GET http://localhost:3000/api/news/lastnews/ : Obtiene las últimas 4 noticias (aprobadas).
- GET http://localhost:3000/api/news/newsbystate/:state : Obtiene todas las noticias de un estado (```:state```) en específico.
- POST http://localhost:3000/api/news/newsstateuser/ : Obtiene las noticias de un usuario y un estado en concreto (enviados por body): ```state, id_user```.
- POST http://localhost:3000/api/news/createnew/  : Crea una noticia, los datos requeridos por body son: ```id_user, title, text, image, extract, tags, altimage```.
- PUT http://localhost:3000/api/news/updatenew : Modifica una noticia. ```id_new, title, text, image, extract, tags, altimage``` por body.
- PUT http://localhost:3000/api/news/updatenewstate : Modifica el estado de una noticia, ```state, id_new``` enviados por body.
- DELETE http://localhost:3000/api/news/deletenew/:id : Elimina los datos de una noticia y sus comentarios, amndando el id_new por URL.
***
### comments
- GET http://localhost:3000/api/comments/commentsuser/:id : Obtiene todos los comentarios de el usuario con un ```:id``` en concreto.
- POST http://localhost:3000/api/comments/createcomment : crea un comentario, los datos requeridos por body son ```id_user, text, id_new, name```.
- PUT http://localhost:3000/api/comments/updatecomment : Modifica un comentario, solo requiere el ```text, id_comment``` por body.
- DELETE http://localhost:3000/api/comments/deletecomment/:id : Elimina un comentario por su id, pasado por URL.
- DELETE http://localhost:3000/api/comments/deletenewcomments/:id : Elimina todos los comentarios de una noticia en concreto, pasando el id de la noticia por URL.
***

## DOCUMENTACIÓN DE FUNCIONES
 
Podéis consultar la documentación de las funciones en la siguiente URL:
>https://leonardofullstack.github.io/sportPress-back/ 


