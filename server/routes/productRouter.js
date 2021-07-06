const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

router.delete('/:id', checkRole('ADMIN'), deviceController.delete)

module.exports = router