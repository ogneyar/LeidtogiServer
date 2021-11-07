const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create) // создание новой записи
// router.get('/', orderController.getAll) // получение всех записей
// router.get('/:sub_id', orderController.getCategories) // получение записей по задданной подкатегории
// router.delete('/:id', checkRole('ADMIN'), orderController.delete) // удаление записи
// router.put('/:id', checkRole('ADMIN'), orderController.edit) // редактирование записей

module.exports = router