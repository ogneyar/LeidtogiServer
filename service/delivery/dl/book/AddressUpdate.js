


module.exports = class BookAddressUpdate { // Создание и редактирование адреса
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии.

    // ------------------------
    // НЕобязательные параметры
    // ------------------------

    // При создании адреса обязательно должны быть переданы данные адреса 
    // - в виде произвольной строки ("search") 
    // или набора параметров (в этом случае обязательными являются параметры "street" и "house") 
    // или ID терминала ("terminalID").

    search // Адрес в виде произвольной строки. Минимум 2 символа, максимум - 1024
    street // Код КЛАДР улицы
    house // Номер дома, включая литеру. Например, "13/А". Максимум 7 символов
    counteragentID // ID контрагента, для которого нужно добавить адрес. *Параметр является обязательным при создании адреса
    building // Корпус. Максимум 5 символов
    structure // Строение. Максимум 7 символов
    flat // Номер квартиры/офиса. Допускается написание с буквой, например "222 А" (2), (3). Максимум 5 символов
    terminalID // ID терминала из "Справочника терминалов". Вся информация об адресе в данном случае заполняется автоматически
    addressID // ID адреса, который нужно изменить. *Параметр является обязательным при редактировании адреса


    constructor(params) {
        this.method = "v2/book/address/update.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID

        this.search = params.search || undefined
        this.street = params.street || undefined
        this.house = params.house || undefined
        this.counteragentID = params.counteragentID || undefined
        this.building = params.building || undefined
        this.structure = params.structure || undefined
        this.flat = params.flat || undefined
        this.terminalID = params.terminalID || undefined
        this.addressID = params.addressID || undefined
    }
}
