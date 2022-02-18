
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
    ** input: { sessionID }
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

    /* 
    ** Данные сессии
    **
    ** input: { sessionID }
    **
    ** return { metadata: { status, generated_at }, data: { session: { expireTime, expired } } }
    */
    async authSessionInfo(req, res, next) {
        try {
            return res.json(await Dl.authSessionInfo(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода authSessionInfo! ' + error}))
        }
    }

// -------------------
// Cписок контрагентов
// -------------------

    /* 
    ** Cписок контрагентов
    **
    ** input: { sessionID }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { counteragents: [ { 
    **          balance: { opening: { date, sum }, closing: { date, sum } }, 
    **          info: { 
    **              sharedTo: [ { phone, name, email }, ], accessLevel, requestComment, managerEmail, 
    **              managerPhone, sharedFrom: { phone, name, email }, managerName 
    **          },
    **          isCurrent, uid, juridical, inn, 
    **          document: { type, serial, number },
    **          name, cashOnDeliveryAvailable
    **      }, ] } 
    ** }
    */
    async counteragents(req, res, next) {
        try {
            return res.json(await Dl.counteragents(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода counteragents! ' + error}))
        }
    }


// -------------------- +
//
//  Выполнение расчета  |
//
// -------------------- +

// ----------------------------------------
// Калькулятор стоимости и сроков перевозки
// ----------------------------------------
    
    /* 
    ** Калькулятор стоимости и сроков перевозки
    **
    ** input: { delivery, cargo }
    **
    ** CostsCalculation = { price, contractPrice, premium, discount, premiumDetails: [], discountDetails: [] }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          derival: { 
    **              terminal, price, contractPrice, servicePrice, premiumDetails: [], terminals: [], 
    **              handling: CostsCalculation, contractPrice 
    **          },
    **          arrival: { 
    **              terminal, price, contractPrice, 
    **              premiumDetails: [ { name, value, date, announcement, public }, ], 
    **              terminals: [ { id, name, address,streetCode, price, contractPrice, default, express, isPVZ }, ], 
    **              contractPrice 
    **          },
    **          orderDates:{ 
    **              pickup, senderAddressTime, senderTerminalTime, arrivalToOspSender, derrivalFromOspSender, arrivalToOspReceiver, 
    **              arrivalToAirport, arrivalToAirportMax, giveoutFromOspReceiver, giveoutFromOspReceiverMax, derrivalFromOspReceiver,
    **              createTo, derrivalToAddress, derivalToAddressMax
    **          },
    **          intercity: CostsCalculation, small: CostsCalculation, air: CostsCalculation,
    **          express: CostsCalculation, letter: CostsCalculation, price, priceMinimal, packages: {}, 
    **          deliveryTerm, accompanyingDocuments: { send: CostsCalculation, return: CostsCalculation },
    **          insurance, insuranceComponents: { cargoInsurance, termInsurance },
    **          notify: { price, contractPrice, premium, discount, premiumDetails: [], discountDetails: [] },
    **          simpleShippingAvailable, availableDeliveryTypes: { auto, small, avia, express, letter },
    **          foundAddresses: [ { field, source, result }, ], information: []
    **      } 
    ** }
    */
    async calculator(req, res, next) { 
        try {
            return res.json(await Dl.calculator(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода calculator! ' + error}))
        }
    }

// ---------------------------
// Калькулятор услуги Доставка
// ---------------------------

    /* 
    ** Калькулятор услуги Доставка до адреса
    **
    ** input: { arrivalPoint, docSQLUid , calculateDate }
    **
    ** return { 
    **      derival: { terminal }, 
    **      arrival: { 
    **          premium, premiumDetails: [ { date, announcement, name, value, public }, ], 
    **          discountDetails: [ { name, value, date, announcement, public }, ], 
    **          price, terminal, discount
    **      },
    **      loadunload: { arrival, discount, premium, premiumDetails: [], discountDetails: [] }
    ** }
    */
    async calculatorSf(req, res, next) {
        try {
            return res.json(await Dl.calculatorSf(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода calculatorSf! ' + error}))
        }
    }

// ---------------------------------
// Ориентировочные сроки и стоимость
// ---------------------------------

    /* 
    ** Калькулятор ориентировочной стоимости и сроков заказа
    **
    ** input: { derival, arrival }
    **
    ** PeriodPrice = { period_from, period_to, price }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          terminals_standard: PeriodPrice, terminals_documents: PeriodPrice, 
    **          terminals_express: PeriodPrice, terminals_avia: PeriodPrice, 
    **          door_to_door_standard: PeriodPrice, door_to_door_documents: PeriodPrice, 
    **          door_to_door_parcel: PeriodPrice, door_to_door_express: PeriodPrice, 
    **          door_to_door_avia: PeriodPrice 
    **      }
    ** }
    */
    async microCalc(req, res, next) {
        try {
            return res.json(await Dl.microCalc(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода microCalc! ' + error}))
        }
    }
    
// ------------------- +
//
//  Оформление заявок  |
//
// ------------------- +

// ------------------------
// Перевозка сборных грузов
// ------------------------
    // Request

// ---------------------------------
// Междугородняя перевозка еврофурой
// ---------------------------------
    // RequestFtl

// -----------------------------------
// Перевозка малотоннажным транспортом
// -----------------------------------
    // RequestTs

// ---------------------------
// Почасовая аренда транспорта
// ---------------------------
    // 

// ---------------------------
// Дополнение заказа доставкой
// ---------------------------
    // 

// ------------
// Мультизаявка
// ------------
    // 

// ------------------------
// Пакетный заказ Pre-Alert
// ------------------------
    // 



    
// ----------------------- +
//
//  Информация по заказам  |
//
// ----------------------- +

// --------------
// Журнал заказов
// --------------

// -----------------------------
// Поиск по параметрам перевозки
// -----------------------------

// ------------------------
// История изменений заказа
// ------------------------

// --------------
// Печатные формы
// --------------

// ------
// Отчеты
// ------





// -------------------- +
//
//  Управление заказом  |
//
// -------------------- +

// -------------
// Повтор заказа
// -------------

// -------------------
// Доступные изменения
// -------------------

// --------------------
// Изменение получателя
// --------------------

// ---------------------
// Изменение плательщика
// ---------------------

// -------------------------------
// Изменение контактной информации
// -------------------------------

// -----------------------------------
// Изменение адреса и времени отправки
// -----------------------------------

// -----------------------------------
// Изменение адреса и времени доставки
// -----------------------------------

// ------------------------------
// Отмена заказа и доставки груза
// ------------------------------

// -----------------------------------
// Приостановка и возобновление выдачи
// -----------------------------------

// ----------------------
// Добавление в Избранное
// ----------------------




// ---------------- +
//
//  Адресная книга  |
//
// ---------------- +

// -----------
// Контрагенты
// -----------

    /* 
    ** Список контрагентов из адресной книги
    **
    ** input: { sessionID }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: [ { 
    **          id, isAnonym, form, formUID, name, phone, email, juridical, addresses, inn, 
    **          document, lastUpdate, countryUid, uid, dataForReceipt: { phoneNumber, email } 
    **      }, ] 
    ** }
    */
    async bookCounteragents(req, res, next) {
        try {
            return res.json(await Dl.bookCounteragents(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookCounteragents! ' + error}))
        }
    }
    
    /* 
    ** Создание и редактирование контрагентов
    **
    ** input: { sessionID }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { counteragentID, state, foundAddresses, [ { field, source, result }, ] }
    ** }
    */
    async bookCounteragentUpdate(req, res, next) {
        try {
            return res.json(await Dl.bookCounteragentUpdate(req.body)) // POST запрос - поэтому передаётся req.body
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookCounteragentUpdate! ' + error}))
        }
    }
    
    /* 
    ** Поиск контрагентов
    **
    ** input: { query }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: [ { inn, kpp, name, opfUid, opfName, state }, ]
    ** }
    */
    async bookCounteragentsSearch(req, res, next) {
        try {
            return res.json(await Dl.bookCounteragentsSearch(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookCounteragentsSearch! ' + error}))
        }
    }

// -----------------
// Контактные данные
// -----------------

    /* 
    ** Получение списка контактных лиц и телефонов
    **
    ** input: { sessionID, addressID }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { contacts: [ { id, contact }, ], lastUpdate, phones: [ { id, phoneNumber, phoneFormatted, ext }, ] }
    ** }
    */
    async bookContacts(req, res, next) {
        try {
            return res.json(await Dl.bookContacts(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookContacts! ' + error}))
        }
    }
    
    /* 
    ** Создание и редактирование контактных лиц
    **
    ** input: { sessionID, contact }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { state, contactID }
    ** }
    */
    async bookContactUpdate(req, res, next) {
        try {
            return res.json(await Dl.bookContactUpdate(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookContactUpdate! ' + error}))
        }
    }
    
    /* 
    ** Создание и редактирование телефонов
    **
    ** input: { sessionID, phoneNumber }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { state, phoneID }
    ** }
    */
    async bookPhoneUpdate(req, res, next) {
        try {
            return res.json(await Dl.bookPhoneUpdate(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookPhoneUpdate! ' + error}))
        }
    }

// ------
// Адреса
// ------

    /* 
    ** Список адресов
    **
    ** input: { sessionID, counteragentID }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: [ {
    **          address: {
    **              id, juridical, cityID, code, address, street, house, building, structure, flat, 
    **              contacts, phones, regionName, cityName, cityCode, terminalUID, terminalID
    **          }
    **      }, ]
    ** }
    */
    async bookAddresses(req, res, next) {
        try {
            return res.json(await Dl.bookAddresses(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookAddresses! ' + error}))
        }
    }

    /* 
    ** Создание и редактирование адреса
    **
    ** input: { sessionID, (search | terminalID | (street & house)), (counteragentID | addressID) }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { state, addressID, foundAddresses: [ { source, result }, ] }
    ** }
    */
    async bookAddressUpdate(req, res, next) {
        try {
            return res.json(await Dl.bookAddressUpdate(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookAddressUpdate! ' + error}))
        }
    }

// -----------------
// Удаление объектов
// -----------------

    /* 
    ** Удаление объектов из адресной книги
    **
    ** input: { sessionID, (counteragentIDs &| addressIDs &| phoneIDs &| contactIDs) }
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          deleted: { counteragentIDs: [], addressIDs: [], phoneIDs: [], contactIDs: [] },
    **          notDeleted: { counteragentIDs: [], addressIDs: [], phoneIDs: [], contactIDs: [] },
    **      }
    ** }
    */
    async bookDelete(req, res, next) {
        try {
            return res.json(await Dl.bookDelete(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода bookDelete! ' + error}))
        }
    }


// --------- +
//
//  Платежи  |
//
// --------- +

// -------------
// Взаиморасчеты
// -------------


// ----------------------
// Периоды взаиморасчётов
// ----------------------


// --------------------------
// Получение ссылки на оплату
// --------------------------





// ----------- +
//
//  Терминалы  |
//
// ----------- +

// ---------------------
// Справочник терминалов
// ---------------------

    /* 
    ** Справочник терминалов
    **
    ** return { hash, url }
    */
    async terminals(req, res, next) {
        try {
            return res.json(await Dl.terminals())
        }catch(error) {
            return next(res.json({error:'Ошибка метода terminals! ' + error}))
        }
    }
    
// ----------------
// Поиск терминалов
// ----------------

    /* 
    ** Поиск терминалов
    **
    ** return { hash, url }
    */
    async requestTerminals(req, res, next) { 
        try {
            return res.json(await Dl.requestTerminals(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestTerminals! ' + error}))
        }
    }

// ------------------
// Терминалы на карте
// ------------------
    
    // https://dev.dellin.ru/api/terminals/map/


// ---------------- +
//
//  Местоположения  |
//
// ---------------- +

// --------------------------
// Географические справочники
// --------------------------

    /* 
    ** Справочник населённых пунктов
    **
    ** return { hash, url }
    */
    async places(req, res, next) {
        try {
            return res.json(await Dl.places())
        }catch(error) {
            return next(res.json({error:'Ошибка метода places! ' + error}))
        }
    }
    
    /* 
    ** Справочник улиц
    **
    ** return { hash, url }
    */
    async streets(req, res, next) {
        try {
            return res.json(await Dl.streets())
        }catch(error) {
            return next(res.json({error:'Ошибка метода streets! ' + error}))
        }
    }
    
    /* 
    ** Справочник населенных пунктов с ограничениями по оплате
    **
    ** return { hash, url }
    */
    async citiesCashlessOnly(req, res, next) {
        try {
            return res.json(await Dl.citiesCashlessOnly())
        }catch(error) {
            return next(res.json({error:'Ошибка метода citiesCashlessOnly! ' + error}))
        }
    }

// -----------------------------
// Поиск географических объектов
// -----------------------------

    /* 
    ** Поиск стран
    **
    ** input: { filter* }
    **
    ** return { metadata: { status, generated_at }, data: [ { countryUID, country }, ]}
    */
    async referencesCountries(req, res, next) {
        try {
            return res.json(await Dl.referencesCountries(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода referencesCountries! ' + error}))
        }
    }

    /* 
    ** Поиск населённых пунктов
    **
    ** input: { q | cityID | code }
    **
    ** return { 
    **      cities: [ { 
    **          code, aString, isTerminal, zoneID, region_name, searchString, 
    **          regionID, cityID, cityUID, postalCode, inPrice, street 
    **      }, ] 
    ** }
    */
    async kladr(req, res, next) {
        try {
            return res.json(await Dl.kladr(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода kladr! ' + error}))
        }
    }

    /* 
    ** Поиск улиц
    **
    ** input: { (cityID | code) & limit } if (cityID) {...input, street}
    **
    ** return { streets: [ { code, cityID, searchString, aString }, ] }
    */
    async kladrStreet(req, res, next) {
        try {
            return res.json(await Dl.kladrStreet(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода kladrStreet! ' + error}))
        }
    }

// -----------
// Поиск КЛАДР
// -----------

    // https://dev.dellin.ru/api/places/kladr/


// ------------------- +
//
//  Справочные методы  |
//
// ------------------- +

// --------------------
// Подбор даты отправки
// --------------------

    /* 
    ** Даты отправки от адреса
    **
    ** input: { (delivery | search), cargo } (в моём случае cargo не обязателен)
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          dates: [], foundAddresses: [ { field, source, result }, ]
    **      } 
    ** }
    */
    async requestAddressDates(req, res, next) { 
        try {
            return res.json(await Dl.requestAddressDates(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestAddressDates! ' + error}))
        }
    }

    /* 
    ** Даты отправки от терминала
    **
    ** input: { (terminalID | delivery) } ( в оригинальном API вместо terminalID - delivery: { derival: { terminalID } })
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { 
    **          dates: [], foundAddresses: [ { field, source, result }, ]
    **      } 
    ** }
    */
    async requestTerminalDates(req, res, next) { 
        try {
            return res.json(await Dl.requestTerminalDates(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestTerminalDates! ' + error}))
        }
    }

// --------------------
// Подбор даты доставки
// --------------------

    /* 
    ** Даты доставки
    **
    ** input: { sessionID, docID, (delivery | search) } ( в оригинальном API вместо search - delivery: { arrival: { address: { search } } })
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      dates: [], foundAddresses: [ { field, source, result }, ]
    ** }
    */
    async requestDeliveryAddressDates(req, res, next) { 
        try {
            return res.json(await Dl.requestDeliveryAddressDates(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestDeliveryAddressDates! ' + error}))
        }
    }




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
    async requestAddressTimeInterval(req, res, next) { 
        try {
            return res.json(await Dl.requestAddressTimeInterval(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestAddressTimeInterval! ' + error}))
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
    async requestDeliveryAddressTimeInterval(req, res, next) { 
        try {
            return res.json(await Dl.requestDeliveryAddressTimeInterval(req.query)) 
        }catch(error) {
            return next(res.json({error:'Ошибка метода requestDeliveryAddressTimeInterval! ' + error}))
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
            return res.json(await Dl.referencesOpfList(req.query)) 
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




// ------------ +
//
//  Мои методы  |
//
// ------------ +
    
// ------------------------
// Поиск населённых пунктов
// ------------------------

    /* 
    ** Поиск населённых пунктов в справочнике (парсинг файла static/deliveries/dl/places.csv)
    **
    ** input
    **
    ** return 
    */
    async getPlaces(req, res, next) {
        try {
            return res.json(await Dl.getPlaces(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода getPlaces! ' + error}))
        }
    }

// ----------------
// Поиск терминалов
// ----------------
    
    /* 
    **  Поиск терминалов в справочнике ( по заданному url )
    **
    ** return object
    */
    async terminalsCatalog(req, res, next) {
        try {
            return res.json(await Dl.terminalsCatalog(req.query))
        }catch(error) {
            return next(res.json({error:'Ошибка метода terminalsCatalog! ' + error}))
        }
    }


}

module.exports = new DlController()