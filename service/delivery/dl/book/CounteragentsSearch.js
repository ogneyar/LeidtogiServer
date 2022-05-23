


module.exports = class BookCounteragentsSearch { // Поиск контрагентов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    query // Часть наименования контрагента, его ОПФ или ИНН. Минимум 1 символ, максимум 255

    // ------------------------
    // НЕобязательные параметры
    // ------------------------

    sessionID // ID сессии.
    
    country // UID страны, см. метод "Поиск стран". Если параметр не передан, то будет осуществлён поиск контрагентов из РФ.
    juridical // Тип контрагента: "true" - юридическое лицо; "false" - физическое лицо. Если параметр не передан в запросе, то в ответе будут представлены данные только по юридическим лицам.


    constructor(params) {
        this.method = "v2/book/counteragents/search.json"
        this.appkey = process.env.DL_APPKEY

        if (params.query === undefined) throw "Отсутствует обязательный параметр query."
        this.query = params.query

        this.sessionID = params.sessionID || undefined

        this.country = params.country || undefined
        this.juridical = params.juridical || true
    }
}
