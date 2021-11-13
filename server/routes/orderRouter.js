const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create) // создание новой записи
// router.get('/', orderController.getAll) // получение всех записей

router.put('/pay/:id', orderController.setPay) // редактирование записей

router.get('/test', orderController.test) // 

router.get('/:id', orderController.getOrder) // получение записи по задданному id
// router.delete('/:id', checkRole('ADMIN'), orderController.delete) // удаление записи




module.exports = router