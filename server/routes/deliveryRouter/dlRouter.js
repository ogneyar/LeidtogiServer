const Router = require('express')
const router = new Router()

const dlController = require('../../controllers/delivery/dlController')
const authMiddlewarre = require('../../middleware/authMiddleware')
const checkRole = require('../../middleware/checkRoleMiddleware')


router.post('/auth', authMiddlewarre, dlController.auth) // авторизация
// router.get('/auth', dlController.auth) // авторизация
router.get('/calculator', dlController.calculator) // Калькулятор стоимости и сроков заказа
router.get('/micro_calc', dlController.microCalc) // Калькулятор ориентировочной стоимости и сроков заказа

router.get('/kladr', dlController.kladr) // Поиск населённых пунктов
router.get('/url_terminals', dlController.terminals) // Справочник терминалов
router.get('/terminals_catalog', dlController.terminalsCatalog) // Справочник терминалов
router.get('/search_terminals', dlController.searchTerminals) // Поиск терминалов

router.get('/request_conditions', dlController.requestConditions) // Ограничения по параметрам заказа

// этот роут находится в testerRouter
// router.get('/places', checkRole("ADMIN"), dlController.places) // Справочник населённых пунктов
// этот роут пока неподключен
// router.get('/streets', checkRole("ADMIN"), dlController.streets) // Справочник улиц
// этот роут пока неподключен
// router.get('/load_types', checkRole("ADMIN"), dlController.loadTypes) // Справочник видов загрузки
// этот роут пока неподключен
// router.get('/servises', checkRole("ADMIN"), dlController.servises) // Справочник специальных требований к транспорту



module.exports = router