const Router = require('express')
const router = new Router()

const pekController = require('../../controllers/delivery/pekController')


router.get('/calculate', pekController.calculate) // расчёт стоимости доставки

router.get('/test', pekController.test) // тест


module.exports = router
