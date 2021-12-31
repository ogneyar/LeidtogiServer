const Router = require('express')
const router = new Router()

const pekController = require('../../controllers/delivery/pekController')


router.get('/calculate', pekController.calculate) // расчёт стоимости доставки


module.exports = router
