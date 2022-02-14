


module.exports = class PayerTypes { // Справочник видов плательщиков
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/payer_types.json"
        this.appkey = process.env.DL_APPKEY
    }
}
