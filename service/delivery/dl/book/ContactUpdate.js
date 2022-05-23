


module.exports = class BookContactUpdate { // Создание и редактирование контактных лиц
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.
    contact // ФИО контактного лица

    // ------------------------
    // НЕобязательные параметры
    // ------------------------

    addressID // ID адреса, для которого нужно добавить контактное лицо. *Параметр является обязательным при создании контактного лица.
    contactID // ID контактного лица, данные которого необходимо изменить. *Параметр является обязательным при редактировании контактного лица.
    

    constructor(params) {
        this.method = "v2/book/contact/update.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        if (params.contact === undefined) throw "Отсутствует обязательный параметр contact."
        this.contact = params.contact

        this.addressID = params.addressID || undefined
        this.contactID = params.contactID || undefined
    }
}
