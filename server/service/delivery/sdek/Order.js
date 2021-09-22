const Money = require("./classes/Money")
const Threshold = require("./classes/Threshold")
const Location = require("./classes/Location")
const Package = require("./classes/Package")
const Contact = require("./classes/Contact")
const Service = require("./classes/Service")
const Seller = require("./classes/Seller")


module.exports = class Order {
    
    tariff_code // по умолчанию от Двери до Двери (139)
        // tariff_code = 136 | Посылка склад-склад (С-С) | до 30 кг
        // tariff_code = 137 | Посылка склад-дверь (С-Д) | до 30 кг
        // tariff_code = 138 | Посылка дверь-склад (Д-С) | до 30 кг
        // tariff_code = 139 | Посылка дверь-дверь (Д-Д) | до 30 кг

    recipient // Получатель (объект класса Contact)
    
    from_location = undefined // обязательное поле, если заказ с тарифом "от двери", tariff_code = 138,139
        // объект класса Location
    to_location = undefined // обязательное поле, если заказ с тарифом "до двери", tariff_code = 137,139
        // объект класса Location
    
    packages = [] // (массив объектов класса Package)
        // Список информации по местам (упаковкам)
        // Количество мест в заказе может быть от 1 до 255

    // -------------------
    // необязательные поля
    // -------------------

    type // необязательное поле (ИМ - 1)
    number // необязательное поле (номер заказа)
    comment // необязательное поле (комментарий)
    developer_key = "hutoryanin.ru"// необязательное поле (ключ разработчика) я его сделал не изменяемым

    shipment_point // Код ПВЗ СДЭК, на который будет производиться самостоятельный привоз клиентом
        // Не может использоваться одновременно с from_location
        // обязателен, если заказ с тарифом "от склада"
    
    delivery_point // Код ПВЗ СДЭК, на который будет доставлена посылка
        // Не может использоваться одновременно с to_location
        // обязателен, если заказ с тарифом "до склада" или "до постамата"

    date_invoice // Дата инвойса
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    shipper_name // Грузоотправитель
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    shipper_address // Адрес грузоотправителя
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    delivery_recipient_cost = undefined // необязательное поле (объект класса Money)
    delivery_recipient_cost_adv = undefined // необязательное поле (массив объектов класса Threshold)

    sender = undefined // необязательное поле, если заказ типа "интернет-магазин"
        // объект класса Contact 

    seller = undefined // Реквизиты истинного продавца, обязательное поле, если заказ - международный
        // объект класса Seller (ещё не реализован)
        // Только для заказов "интернет-магазин"

    services = [] // необязательное поле (массив объектов класса Service)

    print // необязательное поле
        // Необходимость сформировать печатную форму по заказу
        // Может принимать значения:
        // barcode - ШК мест (число копий - 1)
        // waybill - квитанция (число копий - 2)

    
    constructor(parameters) {
        this.type = parameters.type || 1
        this.number = parameters.number || undefined
        this.tariff_code = parameters.tariff_code || 139
        this.comment = parameters.comment || undefined
        
        this.shipment_point = parameters.shipment_point || undefined
        this.delivery_point = parameters.delivery_point || undefined
        
        this.date_invoice = parameters.date_invoice || undefined
        this.shipper_name = parameters.shipper_name || undefined
        this.shipper_address = parameters.shipper_address || undefined
        
        if (parameters.delivery_recipient_cost !== undefined) {
            this.delivery_recipient_cost = new Money(parameters.delivery_recipient_cost)
        }
        if (parameters.delivery_recipient_cost_adv !== undefined && Array.isArray(parameters.delivery_recipient_cost_adv)) {
            parameters.delivery_recipient_cost_adv.map((i,index) => {
                this.delivery_recipient_cost_adv[index] = new Threshold(i)
            })
        }

        if (parameters.sender !== undefined) this.sender = new Contact(parameters.sender)
        if (parameters.seller !== undefined) this.seller = new Seller(parameters.seller)
        
        this.recipient = new Contact(parameters.recipient)
        
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
        
        this.print = parameters.print || undefined

    }
}