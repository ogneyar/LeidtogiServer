const Router = require('express')

const userController = require('../controllers/userController')
const authMiddlewarre = require('../middleware/authMiddleware')
const registrationMiddleware = require('../middleware/registrationMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/registration', registrationMiddleware, userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddlewarre, userController.auth)
router.get('/info', authMiddlewarre, userController.info)
router.put('/update/:id', checkRole(['ADMIN','USER','CORP']), userController.update)

module.exports = router