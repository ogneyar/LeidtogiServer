


module.exports = class ReferencesOpfList { // Поиск ОПФ
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/references/opf_list.json"
        this.appkey = process.env.DL_APPKEY
    }
}
