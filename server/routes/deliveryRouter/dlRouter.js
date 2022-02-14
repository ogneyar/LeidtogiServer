const Router = require('express')
const router = new Router()

const dlController = require('../../controllers/delivery/dlController')
const authMiddlewarre = require('../../middleware/authMiddleware')
const checkRole = require('../../middleware/checkRoleMiddleware')

// ------------
//  Авторизация
// ------------

// Авторизация пользователя
if (process.env.URL === "http://localhost:5000") router.get('/auth_login', dlController.authLogin) // Авторизация пользователя
else router.get('/auth_login', authMiddlewarre, dlController.authLogin) // Авторизация пользователя
router.get('/auth_logout', dlController.authLogout) // Удаление сессии авторизации

router.get('/calculator', dlController.calculator) // Калькулятор стоимости и сроков заказа
router.get('/micro_calc', dlController.microCalc) // Калькулятор ориентировочной стоимости и сроков заказа

router.get('/kladr', dlController.kladr) // Поиск населённых пунктов
router.get('/url_terminals', dlController.terminals) // Справочник терминалов
router.get('/terminals_catalog', dlController.terminalsCatalog) // Справочник терминалов
router.get('/search_terminals', dlController.searchTerminals) // Поиск терминалов


// этот роут находится в testerRouter (для скачивания файла plases.csv)
router.get('/places', checkRole("ADMIN"), dlController.places) // Справочник населённых пунктов
router.get('/get_places', dlController.getPlaces) // парсинг файла static/deliveries/dl/places.csv

router.get('/streets', checkRole("ADMIN"), dlController.streets) // Справочник улиц

// -----------------
// Справочные методы
// -----------------

// Подбор даты отправки

// Подбор даты доставки

// Подбор времени приезда водителя
router.get('/request_time_interval', dlController.requestTimeInterval) // Интервалы передачи груза на адресе отправителя
router.get('/request_delivery_time_interval', dlController.requestDeliveryTimeInterval) // Интервалы передачи груза на адресе получателя
// Проверка ограничений
router.get('/request_conditions', dlController.requestConditions) // Ограничения по параметрам заказа
// Доступные упаковки
router.get('/packages_available', dlController.packagesAvailable) // Список доступных упаковок при заданных параметрах
// Поиск ОПФ
router.get('/references_opf_list', dlController.referencesOpfList) // Поиск ОПФ
// Поиск характера груза
router.get('/freight_types_search', dlController.freightTypesSearch) // Характер груза: поиск по строке (перевозка сборных грузов)
router.get('/freight_types_ftl', dlController.freightTypesFtl) // Характер груза: поиск по строке (перевозка еврофурой)
// Справочники
router.get('/request_delivery_types', dlController.requestDeliveryTypes) // Справочник видов доставки
router.get('/request_services', dlController.requestServices) // Справочник дополнительных услуг
router.get('/freight_types', dlController.freightTypes) // Характер груза
router.get('/load_params', dlController.loadParams) //Справочник услуг ПРР
router.get('/payer_types', dlController.payerTypes) //Справочник видов плательщиков
router.get('/payment_types', dlController.paymentTypes) // Справочник видов платежа
router.get('/documents_for_receive', dlController.documentsForReceive) // Документы для получения груза
router.get('/report_params', dlController.reportParams) // Справочник параметров для статистического отчета
router.get('/references_load_types', dlController.referencesLoadTypes) // Справочник видов загрузки
router.get('/references_servises', dlController.referencesServises) // Справочник специальных требований к транспорту
router.get('/references_packages', dlController.referencesPackages) // Справочник упаковок
router.get('/references_statuses', dlController.referencesStatuses) // Справочник статусов заказа груза
// Прайс-лист
router.get('/pricelist', dlController.pricelist) // Прайс-лист
router.get('/cities', dlController.cities) // Справочник городов из прайс-листа


module.exports = router