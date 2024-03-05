
const Router = require('express')
const router = new Router()
const presentationController = require('../controllers/presentationController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', presentationController.getAll) // получение всех записей
router.post('/', checkRole('ADMIN'), presentationController.addOne) // добавление презентации
router.delete('/:name', checkRole('ADMIN'), presentationController.delOne) // удаление презентации

module.exports = router
