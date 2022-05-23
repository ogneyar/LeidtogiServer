


module.exports = class ReferencesLoadTypes { // Справочник видов загрузки
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/references/load_types.json"
        this.appkey = process.env.DL_APPKEY
    }
}
