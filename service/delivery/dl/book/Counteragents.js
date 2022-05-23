


module.exports = class BookCounteragents { // Список контрагентов из адресной книги
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.

    // ------------------------
    // НЕобязательные параметры
    // ------------------------
    
    withAnonym // Признак запроса списка контрагентов, включающего "анонимных" получателей
    isAnonym // Признак запроса списка контрагентов, включающего только "анонимных" получателей
    counteragentIds // Список ID контрагентов, по которым необходима информация.


    constructor(params) {
        this.method = "v2/book/counteragents.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        this.withAnonym = params.withAnonym || undefined
        this.isAnonym = params.isAnonym || undefined
        this.counteragentIds = params.counteragentIds || undefined
    }
}
