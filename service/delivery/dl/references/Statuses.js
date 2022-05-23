


module.exports = class ReferencesStatuses { // Справочник статусов заказа груза
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/references/statuses.json"
        this.appkey = process.env.DL_APPKEY
    }
}
