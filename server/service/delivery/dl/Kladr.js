


module.exports = class Kladr { // Поиск населённых пунктов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // --------------------------------
    // необходим один из трёх элементов
    // --------------------------------

    q // Часть названия города
    cityID // ID города из "Справочника населенных пунктов".
    code // Код КЛАДР города

    // -------------------
    // необязательные поля
    // -------------------

    limit // максимальное количество записей

    
    constructor(parameters) {
        this.method = "v2/public/kladr.json"
        this.appkey = process.env.DL_APPKEY

        this.q = parameters.q || undefined
        this.cityID = parameters.cityID || undefined
        this.code = parameters.code || undefined

        this.limit = parameters.limit || undefined
    }
}
