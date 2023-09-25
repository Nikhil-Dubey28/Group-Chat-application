const router = require('express').Router()
const chatController = require('../controller/chatController')
const auth = require('../middleware/auth')

router.post('/chat/send-message',auth,chatController.sendMessage)
router.get('/chat/get-message/:id',auth,chatController.getMessage)



module.exports = router