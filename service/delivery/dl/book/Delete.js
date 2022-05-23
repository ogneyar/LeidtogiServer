


module.exports = class BookDelete { // Удаление объектов из адресной книги
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.

    // ------------------------
    // НЕобязательные параметры
    // ------------------------
    
    counteragentIDs // Массив ID контрагентов, которых нужно удалить
    addressIDs // Массив ID адресов, которые нужно удалить
    phoneIDs // Массив ID контактных телефонов, которые нужно удалить
    contactIDs // Массив ID контактных лиц, которых нужно удалить


    constructor(params) {
        this.method = "v2/book/delete.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        this.counteragentIDs = params.counteragentIDs || undefined
        this.addressIDs = params.addressIDs || undefined
        this.phoneIDs = params.phoneIDs || undefined
        this.contactIDs = params.contactIDs || undefined
    }
}
