


module.exports = class RequestServices { // Справочник дополнительных услуг
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/request_services.json"
        this.appkey = process.env.DL_APPKEY
    }
}
