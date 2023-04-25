const express=require('express')

const router=express.Router()

const {getUserByEmail} = require('../controllers/apiUsersControllers')

router.post('/',getUserByEmail);

module.exports = router