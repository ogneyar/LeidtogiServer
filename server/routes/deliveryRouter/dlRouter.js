const Router = require('express')
const router = new Router()

const dlController = require('../../controllers/delivery/dlController')
const authMiddlewarre = require('../../middleware/authMiddleware')


router.post('/auth', authMiddlewarre, dlController.auth) // авторизация
// router.get('/auth', dlController.auth) // авторизация
router.get('/calculator', dlController.calculator) // Калькулятор стоимости и сроков заказа
router.get('/micro_calc', dlController.microCalc) // Калькулятор ориентировочной стоимости и сроков заказа

router.get('/kladr', dlController.kladr) // Поиск населённых пунктов
router.get('/url_terminals', dlController.terminals) // Справочник терминалов
router.get('/terminals_catalog', dlController.terminalsCatalog) // Справочник терминалов
router.get('/search_terminals', dlController.searchTerminals) // Поиск терминалов


module.exports = router