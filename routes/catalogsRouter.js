
const Router = require('express')
const router = new Router()
const catalogsController = require('../controllers/catalogsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', catalogsController.getAll) // получение всех записей
router.post('/', checkRole('ADMIN'), catalogsController.addOne) // добавление каталога
router.delete('/:name', checkRole('ADMIN'), catalogsController.delOne) // удаление каталога

module.exports = router
