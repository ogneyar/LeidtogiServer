


module.exports = class BookPhoneUpdate { // Создание и редактирование телефонов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.
    phoneNumber // Контактный телефон. Допускаются цифры и знак "+" в начале строк, начинающихся с 7 или 375

    // ------------------------
    // НЕобязательные параметры
    // ------------------------

    addressID // ID адреса, для которого нужно добавить контактное лицо. *Параметр является обязательным при создании контактного лица.
    phoneID // ID контактного телефона, который необходимо изменить. *Параметр является обязательным при редактировании контактного телефона
    ext // Добавочный номер, максимум 5 цифр


    constructor(params) {
        this.method = "v2/book/phone/update.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        if (params.phoneNumber === undefined) throw "Отсутствует обязательный параметр phoneNumber."
        this.phoneNumber = params.phoneNumber

        this.addressID = params.addressID || undefined
        this.phoneID = params.phoneID || undefined
        this.ext = params.ext || undefined
    }
}
