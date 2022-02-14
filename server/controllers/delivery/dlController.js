
const Dl = require("../../service/delivery/dl/Dl")


class DlController {
    
// ------------- +
//
//  Авторизация  |
//
// ------------- +

// ------------------------
// Авторизация пользователя
// ------------------------

    /* 
    ** Авторизация пользователя
    **
    ** return { metadata: { status, generated_at }, data: { sessionID } }
    */
    async authLogin(req, res, next) {
        try {
            return res.json(await Dl.authLogin())
        }catch(error) {
            return next(res.json({error:'Ошибка метода authLogin! ' + error}))
        }
    }

    /* 
    ** Удаление сессии авторизации
    **
    ** input: sessionID
    **
    ** return { metadata: { status, generated_at }, data: { state } }
    */
    async authLogout(req, res, next) {
        try {
            return res.json(await Dl.authLogout(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода authLogout! ' + error}))
        }
    }



    

    // Калькулятор стоимости и сроков заказа
    async calculator(req, res, next) { 
        try {
            return res.json(await Dl.calculator(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода calculator! ' + error}))
        }
    }

    async microCalc(req, res, next) { // Калькулятор ориентировочной стоимости и сроков заказа
        try {
            return res.json(await Dl.microCalc(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода microCalc! ' + error}))
        }
    }

    async kladr(req, res, next) { // Поиск населённых пунктов
        try {
            return res.json(await Dl.kladr(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода kladr! ' + error}))
        }
    }

    async terminals(req, res, next) { // Справочник терминалов
        try {
            return res.json(await Dl.terminals())
        }catch(error) {
            return next(res.json({error:'Ошибка метода terminals! ' + error}))
        }
    }

    async terminalsCatalog(req, res, next) { // Справочник терминалов
        try {
            return res.json(await Dl.terminalsCatalog(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода terminalsCatalog! ' + error}))
        }
    }

    // Поиск терминалов
    async searchTerminals(req, res, next) { 
        try {
            return res.json(await Dl.searchTerminals(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода searchTerminals! ' + error}))
        }
    }


    // этот метод находится и используется в testerController
    async places(req, res, next) { // Справочник населённых пунктов
        try {
            return res.json(await Dl.places())
        }catch(error) {
            return next(res.json({error:'Ошибка метода places! ' + error}))
        }
    }
    // парсинг файла static/deliveries/dl/places.csv
    async getPlaces(req, res, next) { // Справочник населённых пунктов
        try {
            return res.json(await Dl.getPlaces(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода getPlaces! ' + error}))
        }
    }

    // Справочник улиц
    async streets(req, res, next) {
        try {
            return res.json(await Dl.streets())
        }catch(error) {
            return next(res.json({error:'Ошибка метода streets! ' + error}))
        }
    }


// ------------------- +
//
//  Справочные методы  |
//
// ------------------- +


// --------------------
// Подбор даты отправки
// --------------------



// --------------------
// Подбор даты доставки
// --------------------







// -------------------------------
// Подбор времени приезда водителя
// -------------------------------

    /* 
    ** Интервалы передачи груза на адресе отправителя
    **
    ** input: produceDate, search
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          interval_from, interval_to, default_min_same_day_period, min_same_day_period, 
    **          min_period, same_day, foundAddresses: [ { source, result, field }, ] 
    **      } 
    ** }
    */
    async requestTimeInterval(req, res, next) { 
        try {
            return res.json(await Dl.requestTimeInterval(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestTimeInterval! ' + error}))
        }
    }

    /* 
    ** Интервалы передачи груза на адресе получателя
    **
    ** input:   sessionID // 84E3E232-22DD-4C68-B652-D0E6CCDC6529
    **          docID // номер заказа, накладной или заявки
    **          produceDate, search
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          interval_from, interval_to, default_min_same_day_period, min_same_day_period, 
    **          min_period, same_day, foundAddresses: [ { source, result, field }, ] 
    **      } 
    ** }
    */
    async requestDeliveryTimeInterval(req, res, next) { 
        try {
            return res.json(await Dl.requestDeliveryTimeInterval(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestDeliveryTimeInterval! ' + error}))
        }
    }

// --------------------
// Проверка ограничений
// --------------------
    
    /* 
    ** Ограничения по параметрам заказа
    **
    ** return { 
    **      packages: [ { uid, incompatible_uids: [] }, ], 
    **      loadings: { sender: [], receiver: [] }, 
    **      day_to_day: { same_day_pickup_allowed, same_day_pickup_ends_at, minimal_same_day_pickup_period, minimal_pickup_period, terminal_id }, 
    **      insurance: { term_insurance_available } 
    ** }
    */
    async requestConditions(req, res, next) { 
        try {
            return res.json(await Dl.requestConditions(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestConditions! ' + error}))
        }
    }

// ------------------
// Доступные упаковки
// ------------------
    
    /* 
    ** Список доступных упаковок при заданных параметрах
    **
    ** return { packages: [ { uid, incompatible_uids: [] }, ] }
    */
    async packagesAvailable(req, res, next) { 
        try {
            return res.json(await Dl.packagesAvailable(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода packagesAvailable! ' + error}))
        }
    }

// ---------
// Поиск ОПФ
// ---------

    /* 
    ** Поиск ОПФ
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, juridical, title, innLength, countryUID }, ]}
    */
    async referencesOpfList(req, res, next) { 
        try {
            return res.json(await Dl.referencesOpfList()) 
            // 
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesOpfList! ' + error}))
        }
    }

// ---------------------
// Поиск характера груза
// ---------------------

    /* 
    ** Характер груза: поиск по строке (перевозка сборных грузов)
    **
    ** input: name
    **
    ** return { 
    **      metadata: { current_page, next_page, prev_page, total_pages }, 
    **      freight_types: [ { sqlUID, value, order, can_transport, comment, html_comment, packages: [ { uid }, ] }, ] 
    ** }
    */
    async freightTypesSearch(req, res, next) {
        try {
            return res.json(await Dl.freightTypesSearch(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода freightTypesSearch! ' + error}))
        }
    }

    /* 
    ** Характер груза: поиск по строке (перевозка еврофурой)
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name }, ] }
    */
    async freightTypesFtl(req, res, next) {
        try {
            return res.json(await Dl.freightTypesFtl(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода freightTypesFtl! ' + error}))
        }
    }



// -----------
// Справочники
// -----------

    /* 
    ** Справочник видов доставки
    **
    ** return { hash, url }
    */
    async requestDeliveryTypes(req, res, next) {
        try {
            return res.json(await Dl.requestDeliveryTypes())
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestDeliveryTypes! ' + error}))
        }
    }

    /* 
    ** Справочник дополнительных услуг
    **
    ** return { hash, url }
    */
    async requestServices(req, res, next) {
        try {
            return res.json(await Dl.requestServices())
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestServices! ' + error}))
        }
    }

    /* 
    ** Характер груза
    **
    ** return { hash, url }
    */
    async freightTypes(req, res, next) {
        try {
            return res.json(await Dl.freightTypes())
        }catch(error) {
            return next(res.json({error:'Ошибка метода freightTypes! ' + error}))
        }
    }

    /* 
    ** Справочник услуг ПРР
    **
    ** return { hash, url }
    */
    async loadParams(req, res, next) {
        try {
            return res.json(await Dl.loadParams())
        }catch(error) {
            return next(res.json({error:'Ошибка метода loadParams! ' + error}))
        }
    }

    /* 
    ** Справочник видов плательщиков
    **
    ** return { hash, url }
    */
    async payerTypes(req, res, next) {
        try {
            return res.json(await Dl.payerTypes())
        }catch(error) {
            return next(res.json({error:'Ошибка метода payerTypes! ' + error}))
        }
    }

    /* 
    ** Справочник видов платежа
    **
    ** return { hash, url }
    */
    async paymentTypes(req, res, next) {
        try {
            return res.json(await Dl.paymentTypes())
        }catch(error) {
            return next(res.json({error:'Ошибка метода paymentTypes! ' + error}))
        }
    }

    /* 
    ** Документы для получения груза
    **
    ** return { hash, url }
    */
    async documentsForReceive(req, res, next) {
        try {
            return res.json(await Dl.documentsForReceive())
        }catch(error) {
            return next(res.json({error:'Ошибка метода documentsForReceive! ' + error}))
        }
    }

    /* 
    ** Справочник параметров для статистического отчета
    **
    ** return { hash, url }
    */
    async reportParams(req, res, next) {
        try {
            return res.json(await Dl.reportParams())
        }catch(error) {
            return next(res.json({error:'Ошибка метода reportParams! ' + error}))
        }
    }

    /* 
    ** Справочник видов загрузки
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, title, incompatible }, ]}
    */
    async referencesLoadTypes(req, res, next) {
        try {
            return res.json(await Dl.referencesLoadTypes())
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesLoadTypes! ' + error}))
        }
    }

    /* 
    ** Справочник специальных требований к транспорту
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, title, incompatible }, ]}
    */
    async referencesServises(req, res, next) {
        try {
            return res.json(await Dl.referencesServises())
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesServises! ' + error}))
        }
    }

    /* 
    ** Справочник упаковок
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, title, name, countable, incompatible }, ]}
    */
    async referencesPackages(req, res, next) {
        try {
            return res.json(await Dl.referencesPackages())
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesPackages! ' + error}))
        }
    }
    
    /* 
    ** Справочник статусов заказа груза
    **
    ** return { metadata: { status, generated_at }, data: [ { status, title }, ]}
    */
    async referencesStatuses(req, res, next) {
        try {
            return res.json(await Dl.referencesStatuses())
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesStatuses! ' + error}))
        }
    }

// ----------
// Прайс-лист
// ----------

    /* 
    ** Прайс-лист
    **
    ** return { data: { header, table: { caption, header: [ { name, text, ?value }, ], body: [] } } }
    */
    async pricelist(req, res, next) {
        try {
            // в req.query необходим city_from_uid и/или city_to_uid из метода ниже (cities)
            return res.json(await Dl.pricelist(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода pricelist! ' + error}))
        }
    }
    
    /* 
    ** Справочник городов из прайс-листа
    **
    ** return { hash, url }
    */
    async cities(req, res, next) {
        try {
            return res.json(await Dl.cities())
        }catch(error) {
            return next(res.json({error:'Ошибка метода cities! ' + error}))
        }
    }

}

module.exports = new DlController()