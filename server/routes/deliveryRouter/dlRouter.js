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
router.get('/auth_session_info', dlController.authSessionInfo) // Данные сессии
// Cписок контрагентов
router.get('/counteragents', dlController.counteragents) // Cписок контрагентов

// ------------------
// Выполнение расчета
// ------------------
// Калькулятор стоимости и сроков перевозки
router.get('/calculator', dlController.calculator) // Калькулятор стоимости и сроков перевозки
// Калькулятор услуги Доставка
router.get('/calculator_sf', dlController.calculatorSf) // Калькулятор услуги Доставка до адреса (?)
// Ориентировочные сроки и стоимость
router.get('/micro_calc', dlController.microCalc) // Калькулятор ориентировочной стоимости и сроков заказа

// -----------------
// Оформление заявок
// -----------------
// Перевозка сборных грузов

// Междугородняя перевозка еврофурой

// Перевозка малотоннажным транспортом

// Почасовая аренда транспорта

// Дополнение заказа доставкой

// Мультизаявка

// Пакетный заказ Pre-Alert


// ---------------------
// Информация по заказам
// ---------------------
// Журнал заказов

// Поиск по параметрам перевозки

// История изменений заказа

// Печатные формы

// Отчеты

// ------------------
// Управление заказом
// ------------------
// Повтор заказа

// Доступные изменения

// Изменение получателя

// Изменение плательщика

// Изменение контактной информации

// Изменение адреса и времени отправки

// Изменение адреса и времени доставки

// Отмена заказа и доставки груза

// Приостановка и возобновление выдачи

// Добавление в Избранное


// --------------
// Адресная книга
// --------------
// Контрагенты
router.get('/book_counteragents', dlController.bookCounteragents) // Список контрагентов из адресной книги
router.post('/book_counteragent_update', dlController.bookCounteragentUpdate) // Создание и редактирование контрагентов
router.get('/book_counteragents_search', dlController.bookCounteragentsSearch) // Поиск контрагентов
// Контактные данные
router.get('/book_contacts', dlController.bookContacts) // Получение списка контактных лиц и телефонов
router.get('/book_contact_update', dlController.bookContactUpdate) // Создание и редактирование контактных лиц
router.get('/book_phone_update', dlController.bookPhoneUpdate) // Создание и редактирование телефонов
// Адреса
router.get('/book_addresses', dlController.bookAddresses) // Список адресов
router.get('/book_address_update', dlController.bookAddressUpdate) // Создание и редактирование адреса
// Удаление объектов
router.get('/book_delete', dlController.bookDelete) // Удаление объектов из адресной книги

// -------
// Платежи
// -------
// Взаиморасчеты

// Периоды взаиморасчётов

// Получение ссылки на оплату


// ---------
// Терминалы
// ---------
// Справочник терминалов
router.get('/terminals', dlController.terminals) // Справочник терминалов
// Поиск терминалов
router.get('/request_terminals', dlController.requestTerminals) // Поиск терминалов
// Терминалы на карте
// https://dev.dellin.ru/api/terminals/map/

// --------------
// Местоположения
// --------------
// Географические справочники
router.get('/places', checkRole("ADMIN"), dlController.places) // Справочник населённых пунктов (этот роут находится в testerRouter для скачивания файла plases.csv)
router.get('/streets', checkRole("ADMIN"), dlController.streets) // Справочник улиц
router.get('/cities_cashless_only', dlController.citiesCashlessOnly) // Справочник населенных пунктов с ограничениями по оплате
// Поиск географических объектов
router.get('/references_countries', dlController.referencesCountries) // Поиск стран
router.get('/kladr', dlController.kladr) // Поиск населённых пунктов
router.get('/kladr_street', dlController.kladrStreet) // Поиск улиц
//Поиск КЛАДР
// https://dev.dellin.ru/api/places/kladr/

// -----------------
// Справочные методы
// -----------------
// Подбор даты отправки
router.get('/request_address_dates', dlController.requestAddressDates) // Даты отправки от адреса
router.get('/request_terminal_dates', dlController.requestTerminalDates) // Даты отправки от терминала
// Подбор даты доставки
router.get('/request_delivery_address_dates', dlController.requestDeliveryAddressDates) // Даты доставки (?)
// Подбор времени приезда водителя
router.get('/request_address_time_interval', dlController.requestAddressTimeInterval) // Интервалы передачи груза на адресе отправителя
router.get('/request_delivery_address_time_interval', dlController.requestDeliveryAddressTimeInterval) // Интервалы передачи груза на адресе получателя
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

// ----------
// Мои методы
// ----------
// Поиск населённых пунктов
router.get('/get_places', dlController.getPlaces) // Поиск населённых пунктов в справочнике (парсинг файла static/deliveries/dl/places.csv)
router.get('/terminals_catalog', dlController.terminalsCatalog) // Поиск терминалов в справочнике ( по заданному url )



module.exports = router