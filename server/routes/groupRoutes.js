const router = require('express').Router()
const groupController = require('../controller/groupController')
const auth = require('../middleware/auth')

router.delete('/group/remove-from-group/:groupId',auth,groupController.removeFromGroup)
router.post('/group/create-group',auth,groupController.createGroup)
router.post('/group/add-to-group/:groupId', auth,groupController.addToGroup)
router.get('/group/fetch-groups',auth,groupController.fetchUserGroups)
router.get('/group/fetch-users-to-add/:groupId',auth,groupController.fetchUsersToAdd)
router.get('/group/fetch-users-to-remove/:groupId',auth,groupController.fetchUsersToRemove)
router.get('/group/view-members/:groupId',auth,groupController.viewMembers)

module.exports = router