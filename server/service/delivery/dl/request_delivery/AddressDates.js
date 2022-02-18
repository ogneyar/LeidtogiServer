


module.exports = class RequestDeliveryAddressDates { // Даты доставки
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии. Для получения сессии необходимо воспользоваться методом "Авторизация пользователя"
    docID // Номер заказа, накладной или заявки, по которой необходимо получить информацию о возможных интервалах доставки до адреса получателя
    
    delivery // Информация о доставке
    // delivery: { arrival: { address: { search } } }
    
    // обязательные параметры (моего API)
    // search
    

    constructor(parameters) {
        this.method = "v2/request_delivery/address/dates.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = parameters.sessionID

        if (parameters.docID === undefined) throw "Отсутствует обязательный параметр docID."
        this.docID = parameters.docID

        if (parameters.search === undefined) throw "Отсутствует обязательный параметр search."
        let search = parameters.search // "347056, Белокалитвинский район, х. Западный, ул. Садовая, д. 26"
        
        this.delivery = { arrival: { address: { search } } }
    }
}
