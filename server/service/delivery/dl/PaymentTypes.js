


module.exports = class PaymentTypes { // Справочник видов платежа
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/payment_types.json"
        this.appkey = process.env.DL_APPKEY
    }
}
