


module.exports = class FreightTypes { // Характер груза
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/freight_types.json"
        this.appkey = process.env.DL_APPKEY
    }
}
