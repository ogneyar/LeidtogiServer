const Router = require('express')

const userController = require('../controllers/userController')
const authMiddlewarre = require('../middleware/authMiddleware')
const registrationMiddleware = require('../middleware/registrationMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

// router.post('/registration', registrationMiddleware, userController.registration)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', authMiddlewarre, userController.activate)
router.get('/info', authMiddlewarre, userController.info)
// router.get('/auth', authMiddlewarre, userController.auth)
router.get('/refresh', userController.refresh)
router.put('/update/:id', checkRole(['ADMIN','USER','CORP']), userController.update)


module.exports = router