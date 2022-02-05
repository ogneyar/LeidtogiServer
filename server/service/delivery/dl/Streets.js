


module.exports = class Streets { // Справочник улиц
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/streets.json"
        this.appkey = process.env.DL_APPKEY
    }
}
