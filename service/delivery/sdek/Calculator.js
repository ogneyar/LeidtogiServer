// const Money = require("./classes/Money")
// const Threshold = require("./classes/Threshold")
const Location = require("./classes/Location")
const Package = require("./classes/Package")
// const Contact = require("./classes/Contact")
const Service = require("./classes/Service")
// const Seller = require("./classes/Seller")


module.exports = class Calculator {
    
    tariff_code // по умолчанию от Двери до Двери (139)
        // tariff_code = 136 | Посылка склад-склад (С-С) | до 30 кг
        // tariff_code = 137 | Посылка склад-дверь (С-Д) | до 30 кг
        // tariff_code = 138 | Посылка дверь-склад (Д-С) | до 30 кг
        // tariff_code = 139 | Посылка дверь-дверь (Д-Д) | до 30 кг
    
    from_location = undefined // Адрес отправления
        // объект класса Location
    to_location = undefined // Адрес получения
        // объект класса Location
    
    packages = [] // (массив объектов класса Package)
        // Список информации по местам (упаковкам)
        // Количество мест в заказе может быть от 1 до 255

    // -------------------
    // необязательные поля
    // -------------------

    date // Дата и время планируемой передачи заказа
        // По умолчанию - текущая
    type // Тип заказа (для проверки доступности тарифа и дополнительных услуг по типу заказа):
        // 1 - "интернет-магазин"
        // 2 - "доставка" 
        // По умолчанию - 1
    currency // Валюта, в которой необходимо произвести расчет 
        // По умолчанию - валюта договора (1 - Рубль)
    services = [] // необязательное поле (массив объектов класса Service)

    
    constructor(parameters) {
        this.date = parameters.date || undefined
        this.type = parameters.type || 1
        this.currency = parameters.currency || 1

        this.tariff_code = parameters.tariff_code || 139
                
        if (parameters.from_location !== undefined) this.from_location = new Location(parameters.from_location)
        if (parameters.to_location !== undefined) this.to_location = new Location(parameters.to_location)
        
        if (parameters.services !== undefined && Array.isArray(parameters.services)) {
            parameters.services.map((i,index) => {
                this.services[index] = new Service(i)
            })
        }else this.services = undefined
        
        if (parameters.packages !== undefined && Array.isArray(parameters.packages)) {
            parameters.packages.map((i,index) => {
                this.packages[index] = new Package(i)
            })
        }
        
    }
}
