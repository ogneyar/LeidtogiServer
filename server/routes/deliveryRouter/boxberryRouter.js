const Router = require('express')
const router = new Router()

const boxberryController = require('../../controllers/delivery/boxberryController')
const authMiddlewarre = require('../../middleware/authMiddleware')


router.get('/deliveryCosts', boxberryController.deliveryCosts) // расчёт стоимости доставки
router.get('/listCities', boxberryController.listCities) // Список городов доставки
router.get('/listCitiesFull', boxberryController.listCitiesFull) // Список городов доставки (полный)
router.get('/listPoints', boxberryController.listPoints) // Список ПВЗ
router.get('/listZips', boxberryController.listZips) // Список почтовых индексов для КД (Курьерская Доставка)
router.get('/zipCheck', boxberryController.zipCheck) // Проверка почтового индекса для КД (Курьерская Доставка)

module.exports = router