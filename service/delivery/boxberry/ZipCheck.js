
module.exports = class ZipCheck {
    
    token // Токен для доступа к api-сервисам
    method // метод ZipCheck
   
    zip // Почтовый индекс

    // -------------------
    // необязательные поля
    // -------------------

    CountryCode // Код страны
    
    constructor(parameters) {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "ZipCheck"

        this.zip = parameters.zip

        this.CountryCode = parameters.CountryCode || 643 // код России
    }
}
