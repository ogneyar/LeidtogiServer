const Router = require('express')
const router = new Router()

const mailController = require('../controllers/mailController')


router.post('/request_price', mailController.requestPrice)


module.exports = router