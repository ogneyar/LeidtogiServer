
const Derival = require("../classes/Derival")

module.exports = class RequestAddressTimeInterval { // Интервалы передачи груза на адресе отправителя
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    delivery // Информация о доставке
    // delivery: { deliveryType: { type }, derival: { address: { search } } }
    
    // обязательные параметры
    // produceDate, search

    // -------------------
    // необязательные поля
    // -------------------

    // type

    sessionID // ID сессии. Для получения сессии необходимо воспользоваться методом "Авторизация пользователя"
    

    constructor(parameters) {
        this.method = "v2/request/address/time_interval.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.produceDate === undefined) throw "Отсутствует обязательный параметр produceDate."
        if (parameters.search === undefined) throw "Отсутствует обязательный параметр search."
        
        let produceDate = parameters.produceDate // "2022-02-22"
        let search = parameters.search // "347056, Белокалитвинский район, х. Западный, ул. Садовая, д. 26"
        
        let derival = new Derival({ produceDate, address: { search } })

        let type = parameters.type || "auto"

        this.delivery = { deliveryType: { type }, derival }
        
        this.sessionID = parameters.sessionID || undefined
    }
}
