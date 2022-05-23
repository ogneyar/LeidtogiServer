


module.exports = class ReferencesCountries { // Поиск стран
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
        
    // -------------------
    // необязательные поля
    // -------------------

    filter // Часть названия страны. Используется для подбора результата по началу строки.
    
    constructor(params) {
        this.method = "v1/references/countries.json"
        this.appkey = process.env.DL_APPKEY

        this.filter = params.filter || undefined
    }
}
