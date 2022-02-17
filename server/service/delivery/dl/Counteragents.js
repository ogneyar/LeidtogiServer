


module.exports = class Counteragents { // Cписок контрагентов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии для запросов к данным Личного кабинета
    
    // -------------------
    // необязательные поля
    // -------------------

    cauid // UID контрагента, от имени которого должны создаваться заявки в рамках текущей сессии. Параметр позволяет изменить контрагента, выбранного по умолчанию, на другого контрагента
    fullInfo // Флаг, обозначающий, что запрошена полная информация по контрагентам

    
    constructor(params) {
        this.method = "v2/counteragents.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        this.cauid = params.cauid || undefined
        this.fullInfo = params.fullInfo || true
    }
}
