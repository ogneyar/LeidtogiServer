const Money = require("./order/Money")
const Threshold = require("./order/Threshold")
const Location = require("./order/Location")
const Package = require("./order/Package")
const Contact = require("./order/Contact")
const Service = require("./order/Service")
const Seller = require("./order/Seller")


module.exports = class Order {
    
    tariff_code = 139
        // tariff_code = 136 | Посылка склад-склад (С-С) | до 30 кг
        // tariff_code = 137 | Посылка склад-дверь (С-Д) | до 30 кг
        // tariff_code = 138 | Посылка дверь-склад (Д-С) | до 30 кг
        // tariff_code = 139 | Посылка дверь-дверь (Д-Д) | до 30 кг

    recipient // Получатель (объект класса Contact)
    
    from_location = undefined // обязательное поле, если заказ с тарифом "от двери", tariff_code = 138,139
    to_location = undefined // обязательное поле, если заказ с тарифом "от двери", tariff_code = 138,139
    
    packages = [] // (массив объектов класса Package)
        // Список информации по местам (упаковкам)
        // Количество мест в заказе может быть от 1 до 255

    // -------------------
    // необязательные поля
    // -------------------

    type = 1 // необязательное поле (ИМ)
    number = undefined // необязательное поле (номер заказа)
    comment = "" // необязательное поле (комментарий)
    developer_key = "hutoryanin.ru" // необязательное поле (ключ разработчика)

    shipment_point = undefined // Код ПВЗ СДЭК, на который будет производиться самостоятельный привоз клиентом
        // Не может использоваться одновременно с from_location
        // обязателен, если заказ с тарифом "от склада"
    
    delivery_point = undefined // Код ПВЗ СДЭК, на который будет доставлена посылка
        // Не может использоваться одновременно с to_location
        // обязателен, если заказ с тарифом "до склада" или "до постамата"

    date_invoice = undefined // Дата инвойса
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    shipper_name = undefined // Грузоотправитель
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    shipper_address = undefined // Адрес грузоотправителя
        // Только для заказов "интернет-магазин"
        // обязателен, если заказ - международный

    delivery_recipient_cost = undefined // необязательное поле (объект класса Money)
    delivery_recipient_cost_adv = undefined // необязательное поле (массив объектов класса Threshold)

    sender = undefined // необязательное поле, если заказ типа "интернет-магазин"
        // объект класса Contact 

    seller = undefined // Реквизиты истинного продавца, обязательное поле, если заказ - международный
        // объект класса Seller (ещё не реализован)
        // Только для заказов "интернет-магазин"

    services = undefined // необязательное поле (массив объектов класса Service)

    print = undefined // необязательное поле
        // Необходимость сформировать печатную форму по заказу
        // Может принимать значения:
        // barcode - ШК мест (число копий - 1)
        // waybill - квитанция (число копий - 2)

    
    constructor(order) {
        if (order.type !== undefined) this.type = order.type
        if (order.number !== undefined) this.number = order.number
        if (order.tariff_code !== undefined) this.tariff_code = order.tariff_code
        if (order.comment !== undefined) this.comment = order.comment
        
        if (order.shipment_point !== undefined) this.shipment_point = order.shipment_point
        if (order.delivery_point !== undefined) this.delivery_point = order.delivery_point
        
        if (order.date_invoice !== undefined) this.date_invoice = order.date_invoice
        if (order.shipper_name !== undefined) this.shipper_name = order.shipper_name
        if (order.shipper_address !== undefined) this.shipper_address = order.shipper_address
        
        if (order.delivery_recipient_cost !== undefined) {
            this.delivery_recipient_cost = new Money(order.delivery_recipient_cost)
        }
        if (order.delivery_recipient_cost_adv !== undefined && Array.isArray(order.delivery_recipient_cost_adv)) {
            order.delivery_recipient_cost_adv.map((i,index) => {
                this.delivery_recipient_cost_adv[index] = new Threshold(i)
            })
        }

        if (order.sender !== undefined) this.sender = new Contact(order.sender)
        if (order.seller !== undefined) this.seller = new Seller(order.seller)
        
        this.recipient = new Contact(order.recipient)
        
        if (order.from_location !== undefined) this.from_location = new Location(order.from_location)
        if (order.to_location !== undefined) this.to_location = new Location(order.to_location)
        
        if (order.services !== undefined && Array.isArray(order.services)) {
            order.services.map((i,index) => {
                this.services[index] = new Service(i)
            })
        }
        
        if (order.packages !== undefined && Array.isArray(order.packages)) {
            order.packages.map((i,index) => {
                this.packages[index] = new Package(i)
            })
        }
        
        if (order.print !== undefined) this.print = order.print

    }
}

// module.exports = new Order()