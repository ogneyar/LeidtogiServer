


module.exports = class BookAddresses { // Список адресов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.
    counteragentID // ID контрагента, по которому нужно получить информацию об адресах


    constructor(params) {
        this.method = "v2/book/addresses.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        if (params.counteragentID === undefined) throw "Отсутствует обязательный параметр counteragentID."
        this.counteragentID = params.counteragentID
    }
}
