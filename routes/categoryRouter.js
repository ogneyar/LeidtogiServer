const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), categoryController.create) // создание новой записи
router.get('/', categoryController.getAll) // получение всех записей
router.get('/:sub_id', categoryController.getCategories) // получение записей по задданной подкатегории
router.delete('/:id', checkRole('ADMIN'), categoryController.delete) // удаление записи
router.put('/:id', checkRole('ADMIN'), categoryController.edit) // редактирование записей

module.exports = router