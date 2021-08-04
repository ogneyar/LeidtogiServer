const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', checkRole('ADMIN'), productController.delete)
router.put('/edit/:id', checkRole('ADMIN'), productController.edit)
router.put('/rating/:id', checkRole('ADMIN'), productController.editRating)

module.exports = router