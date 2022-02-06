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
router.get('/load_types', dlController.loadTypes) // Справочник видов загрузки
router.get('/servises', dlController.servises) // Справочник специальных требований к транспорту

// этот роут находится в testerRouter (для скачивания файла plases.csv)
router.get('/places', checkRole("ADMIN"), dlController.places) // Справочник населённых пунктов
// router.get('/places', dlController.places) // Справочник населённых пунктов

router.get('/get_places', dlController.getPlaces)

router.get('/streets', checkRole("ADMIN"), dlController.streets) // Справочник улиц
// router.get('/streets', dlController.streets) // Справочник улиц




module.exports = router