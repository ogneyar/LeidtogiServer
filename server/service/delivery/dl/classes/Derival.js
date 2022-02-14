
const Address = require("./Address")

module.exports = class Derival {

    produceDate // Дата доставки груза до адреса получателя. Формат: "ГГГГ-ММ-ДД"
    
    // --------------------------------
    // необходим один из трёх элементов
    // --------------------------------

    addressID // ID адреса из "Адресной книги"
    address // Адрес
    city // Код КЛАДР населенного пункта.


    constructor(data) {

        if (data.produceDate === undefined) throw "Отсутствует обязательный параметр produceDate."
        this.produceDate = data.produceDate

        if (data.addressID === undefined && 
            data.address === undefined &&
            data.city === undefined) throw "Отсутствует один из обязательных параметров addressID, address или city."
        
        this.addressID = data.addressID || undefined
        if (data.address !== undefined) this.address = new Address(data.address)
        this.city = data.city || undefined
        
    }
}
