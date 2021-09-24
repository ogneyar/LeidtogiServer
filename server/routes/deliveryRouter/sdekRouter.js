const Router = require('express')
const router = new Router()

const sdekController = require('../../controllers/delivery/sdekController')
const authMiddlewarre = require('../../middleware/authMiddleware')


router.get('/test', sdekController.test) // тестирование

router.post('/calculate', sdekController.calculate) // расчёт стоимости доставки
router.post('/new_order/:id', authMiddlewarre, sdekController.newOrder) // создание нового заказа
router.get('/get_order/:order_id', authMiddlewarre, sdekController.getOrder) // получить информацию о заказе (по номеру id из deliveries)


module.exports = router
