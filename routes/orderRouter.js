const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create) // создание новой записи
router.get('/', checkRole("ADMIN"), orderController.getAll) // получение всех записей
router.get('/user/:user_id', authMiddleware, orderController.getOrdersForUser) // получение записей у заданного пользователя

router.put('/:id', checkRole("ADMIN"), orderController.editOrder) // редактирование записей
router.put('/pay/:uuid', orderController.setPay) // установка флага оплаченного товара
router.put('/taken/:id', orderController.setTaken) // установка статуса полученого товара

router.get('/test', orderController.test) // 

router.get('/:id', orderController.getOrder) // получение записи по задданному id
// router.delete('/:id', checkRole('ADMIN'), orderController.delete) // удаление записи




module.exports = router