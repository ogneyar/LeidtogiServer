const axios  = require("axios")

// ------------
//  Авторизация
// ------------
// Авторизация пользователя
const AuthLogin = require('./auth/Login')
const AuthLogout = require('./auth/Logout')
const AuthSessionInfo = require('./auth/SessionInfo')
// Cписок контрагентов
const Counteragents = require('./Counteragents')

// ------------------
// Выполнение расчета
// ------------------
// Калькулятор стоимости и сроков перевозки
const Calculator = require('./Calculator')
// Калькулятор услуги Доставка
const CalculatorSf = require('./public/CalculatorSf')
// Ориентировочные сроки и стоимость
const MicroCalc = require('./MicroCalc')

// -----------------
// Оформление заявок
// -----------------
//

// ---------------------
// Информация по заказам
// ---------------------
//

// ------------------
// Управление заказом
// ------------------
//

// --------------
// Адресная книга
// --------------
// Контрагенты
const BookCounteragents = require("./book/Counteragents")
const BookCounteragentUpdate = require("./book/CounteragentUpdate")
const BookCounteragentsSearch = require("./book/CounteragentsSearch")
// Контактные данные
const BookContacts = require("./book/Contacts")
const BookContactUpdate = require("./book/ContactUpdate")
const BookPhoneUpdate = require("./book/PhoneUpdate")
// Адреса
const BookAddresses = require("./book/Addresses")
const BookAddressUpdate = require("./book/AddressUpdate")
// Удаление объектов
const BookDelete = require("./book/Delete")

// -------
// Платежи
// -------
//

// ---------
// Терминалы
// ---------
// Справочник терминалов
const Terminals = require("./public/Terminals")
// Поиск терминалов
const RequestTerminals = require("./public/RequestTerminals")

// --------------
// Местоположения
// --------------
// Географические справочники
const Places = require("./public/Places")
const Streets = require("./public/Streets")
const CitiesCashlessOnly = require("./public/CitiesCashlessOnly")
// Поиск географических объектов
const ReferencesCountries = require("./references/Countries")
const Kladr = require("./public/Kladr")
const KladrStreet = require("./public/KladrStreet")




// -----------------
// Справочные методы
// -----------------
// Подбор даты отправки
const RequestAddressDates = require("./request/AddressDates")
const RequestTerminalDates = require("./request/TerminalDates")
// Подбор даты доставки
const RequestDeliveryAddressDates = require("./request_delivery/AddressDates")
// Подбор времени приезда водителя
const RequestAddressTimeInterval = require("./request/AddressTimeInterval")
const RequestDeliveryAddressTimeInterval = require("./request_delivery/AddressTimeInterval")
// Проверка ограничений
const RequestConditions = require("./request/RequestConditions")
// Доступные упаковки
const PackagesAvailable = require("./public/PackagesAvailable")
// Поиск ОПФ
const ReferencesOpfList = require("./references/OpfList")
// Поиск характера груза
const FreightTypesSearch = require("./public/FreightTypesSearch")
const FreightTypesFtl = require("./ftl/FreightTypes")
// Справочники
const RequestDeliveryTypes = require("./public/RequestDeliveryTypes")
const RequestServices = require("./public/RequestServices")
const FreightTypes = require("./public/FreightTypes")
const LoadParams = require("./public/LoadParams")
const PayerTypes = require("./public/PayerTypes")
const PaymentTypes = require("./public/PaymentTypes")
const DocumentsForReceive = require("./public/DocumentsForReceive")
const ReportParams = require("./public/ReportParams")
const ReferencesLoadTypes = require("./references/LoadTypes")
const ReferencesServises = require("./references/Servises")
const ReferencesPackages = require("./references/Packages")
const ReferencesStatuses = require("./references/Statuses")
// Прайс-лист
const Pricelist = require("./public/Pricelist")
const Cities = require("./public/Cities")

const parseCsv = require("../../csv/parseCsv")


module.exports = class Dl {
    
    static url = process.env.DL_URL
    
    constructor() {
        // console.log("DL START")
    }

    static async curl(data) {
        // console.log("DL CURL RUN")

        let response
        let headers = {'content-type': 'application/json;charset=utf-8'}
        let options = { 
            url: this.url + data.method,
            method: "post", 
            headers,
            data: {...data, method: undefined}
        }
        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("DL CURL ERROR: ",error.response.data.errors)
                    if (error.response !== undefined && error.response.data !== undefined && error.response.data.errors !== undefined) {
                        response = { error: error.response.data.errors[0].title }
                    }else response = { error }
                })
        }catch(e) {  
            // console.log("DL CURL THROW: ",e)
            return { error:e }
        }
        // console.log("DL CURL RESPONSE: ",response)
        return response
    }

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
    static async authLogin() {
        // console.log("DL authLogin RUN");
       
        let response = await this.curl(
            new AuthLogin()
        )

        return response
    }

    /* 
    ** Удаление сессии авторизации
    **
    ** input: { sessionID }
    **
    ** return { metadata: { status, generated_at }, data: { state } }
    */
    static async authLogout(params) {
        // console.log("DL authLogout RUN");
       
        let response = await this.curl(
            new AuthLogout(params)
        )

        return response
    }

    /* 
    ** Данные сессии
    **
    ** input: { sessionID }
    **
    ** return { metadata: { status, generated_at }, data: { session: { expireTime, expired } } }
    */
    static async authSessionInfo(params) {
        // console.log("DL authSessionInfo RUN");
       
        let response = await this.curl(
            new AuthSessionInfo(params)
        )

        return response
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
    static async counteragents(params) {
        // console.log("DL counteragents RUN");
       
        let response = await this.curl(
            new Counteragents(params)
        )

        return response
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
    static async calculator(parameters) { 
        // console.log("DL calculator RUN");
        
        // *** EXAMPLE *** - input data
        // parameters = {
        //     delivery: {
        //         derival: {
        //             address: { street: "5000003200000000000000000" },
        //             produceDate: "2022-02-09"
        //         },
        //         arrival: { 
        //              variant: "terminal", 
        //              address: { street: "6100500010300010000000000" } 
        //         }
        //     },
        //     cargo: {
        //         quantity: 1,
        //         length: 0.5,
        //         width: 0.3,
        //         height: 0.4,
        //         totalVolume: 0.005,
        //         totalWeight: 1
        //     }
        // }

        let response = await this.curl(
            new Calculator(parameters)
        )

        return response
    }

// -------------------------------
// Калькулятор услуги Доставка
// -------------------------------

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
    static async calculatorSf(parameters) { 
        // console.log("DL calculatorSf RUN");
        
        let response = await this.curl(
            new CalculatorSf(parameters)
        )
        
        return response 
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
    static async microCalc(parameters) {
        // console.log("DL microCalc RUN");

        let response = await this.curl(
            new MicroCalc(parameters)
        )

        return response
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
    static async bookCounteragents(parameters) {
        // console.log("DL bookCounteragents RUN");

        let response = await this.curl(
            new BookCounteragents(parameters)
        )
        
        return response
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
    static async bookCounteragentUpdate(parameters) {
        // console.log("DL bookCounteragentUpdate RUN");

        let response = await this.curl(
            new BookCounteragentUpdate(parameters)
        )
        
        return response
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
    static async bookCounteragentsSearch(parameters) {
        // console.log("DL bookCounteragentsSearch RUN");

        let response = await this.curl(
            new BookCounteragentsSearch(parameters)
        )
        
        return response
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
    static async bookContacts(parameters) {
        // console.log("DL bookContacts RUN");

        let response = await this.curl(
            new BookContacts(parameters)
        )
        
        return response
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
    static async bookContactUpdate(parameters) {
        // console.log("DL bookContactUpdate RUN");

        let response = await this.curl(
            new BookContactUpdate(parameters)
        )
        
        return response
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
    static async bookPhoneUpdate(parameters) {
        // console.log("DL bookPhoneUpdate RUN");

        let response = await this.curl(
            new BookPhoneUpdate(parameters)
        )
        
        return response
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
    static async bookAddresses(parameters) {
        // console.log("DL bookAddresses RUN");

        let response = await this.curl(
            new BookAddresses(parameters)
        )
        
        return response
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
    static async bookAddressUpdate(parameters) {
        // console.log("DL bookAddressUpdate RUN");

        let response = await this.curl(
            new BookAddressUpdate(parameters)
        )
        
        return response
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
    static async bookDelete(parameters) {
        // console.log("DL bookDelete RUN");

        let response = await this.curl(
            new BookDelete(parameters)
        )
        
        return response
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
    static async terminals() {
        // console.log("DL terminals RUN");

        let response = await this.curl(
            new Terminals()
        )
        
        return response
    }
    
// ----------------
// Поиск терминалов
// ----------------

    /* 
    ** Поиск терминалов
    **
    ** return { hash, url }
    */
    static async requestTerminals(parameters) { 
        // console.log("DL requestTerminals RUN");

        let response = await this.curl(
            new RequestTerminals(parameters)
        )

        return response
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
    static async places() { 
        // console.log("DL places RUN");
        
        let response = await this.curl(
            new Places()
        )

        return response
    }
   
    /* 
    ** Справочник улиц
    **
    ** return { hash, url }
    */
    static async streets() { 
        // console.log("DL streets RUN");
        
        let response = await this.curl(
            new Streets()
        )

        return response
    }
    
    /* 
    ** Справочник населенных пунктов с ограничениями по оплате
    **
    ** return { hash, url }
    */
    static async citiesCashlessOnly() { 
        // console.log("DL citiesCashlessOnly RUN");
        
        let response = await this.curl(
            new CitiesCashlessOnly()
        )

        return response
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
    static async referencesCountries(parameters) { 
        // console.log("DL referencesCountries RUN");
        
        let response = await this.curl(
            new ReferencesCountries(parameters)
        )

        return response
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
    static async kladr(parameters) {
        // console.log("DL kladr RUN");

        let response = await this.curl(
            new Kladr(parameters)
        )

        return response
    }
    
    /* 
    ** Поиск улиц
    **
    ** input: { (cityID | code) & limit } if (cityID) {...input, street}
    **
    ** return { streets: [ { code, cityID, searchString, aString }, ] }
    */
    static async kladrStreet(parameters) {
        // console.log("DL kladrStreet RUN");

        let response = await this.curl(
            new KladrStreet(parameters)
        )

        return response
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
    static async requestAddressDates(parameters) { 
        // console.log("DL requestAddressDates RUN");
        
        let response = await this.curl(
            new RequestAddressDates(parameters)
        )
        
        return response 
    }

    /* 
    ** Даты отправки от терминала
    **
    ** input: { (terminalID | delivery) } ( в оригинальном API вместо terminalID - delivery: { derival: { terminalID } })
    **
    ** return { 
    **      metadata: { status, generated_at }, 
    **      data: { dates: [] } 
    ** }
    */
    static async requestTerminalDates(parameters) { 
        // console.log("DL requestTerminalDates RUN");
        
        let response = await this.curl(
            new RequestTerminalDates(parameters)
        )
        
        return response 
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
    static async requestDeliveryAddressDates(parameters) { 
        // console.log("DL requestDeliveryAddressDates RUN");
        
        let response = await this.curl(
            new RequestDeliveryAddressDates(parameters)
        )
        
        return response 
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
    static async requestAddressTimeInterval(parameters) { 
        // console.log("DL requestAddressTimeInterval RUN");
        
        let response = await this.curl(
            new RequestAddressTimeInterval(parameters)
        )
        
        return response 
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
    static async requestDeliveryAddressTimeInterval(parameters) { 
        // console.log("DL requestDeliveryAddressTimeInterval RUN");
        
        let response = await this.curl(
            new RequestDeliveryAddressTimeInterval(parameters)
        )
        
        return response 
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
    static async requestConditions(parameters) { 
        // console.log("DL requestConditions RUN");
        
        let response = await this.curl(
            new RequestConditions(parameters)
        )
        
        return response 
    }


// ------------------
// Доступные упаковки
// ------------------

    /* 
    ** Список доступных упаковок при заданных параметрах
    **
    ** return { packages: [ { uid, incompatible_uids: [] }, ] }
    */
    static async packagesAvailable(parameters) { 
        // console.log("DL packagesAvailable RUN");
        
        let response = await this.curl(
            new PackagesAvailable(parameters)
        )
        
        return response 
    }

// ---------
// Поиск ОПФ
// ---------

    /* 
    ** Поиск ОПФ
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, juridical, title, innLength, countryUID }, ]}
    */
    static async referencesOpfList(parameters) { 
        // console.log("DL referencesOpfList RUN");
        
        let response = await this.curl(
            new ReferencesOpfList(parameters)
        )
        
        if (parameters.search !== undefined) {
            let RussiaUID = "0x8f51001438c4d49511dbd774581edb7a"
            response = {...response, data: response.data.filter(i => i.title.includes(parameters.search) && i.countryUID === RussiaUID)}
        }
        
        return response 
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
    static async freightTypesSearch(parameters) { 
        // console.log("DL freightTypesSearch RUN");
        
        let response = await this.curl(
            new FreightTypesSearch(parameters)
        )
        
        return response 
    }

    /* 
    ** Характер груза: поиск по строке (перевозка еврофурой)
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name }, ] }
    */
    static async freightTypesFtl(parameters) { 
        // console.log("DL freightTypesFtl RUN");
        
        let response = await this.curl(
            new FreightTypesFtl(parameters)
        )
        
        return response 
    }

// -----------
// Справочники
// -----------

    /* 
    ** Справочник видов доставки
    **
    ** return { hash, url }
    */
    static async requestDeliveryTypes(parameters) { 
        // console.log("DL requestDeliveryTypes RUN");
        
        let response = await this.curl(
            new RequestDeliveryTypes(parameters)
        )
        
        return response 
    }

    /* 
    ** Справочник дополнительных услуг
    **
    ** return { hash, url }
    */
    static async requestServices(parameters) { 
        // console.log("DL requestServices RUN");
        
        let response = await this.curl(
            new RequestServices(parameters)
        )
        
        return response 
    }

    /* 
    ** Характер груза
    **
    ** return { hash, url }
    */
    static async freightTypes(parameters) { 
        // console.log("DL freightTypes RUN");
        
        let response = await this.curl(
            new FreightTypes(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Справочник услуг ПРР
    **
    ** return { hash, url }
    */
    static async loadParams(parameters) { 
        // console.log("DL loadParams RUN");
        
        let response = await this.curl(
            new LoadParams(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Справочник видов плательщиков
    **
    ** return { hash, url }
    */
    static async payerTypes(parameters) { 
        // console.log("DL payerTypes RUN");
        
        let response = await this.curl(
            new PayerTypes(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Справочник видов платежа
    **
    ** return { hash, url }
    */
    static async paymentTypes(parameters) { 
        // console.log("DL paymentTypes RUN");
        
        let response = await this.curl(
            new PaymentTypes(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Документы для получения груза
    **
    ** return { hash, url }
    */
    static async documentsForReceive(parameters) { 
        // console.log("DL documentsForReceive RUN");
        
        let response = await this.curl(
            new DocumentsForReceive(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Справочник параметров для статистического отчета
    **
    ** return { hash, url }
    */
    static async reportParams(parameters) { 
        // console.log("DL freightTypes RUN");
        
        let response = await this.curl(
            new ReportParams(parameters)
        )
        
        return response 
    }

    /* 
    ** Справочник видов загрузки
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, title, incompatible }, ]}
    */
    static async referencesLoadTypes() { 
        // console.log("DL referencesLoadTypes RUN");
        
        let response = await this.curl(
            new ReferencesLoadTypes()
        )
        
        return response
    }
    
    /* 
    ** Справочник специальных требований к транспорту
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, name, title, incompatible }, ]}
    */
    static async referencesServises() { 
        // console.log("DL referencesServises RUN");
        
        let response = await this.curl(
            new ReferencesServises()
        )
        
        return response
    }
    
    /* 
    ** Справочник упаковок
    **
    ** return { metadata: { status, generated_at }, data: [ { uid, title, name, countable, incompatible }, ]}
    */
    static async referencesPackages(parameters) { 
        // console.log("DL referencesPackages RUN");
        
        let response = await this.curl(
            new ReferencesPackages(parameters)
        )
        
        return response 
    }
    
    /* 
    ** Справочник статусов заказа груза
    **
    ** return { metadata: { status, generated_at }, data: [ { status, title }, ]}
    */
    static async referencesStatuses(parameters) { 
        // console.log("DL referencesStatuses RUN");
        
        let response = await this.curl(
            new ReferencesStatuses(parameters)
        )
        
        return response 
    }

// ----------
// Прайс-лист
// ----------
    
    /* 
    ** Прайс-лист
    **
    ** input: city_from_uid and/or city_to_uid 
    **
    ** return { data: { header, table: { caption, header: [ { name, text, ?value }, ], body: [] } } }
    */
    static async pricelist(parameters) { 
        // console.log("DL pricelist RUN");
        
        let response = await this.curl(
            new Pricelist(parameters)
        )
        
        return response 
    }

    /* 
    ** Справочник городов из прайс-листа
    **
    ** return { hash, url }
    */
    static async cities(parameters) { 
        // console.log("DL cities RUN");
        
        let response = await this.curl(
            new Cities(parameters)
        )
        
        return response 
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
    static async getPlaces(query) {

        let { data } = await axios.get(process.env.URL + "/deliveries/dl/places.csv")

        let response = parseCsv(data, `"cityID"`, `,`)
        
        return response.message.filter(i => {
            if (query.search && query.regname) {
                if (i.searchString.includes(query.search) && i.regname.includes(query.regname)) return true
            }else if (query.search) {
                if (i.searchString.includes(query.search)) return true
            }else if (query.regname) {
                if (i.regname.includes(query.regname)) return true
            }
        })
    }
    

// ----------------
// Поиск терминалов
// ----------------
    
    /* 
    **  Поиск терминалов в справочнике ( по заданному url )
    **
    ** return { hash, url }
    */
    static async terminalsCatalog(parameters) { 
        // console.log("DL terminalsCatalog RUN");

        if (!parameters.url) return { error: "Не передан url." }

        let response = await this.curlGet(parameters.url)

        if (response.city !== undefined) return response.city
        
        return response
    }
    

// ----------------
// GET запрос к url
// ----------------
    
    /* 
    **  GET запрос к заданному url
    **
    ** input: { url }
    **
    ** return object
    */
    static async curlGet(url) { 
        // console.log("DL curlGet RUN");

        let response
        let headers = {'content-type': 'application/json;charset=utf-8'}
        let options = { url, method: "get", headers }
        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("DL curlGet ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("DL curlGet THROW: ",e);
            return { error:e }
        }
        
        return response
    }





}