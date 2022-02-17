


module.exports = class CitiesCashlessOnly { // Справочник населенных пунктов с ограничениями по оплате
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/cities_cashless_only.json"
        this.appkey = process.env.DL_APPKEY
    }
}
