


module.exports = class ReferencesPackages { // Справочник упаковок
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/references/packages.json"
        this.appkey = process.env.DL_APPKEY
    }
}
