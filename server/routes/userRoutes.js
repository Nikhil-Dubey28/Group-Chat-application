
const userController = require('../controller/userController')
const router = require('express').Router()

router.post('/users/signup', userController.signup)



module.exports = router

