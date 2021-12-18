const Router = require('express')
const router = new Router()
const testerController = require('../controllers/testerController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/feed', checkRole("ADMIN"), testerController.setFeed)
router.get('/feed', testerController.getFeed)


module.exports = router