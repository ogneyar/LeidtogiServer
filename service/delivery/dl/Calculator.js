
const Delivery = require("./classes/Delivery")
const Cargo = require("./classes/Cargo")


module.exports = class Calculator { // Калькулятор стоимости и сроков перевозки
    
    appkey // ключ для доступа к api-сервисам
    method // метод для доступа к api-сервисам
    
    // -------------------
    // обязательные поля
    // -------------------

    delivery // Информация по перевозке груза
    cargo // Информация о грузе
    // в данном случае если cargo не передавать, то ошибки не произойдёт

    
    constructor(parameters) {
        this.appkey = process.env.DL_APPKEY
        this.method = "v2/calculator.json"

        if (parameters.delivery === undefined) throw "Отсутствует обязательный параметр delivery."
        this.delivery = new Delivery(parameters.delivery)

        this.cargo = new Cargo(parameters.cargo)
    }
}
