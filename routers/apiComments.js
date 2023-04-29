const express=require('express')
const router=express.Router()
const {check} = require('express-validator')
const {validarInputs} = require('../middleware/inputValidate')
const {
    getCommentsByUser, createCommentForNew, updateCommentById, deleteCommentById, deleteCommentsOfNew
} = require('../controllers/apiCommentsControllers')

router.get('/commentsuser/:id_user', getCommentsByUser)

//////POST//////

router.post('/createcomment/',[
    check('text', 'Debes rellenar el campo de texto').not().isEmpty(),
    validarInputs
] ,createCommentForNew),


/////////PUT/////////
router.put('/updatecomment',[
    check('text', 'Debes rellenar el campo de texto').not().isEmpty(),
    validarInputs
] , updateCommentById)

////////DELETE////////

router.delete('/deletecomment/:id', deleteCommentById)

router.delete('/deletenewcomments/:id', deleteCommentsOfNew)


module.exports = router