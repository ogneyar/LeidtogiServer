const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(['ADMIN','USER']), ratingController.create) // создание новой записи
router.get('/:productId', ratingController.getAll) // получение записей по одному товару
router.get('/', checkRole(['ADMIN','USER']), ratingController.getOne) // получение записей одного клиента по одному товару
router.delete('/', checkRole(['ADMIN','USER']), ratingController.delete) // удаление записи
router.put('/', checkRole(['ADMIN','USER']), ratingController.edit) // редактирование записей

module.exports = router
