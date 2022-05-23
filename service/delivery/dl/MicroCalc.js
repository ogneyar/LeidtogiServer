


module.exports = class MicroCalc {
    
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

        if (parameters.derival === undefined) throw "Отсутствует обязательный параметр derival."
        this.derival = parameters.derival
        if (parameters.arrival === undefined) throw "Отсутствует обязательный параметр arrival."
        this.arrival = parameters.arrival

        this.sessionID = parameters.sessionID || undefined
    }
}
