const Router = require('express')
const router = new Router()

const prController = require('../../controllers/delivery/prController')


router.get('/calculate', prController.calculate) // расчёт стоимости доставки


module.exports = router
