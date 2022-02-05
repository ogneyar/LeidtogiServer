


module.exports = class Places { // Справочник населённых пунктов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/places.json"
        this.appkey = process.env.DL_APPKEY
    }
}
