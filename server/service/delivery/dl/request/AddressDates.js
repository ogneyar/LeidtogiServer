

const Cargo = require("../classes/Cargo")


module.exports = class RequestAddressDates { // Даты отправки от адреса
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    cargo // Информация о грузе
    delivery // Информация о доставке

    // можно передать так - delivery: { deliveryType: { type }, derival: { address: { search } } }
    // или просто search // "347056, Белокалитвинский район, х. Западный, ул. Садовая, д. 26"

    // -------------------
    // необязательные поля
    // -------------------

    sessionID // ID сессии 
    

    constructor(parameters) {
        this.method = "v2/request/address/dates.json"
        this.appkey = process.env.DL_APPKEY
        
        // if (parameters.cargo === undefined) throw "Отсутствует обязательный параметр cargo."
        this.cargo = new Cargo(parameters.cargo)

        if (parameters.search === undefined && parameters.delivery === undefined) throw "Отсутствует один из обязательных параметров delivery или search."
        if (parameters.delivery !== undefined) {
            this.delivery = typeof(parameters.delivery) === "string" ? JSON.parse(parameters.delivery) : parameters.delivery
        }else if (parameters.search !== undefined) {
            let type = "auto"
            if (parameters.type !== undefined) type = parameters.type
            this.delivery = { deliveryType: { type }, derival: { address: { search: parameters.search } } }
        }

        this.sessionID = parameters.sessionID || undefined
    }
}
