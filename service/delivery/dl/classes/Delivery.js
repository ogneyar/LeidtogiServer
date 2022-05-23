
const DerivalArrival = require("./DerivalArrival")


module.exports = class Delivery { // Информация по перевозке груза
    
    deliveryType // Вид межтерминальной перевозки ("auto", "express", "avia")
    // в данном случае deliveryType установлен по умолчанию и его таким образом можно не передавать
    
    derival // Данные по доставке груза от отправителя
    arrival // Данные по доставке груза до получателя

    // -------------------
    // необязательные поля
    // -------------------

    packages // Данные по упаковке.
    accompanyingDocuments // Информация по сопроводительным документам

    constructor(data) {
        if (typeof(data) === "string") data = JSON.parse(data)
        
        this.deliveryType = data.deliveryType || { type: "auto" }
        
        if (data.derival === undefined) throw "Отсутствует обязательный параметр derival."
        this.derival = new DerivalArrival(data.derival)

        if (data.arrival === undefined) throw "Отсутствует обязательный параметр arrival."
        if (data.arrival.variant === undefined) {this.arrival = new DerivalArrival({...data.arrival, variant: "terminal"})}
        else this.arrival = new DerivalArrival(data.arrival)

        this.packages = data.packages || undefined
        this.accompanyingDocuments = data.accompanyingDocuments || undefined
    }
}
