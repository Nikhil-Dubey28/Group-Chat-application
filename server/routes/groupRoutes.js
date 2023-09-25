const router = require('express').Router()
const groupController = require('../controller/groupController')
const auth = require('../middleware/auth')


router.post('/group/create-group',auth,groupController.createGroup)

router.get('/group/fetch-groups',auth,groupController.fetchUserGroups)


module.exports = router