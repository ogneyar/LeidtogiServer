

module.exports = class ListPoints {
    
    token // Токен для доступа к api-сервисам
    method // метод ListPoints
   
    // -------------------
    // необязательные поля
    // -------------------

    prepaid // Возможности оплаты на ПВЗ при выдаче
    CountryCode // Код страны
    CityCode	// Код города Boxberry

    
    constructor(parameters) {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "ListPoints"

        this.prepaid = parameters.prepaid || 1

        this.CountryCode = parameters.CountryCode || 643 // код России
        this.CityCode = parameters.CityCode || undefined // 03794 - код Белой Калитвы

    }
}
