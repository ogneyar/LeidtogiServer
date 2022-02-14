


module.exports = class LoadParams { // Справочник услуг ПРР
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/load_params.json"
        this.appkey = process.env.DL_APPKEY
    }
}
