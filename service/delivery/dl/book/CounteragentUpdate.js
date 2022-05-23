


module.exports = class BookCounteragentUpdate { // Создание и редактирование контрагентов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.

    // ------------------------
    // НЕобязательные параметры
    // ------------------------
    
    form // UID ОПФ (см. метод "Поиск ОПФ"). При передаче данных об "анонимном" получателе (значение параметра "isAnonym" - "true") необходимо передать пустой параметр или UID физического лица РФ (0xab91feea04f6d4ad48df42161b6c2e7a)
    name // Наименование юридического лица или имя физического лица. *Параметр является обязательным при создании контрагента
    inn // ИНН юридического лица. Параметр используется, только если контрагент является юридическим лицом.
    juridicalAddress // Юридический адрес. Параметр используется, только если контрагент является юридическим лицом.
    document // Данные документа, удостоверяющего личность. Параметр используется, только если контрагент является физическим лицом.
    dataForReceipt // Контактные данные для отправки электронного чека плательщику-физическому лицу. Параметр используется в запросе, только если контрагент является физическим лицом
    isAnonym // Признак "анонимного" получателя. Значение по умолчанию: "false".
    phone // Номер телефона "анонимного" получателя в формате "7XXXXXXXXXX" (где X - любая цифра). Параметр используется только для "анонимного" получателя
    email // Адрес электронной почты "анонимного" получателя. Параметр используется только для "анонимного" получателя
    counteragentID // ID контрагента, информацию о котором нужно отредактировать

    // this.sessionID = "0C1795BA-80E5-4AAB-AC1B-98A239234D67"
    // this.form = "0xAB91FEEA04F6D4AD48DF42161B6C2E7A"
    // this.name = "Петров А.А."
    // this.document = { type: 'passport', serial: 0000, number: 000000, date: '2006-06-26' }
    // this.dataForReceipt = { phone:'+79000000000', email: 'test@mail.ru'} 

    constructor(params) {
        this.method = "v2/book/counteragent/update.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        this.form = params.form || undefined
        this.name = params.name || undefined
        this.inn = params.inn || undefined
        this.juridicalAddress = params.juridicalAddress || undefined
        if (params.document !== undefined && typeof(params.document) === "string") this.document = JSON.parse(params.document)
        else this.document = params.document || undefined
        if (params.dataForReceipt !== undefined && typeof(params.dataForReceipt) === "string") this.dataForReceipt = JSON.parse(params.dataForReceipt)
        else this.dataForReceipt = params.dataForReceipt || undefined
        this.isAnonym = params.isAnonym || undefined
        this.phone = params.phone || undefined
        this.email = params.email || undefined
        this.counteragentID = params.counteragentID || undefined
    }
}
