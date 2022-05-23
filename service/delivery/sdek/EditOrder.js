const Order = require("./Order")
const Money = require("./classes/Money")
const Threshold = require("./classes/Threshold")
const Location = require("./classes/Location")
const Package = require("./classes/Package")
const Contact = require("./classes/Contact")
const Service = require("./classes/Service")
const Seller = require("./classes/Seller")


module.exports = class EditOrder extends Order {

    uuid = undefined // нужен, если не заполнен cdek_number
    
    // -------------------
    // необязательные поля
    // -------------------

    cdek_number = undefined // нужен, если не заполнен uuid

    tariff_code = undefined // по умолчанию от Двери до Двери (139)
        // tariff_code = 136 | Посылка склад-склад (С-С) | до 30 кг
        // tariff_code = 137 | Посылка склад-дверь (С-Д) | до 30 кг
        // tariff_code = 138 | Посылка дверь-склад (Д-С) | до 30 кг
        // tariff_code = 139 | Посылка дверь-дверь (Д-Д) | до 30 кг

    recipient = undefined// Получатель (объект класса Contact)
   
    from_location = undefined // Адрес отправки
        // Не может использоваться одновременно с shipment_point
        // объект класса Location
    to_location = undefined // Адрес получения
        // Не может использоваться одновременно с delivery_point
        // объект класса Location
    

    // все остальные поля определены в родительском классе Order


    constructor(parameters) {

        super(parameters)

        this.uuid = parameters.uuid || undefined
        this.cdek_number = parameters.cdek_number || undefined
        this.tariff_code = parameters.tariff_code || undefined
        this.recipient = parameters.recipient || undefined
        this.from_location = parameters.from_location || undefined
        this.to_location = parameters.to_location || undefined
        
        if (parameters.packages !== undefined && Array.isArray(parameters.packages)) {
            parameters.packages.map((i,index) => {
                this.packages[index] = new Package(i)
            })
        }else this.packages = undefined

    }
}