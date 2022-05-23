


module.exports = class RequestDeliveryTypes { // Справочник видов доставки
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/request_delivery_types.json"
        this.appkey = process.env.DL_APPKEY
    }
}
