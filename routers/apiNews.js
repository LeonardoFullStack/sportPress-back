const express=require('express')
const router=express.Router()
const {check} = require('express-validator')
const {validarInputs} = require('../middleware/inputValidate')


const {
    getNewByIdAndComments, getLastNews, getMyLastNews, getLastNewsByTeam, getNewsByState, getNewsByStateAndUser,
    createNewById, updateNewState, updateNew, deleteNewAndComments, getRestOfNews
} = require('../controllers/apiNewsControllers')


router.get('/viewOne/:id', getNewByIdAndComments)

router.get('/lastnews/', getLastNews)

router.get('/restnews/', getRestOfNews)

router.get('/mylastnews/', getMyLastNews)

router.get('/newsbyteam/:team', getLastNewsByTeam)

router.get('/newsbystate/:state', getNewsByState)

/////POST//////

router.post('/newsstateuser/', getNewsByStateAndUser)

router.post('/createNew/', [
    check('title','Tienes que poner un título').not().isEmpty(),
    check('text', 'Tienes que poner un texto').not().isEmpty(),
    check('extract', 'Tienes que poner un extracto').not().isEmpty(),
    check('tags', 'Tienes que poner los tags').not().isEmpty(),
    check('image', 'Falta la imagen').not().isEmpty(),
    validarInputs
], createNewById)


////////PUT///////////

router.put('/updatenewstate/', updateNewState)

router.put('/updatenew/', updateNew)

//////DELETE////////

router.delete('/deletenew/:id_new', deleteNewAndComments)

module.exports=router

