


module.exports = class FreightTypesFtl { // Характер груза: поиск по строке (перевозка еврофурой)
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // -------------------
    // необязательные поля
    // -------------------

    search // Наименование груза или его часть. Минимальная длина строки - 2 символа. Поиск осуществляется с начала строки
    

    constructor(parameters) {
        this.method = "v1/ftl/freight_types.json"
        this.appkey = process.env.DL_APPKEY

        this.search = parameters.search || undefined
    }
}
