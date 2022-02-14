module.exports = class SearchTerminals { // Поиск терминалов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // --------------------------------
    // необходим один из двух элементов
    // --------------------------------

    cityID // ID города из "Справочника населенных пунктов".
    code // Код КЛАДР города

    // -------------------
    // необязательные поля
    // -------------------

    sessionID // ID сессии
    direction // Направление работы терминалов.
        // Доступные значения:
        // "derival" - для отправления;
        // "arrival" - для получения

    constructor(parameters) {
        this.method = "v1/public/request_terminals.json"
        this.appkey = process.env.DL_APPKEY
        
        if (parameters.cityID === undefined && parameters.code === undefined) throw "Необходим один из двух параметров, cityID или code."

        this.cityID = parameters.cityID || undefined
        this.code = parameters.code || undefined

        this.sessionID = parameters.sessionID || undefined
        this.direction = parameters.direction || "arrival"
    }
}
