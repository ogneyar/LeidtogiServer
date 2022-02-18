


module.exports = class RequestTerminalDates { // Даты отправки от терминала
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    delivery // Информация о доставке

    // можно передать так - delivery = { derival: { terminalID } }
    // или просто terminalID // 310

    // -------------------
    // необязательные поля
    // -------------------
    
    sessionID // ID сессии
    

    constructor(parameters) {
        this.method = "v2/request/terminal/dates.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.terminalID === undefined && parameters.delivery === undefined) throw "Отсутствует один из обязательных параметров delivery или terminalID."
        if (parameters.delivery !== undefined) this.delivery = parameters.delivery
        else if (parameters.terminalID !== undefined) this.delivery = { derival: { terminalID: parameters.terminalID } }

        this.sessionID = parameters.sessionID || undefined
    }
}
