

module.exports = class ListCities {
    
    token // Токен для доступа к api-сервисам
    method // метод ListCities
   
    // -------------------
    // необязательные поля
    // -------------------

    CountryCode // Код страны

    
    constructor(parameters) {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "ListCities"

        this.CountryCode = parameters.CountryCode || 643 // код России
    }
}
