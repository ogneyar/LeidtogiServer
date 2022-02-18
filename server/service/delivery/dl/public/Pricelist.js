


module.exports = class Pricelist { // Прайс-лист
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // --------------------------------
    // необходим один из двух элементов
    // --------------------------------

    city_from_uid // UID города отправления, см "Справочник городов из прайс-листа"
    city_to_uid // UID города назначения, см. "Справочник городов из прайс-листа"

    
    constructor(parameters) {
        this.method = "v1/public/pricelist.json"
        this.appkey = process.env.DL_APPKEY
        
        if (parameters.city_from_uid === undefined && parameters.city_to_uid === undefined) throw "Необходим city_from_uid и/или city_to_uid из метода cities."

        this.city_from_uid = parameters.city_from_uid || undefined
        this.city_to_uid = parameters.city_to_uid || undefined
    }
}
