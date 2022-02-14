const axios  = require("axios")

// ------------
//  Авторизация
// ------------
// Авторизация пользователя
const AuthLogin = require('./AuthLogin')
const AuthLogout = require('./AuthLogout')

const Calculator = require('./Calculator')
const Micro_calc = require('./Micro_calc')
const Kladr = require("./Kladr")
const Terminals = require("./Terminals")
const SearchTerminals = require("./SearchTerminals")
const Places = require("./Places")
const Streets = require("./Streets")
// -----------------
// Справочные методы
// -----------------
// Подбор даты отправки

// Подбор даты доставки

// Подбор времени приезда водителя
const RequestTimeInterval = require("./RequestTimeInterval")
const RequestDeliveryTimeInterval = require("./RequestDeliveryTimeInterval")
// Проверка ограничений
const RequestConditions = require("./RequestConditions")
// Доступные упаковки
const PackagesAvailable = require("./PackagesAvailable")
// Поиск ОПФ
const ReferencesOpfList = require("./ReferencesOpfList")
// Поиск характера груза
const FreightTypesSearch = require("./FreightTypesSearch")
const FreightTypesFtl = require("./FreightTypesFtl")
// Справочники
const RequestDeliveryTypes = require("./RequestDeliveryTypes")
const RequestServices = require("./RequestServices")
const FreightTypes = require("./FreightTypes")
const LoadParams = require("./LoadParams")
const PayerTypes = require("./PayerTypes")
const PaymentTypes = require("./PaymentTypes")
const DocumentsForReceive = require("./DocumentsForReceive")
const ReportParams = require("./ReportParams")
const ReferencesLoadTypes = require("./ReferencesLoadTypes")
const ReferencesServises = require("./ReferencesServises")
const ReferencesPackages = require("./ReferencesPackages")
const ReferencesStatuses = require("./ReferencesStatuses")
// Прайс-лист
const Pricelist = require("./Pricelist")
const Cities = require("./Cities")

const parseCsv = require("../../csv/parseCsv")


module.exports = class Dl {
    
    static url = process.env.DL_URL
    
    constructor() {
        // console.log("DL START");
    }

    static async curl(data) {
        // console.log("DL CURL RUN");

        let response

        let headers = {'content-type': 'application/json;charset=utf-8'}

        let options = { 
            url: this.url + data.method,
            method: "post", 
            headers,
            data
        }

        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("DL CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("DL CURL THROW: ",e);
            return { error:e }
        }
        // console.log("DL CURL RESPONSE: ",response);
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
    ** input: sessionID
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




    


    // Калькулятор стоимости и сроков перевозки
    static async calculator(parameters) { 
        // console.log("DL calculator RUN");
        
        // *** EXAMPLE ***
        // parameters = {
        //     delivery: {
        //         derival: {
        //             address: { street: "5000003200000000000000000" },
        //             produceDate: "2022-02-09"
        //         },
        //         arrival: { address: { street: "6100500010300010000000000" } }
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

    static async microCalc(parameters) { // Калькулятор ориентировочной стоимости и сроков заказа
        // console.log("DL micro_calc RUN");

        let { arrival_city, derival_city, sessionID } = parameters
        
        if (!arrival_city) return { error: "Не задан arrival_city" }
        if (!derival_city) return { error: "Не задан derival_city" }

        let response = await this.curl(
            new Micro_calc({
                derival: {
                    city: derival_city
                },
                arrival: {
                    city: arrival_city
                },
                sessionID
            })
        )

        return response
    }

    static async kladr(parameters) { // Поиск населённых пунктов
        // console.log("DL kladr RUN");

        let { q, cityID, code, limit } = parameters
        
        if (!q && !cityID && !code) return { error: "Не задан ни один из трёх параметров (q, cityID, code)" }
        
        let response = await this.curl(
            new Kladr(parameters)
        )
        
        if (response.cities !== undefined) return response.cities // массив городов

        return response
    }

    static async terminals() { // Справочник терминалов
        // console.log("DL terminals RUN");

        let response = await this.curl(
            new Terminals()
        )
        
        return response
    }
    
    static async terminalsCatalog(parameters) { // Справочник терминалов
        // console.log("DL terminals RUN");

        if (!parameters.url) return { error: "Не передан url." }

        let response

        let headers = {'content-type': 'application/json;charset=utf-8'}

        let options = { 
            url: parameters.url,
            method: "get", 
            headers
        }

        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("DL CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("DL CURL THROW: ",e);
            return { error:e }
        }

        if (response.city !== undefined) return response.city
        
        return response
    }
    
    // Справочник терминалов
    static async searchTerminals(parameters) { 
        // console.log("DL terminals RUN");

        if (!parameters.code && !parameters.cityID) return { error: "Не передан КЛАДР или cityID" }
        
        let response = await this.curl(
            new SearchTerminals(parameters)
        )

        if (response.terminals !== undefined) return response.terminals

        return response
    }
    
    // Справочник населённых пунктов (возвращает url для скачивания файла plases.csv)
    static async places() { 
        // console.log("DL places RUN");
        
        let response = await this.curl(
            new Places()
        )

        if (response.url !== undefined) return response.url

        return response
    }

    // Справочник населённых пунктов (поиск)
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
    
    // Справочник улиц
    static async streets() { 
        // console.log("DL streets RUN");
        
        let response = await this.curl(
            new Streets()
        )

        if (response.url !== undefined) return response.url

        return response
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
    static async requestTimeInterval(parameters) { 
        // console.log("DL requestTimeInterval RUN");
        
        let response = await this.curl(
            new RequestTimeInterval(parameters)
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
    static async requestDeliveryTimeInterval(parameters) { 
        // console.log("DL requestDeliveryTimeInterval RUN");
        
        let response = await this.curl(
            new RequestDeliveryTimeInterval(parameters)
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

}