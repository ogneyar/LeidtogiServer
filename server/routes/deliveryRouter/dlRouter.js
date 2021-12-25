const Router = require('express')
const router = new Router()

const dlController = require('../../controllers/delivery/dlController')
const authMiddlewarre = require('../../middleware/authMiddleware')


router.post('/auth', authMiddlewarre, dlController.auth) // авторизация
// router.get('/auth', dlController.auth) // авторизация
router.get('/calculator', dlController.calculator) // Калькулятор стоимости и сроков заказа
router.get('/micro_calc', dlController.micro_calc) // Калькулятор ориентировочной стоимости и сроков заказа


module.exports = router