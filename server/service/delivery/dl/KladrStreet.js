


module.exports = class KladrStreet { // Поиск улиц
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // --------------------------------
    // необходим один из двух элементов
    // --------------------------------

    cityID // ID города из "Справочника населенных пунктов".
    code // Код КЛАДР улицы. Может быть получен с помощью сервисов, представленных на странице "Поиск КЛАДР"

    // -------------------
    // обязательные поля
    // -------------------

    limit // Максимальное количество выводимых элементов списка

    // -------------------
    // необязательные поля
    // -------------------

    street // Часть названия улицы // *Параметр обязателен, только если передан параметр "cityID"
   
    
    constructor(parameters) {
        this.method = "v1/public/kladr_street.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.limit === undefined) throw "Отсутствует обязательный параметр limit."
        this.limit = parameters.limit

        if (parameters.cityID === undefined && parameters.code === undefined) throw "Отсутствует один из двух обязательных параметров cityID или code."
        this.cityID = parameters.cityID || undefined
        this.code = parameters.code || undefined
        
        if (parameters.cityID !== undefined && parameters.street === undefined) throw "Отсутствует обязательный параметр street при переданном cityID."
        this.street = parameters.street || undefined
    }
}
