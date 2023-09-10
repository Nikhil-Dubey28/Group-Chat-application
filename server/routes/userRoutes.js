
const userController = require('../controller/userController')
const router = require('express').Router()

router.post('/users/signup', userController.signup)
// router.post ('users/login', userController.login)


module.exports = router

