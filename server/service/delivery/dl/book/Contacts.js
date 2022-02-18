


module.exports = class BookContacts { // Получение списка контактных лиц и телефонов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.
    addressID // ID адреса, по которому нужно получить информацию о контактных лицах и телефонах


    constructor(params) {
        this.method = "v2/book/contacts.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        if (params.addressID === undefined) throw "Отсутствует обязательный параметр addressID."
        this.addressID = params.addressID
    }
}
