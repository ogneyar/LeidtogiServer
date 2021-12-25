

module.exports = class Calculator {
    
    appkey // ключ для доступа к api-сервисам
    method // метод для доступа к api-сервисам
    
    // -------------------
    // необязательные поля
    // -------------------

    
    constructor(parameters) {
        this.appkey = process.env.DL_APPKEY
        this.method = "v2/calculator.json"

    }
}
