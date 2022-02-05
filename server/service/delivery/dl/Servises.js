


module.exports = class Servises { // Справочник улиц
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/references/services.json"
        this.appkey = process.env.DL_APPKEY
    }
}
