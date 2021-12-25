

module.exports = class Micro_calc {
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    derival // Информация по доставке груза от отправителя
    arrival // Информация по доставке груза до получателя

    // -------------------
    // необязательные поля
    // -------------------

    sessionID // ID сессии

    
    constructor(parameters) {
        this.method = "v1/micro_calc.json"
        this.appkey = process.env.DL_APPKEY

        this.derival = parameters.derival
        this.arrival = parameters.arrival

        this.sessionID = parameters.sessionID || undefined
    }
}
