const Router = require('express')
const router = new Router()

const sdekController = require('../../controllers/delivery/sdekController')
const authMiddlewarre = require('../../middleware/authMiddleware')


router.get('/test', sdekController.test) // тестовый роут

router.post('/calculate', sdekController.calculate) // расчёт стоимости доставки
router.post('/new_order/:id', authMiddlewarre, sdekController.newOrder) // создание нового заказа
router.get('/get_order/:order_id', authMiddlewarre, sdekController.getOrder) // получить информацию о заказе (по номеру id из deliveries)
router.patch('/edit_order/:order_id', authMiddlewarre, sdekController.editOrder) // изменить данные в заказе (по номеру id из deliveries)
router.delete('/delete_order/:order_id', authMiddlewarre, sdekController.deleteOrder) // удалить заказ (по номеру id из deliveries)
router.post('/refusal_order/:order_id', authMiddlewarre, sdekController.refusalOrder) // отказ от заказа (по номеру id из deliveries)

router.post('/intakes/:order_id', authMiddlewarre, sdekController.newIntakes) // Регистрация заявки на вызов курьера (по номеру id из deliveries)

router.get('/delivery_points', sdekController.deliveryPoints) // 
router.get('/location_regions', sdekController.locationRegions) // 
router.get('/location_cities', sdekController.locationSities) // 

router.post('/print_orders', authMiddlewarre, sdekController.printOrders) // Формирование квитанции к заказу
router.get('/print_orders/:uuid', authMiddlewarre, sdekController.getPrintOrders) // Получение квитанции к заказу


module.exports = router
