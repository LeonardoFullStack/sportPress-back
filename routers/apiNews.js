const express=require('express')
const router=express.Router()
const {check} = require('express-validator')
const {validarInputs} = require('../middleware/inputValidate')
const {getNewByIdAndComments, getLastNews, getMyLastNews, getLastNewsByTeam} = require('../controllers/apiNewsControllers')


router.get('/viewOne/:id', getNewByIdAndComments)

router.get('/lastnews/', getLastNews)

router.get('/mylastnews/:team', getMyLastNews)

router.get('/newsbyteam/:team', getLastNewsByTeam)



module.exports=router

