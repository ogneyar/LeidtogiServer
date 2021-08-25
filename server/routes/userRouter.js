const Router = require('express')

const userController = require('../controllers/userController')
const authMiddlewarre = require('../middleware/authMiddleware')
const registrationMiddleware = require('../middleware/registrationMiddleware')

const router = new Router()

router.post('/registration', registrationMiddleware, userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddlewarre, userController.check)

module.exports = router