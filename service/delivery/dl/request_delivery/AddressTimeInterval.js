
const Arrival = require("../classes/Derival")

module.exports = class RequestDeliveryAddressTimeInterval { // Интервалы передачи груза на адресе получателя
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии. Для получения сессии необходимо воспользоваться методом "Авторизация пользователя"
    docID // Номер заказа, накладной или заявки, по которой необходимо получить информацию о возможных интервалах доставки до адреса получателя
    
    delivery // Информация о доставке
    // delivery: { arrival: { address: { search } } }
    
    // обязательные параметры
    // produceDate, search
    

    constructor(parameters) {
        this.method = "v2/request_delivery/address/time_interval.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = parameters.sessionID

        if (parameters.docID === undefined) throw "Отсутствует обязательный параметр docID."
        this.docID = parameters.docID

        if (parameters.produceDate === undefined) throw "Отсутствует обязательный параметр produceDate."
        if (parameters.search === undefined) throw "Отсутствует обязательный параметр search."
        
        let produceDate = parameters.produceDate // "2022-02-22"
        let search = parameters.search // "347056, Белокалитвинский район, х. Западный, ул. Садовая, д. 26"
        
        let arrival = new Arrival({ produceDate, address: { search } })

        this.delivery = { arrival }
    }
}
