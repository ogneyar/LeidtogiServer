const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), categoryController.create)
// router.get('/', categoryController.getCategories)
router.get('/', categoryController.getAll)
router.get('/:sub_id', categoryController.getCategories)
router.delete('/:id', checkRole('ADMIN'), categoryController.delete)
router.put('/:id', checkRole('ADMIN'), categoryController.edit)

module.exports = router