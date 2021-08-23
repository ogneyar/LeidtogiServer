const Router = require('express')
const router = new Router()
const parserController = require('../controllers/parserController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), parserController.getArrayImages)
router.get('/', parserController.test)

module.exports = router