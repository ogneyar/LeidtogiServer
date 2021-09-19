const Router = require('express')
const router = new Router()
const deliveryController = require('../controllers/deliveryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/sdek', deliveryController.sdek) // получение access_token

// router.get('/:productId', ratingController.getAll) // получение записей по одному товару
// router.get('/', checkRole(['ADMIN','USER','CORP']), ratingController.getOne) // получение записей одного клиента по одному товару
// router.delete('/', checkRole(['ADMIN','USER','CORP']), ratingController.delete) // удаление записи
// router.put('/', checkRole(['ADMIN','USER','CORP']), ratingController.edit) // редактирование записей

module.exports = router
