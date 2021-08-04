const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
// const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', ratingController.create) // создание новой записи
router.get('/:productId', ratingController.getAll) // получение записей по одному товару
router.get('/', ratingController.getOne) // получение записей одного клиента по одному товару
router.delete('/', ratingController.delete) // удаление записи
router.put('/', ratingController.edit) // редактирование записей

module.exports = router
