


module.exports = class Cities { // Справочник городов из прайс-листа
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/cities.json"
        this.appkey = process.env.DL_APPKEY
    }
}
