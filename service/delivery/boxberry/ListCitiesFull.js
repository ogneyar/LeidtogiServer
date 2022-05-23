

module.exports = class ListCitiesFull {
    
    token // Токен для доступа к api-сервисам
    method // метод ListCitiesFull
   
    // -------------------
    // необязательные поля
    // -------------------

    CountryCode // Код страны

    
    constructor(parameters) {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "ListCitiesFull"

        this.CountryCode = parameters.CountryCode || 643 // код России
    }
}
