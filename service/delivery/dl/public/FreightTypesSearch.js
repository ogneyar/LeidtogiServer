


module.exports = class FreightTypesSearch { // Характер груза: поиск по строке (перевозка сборных грузов)
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    name // Поисковый запрос
    
    // -------------------
    // необязательные поля
    // -------------------

    page // Номер запрашиваемой страницы ответа
    

    constructor(parameters) {
        this.method = "v1/public/freight_types/search.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.name === undefined) throw "Необходим обязательный параметр name."
        this.name = parameters.name

        this.page = parameters.page || undefined
    }
}
