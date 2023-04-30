const express=require('express')
const {check} = require('express-validator')

const router=express.Router()

const {getUserByEmail, getAllUsers, createUser, updateRole, updatePass, deleteUser} = require('../controllers/apiUsersControllers');
const {validarInputs} = require('../middleware/inputValidate')

router.get('/', getAllUsers)

router.post('/',getUserByEmail);

router.post('/signup', [
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('password', 'Tiene que tener mínimo 4 caracteres').not().isEmpty().isLength({ min: 4 }),
    validarInputs
], createUser)

router.put('/updaterole', updateRole)

router.put('/updatepass', updatePass)

router.delete('/deleteuser/:id', deleteUser)

module.exports = router