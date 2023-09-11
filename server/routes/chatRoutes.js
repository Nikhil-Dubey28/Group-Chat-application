const router = require('express').Router()
const chatController = require('../controller/chatController')
const auth = require('../middleware/auth')

router.post('/chat/sendMessage',auth,chatController.sendMessage)



module.exports = router