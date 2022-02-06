const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.get('/get_one', brandController.getOne)
router.delete('/:id', checkRole('ADMIN'), brandController.delete)
router.put('/:id', checkRole('ADMIN'), brandController.edit)

module.exports = router