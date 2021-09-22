const Router = require('express')
const router = new Router()

const sdekController = require('../../controllers/delivery/sdekController')


router.get('/test', sdekController.test) // тестирование

router.post('/calculate', sdekController.calculate) // расчёт стоимости доставки
router.post('/new_order', sdekController.newOrder) // создание нового заказа


module.exports = router
