module.exports = class Terminals { // Справочник терминалов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    constructor() {
        this.method = "v3/public/terminals.json"
        this.appkey = process.env.DL_APPKEY
    }
}
