

const Address = require("./Address")
const Time = require("./Time")

module.exports = class DerivalArrival {
    variant // Способ доставки груза. ("address", "terminal", "airport")
    // в данном случае выбор variant отсутствует, только - "address"
    
    // -------------------
    // обязательные поля
    // -------------------

    address // Адрес
    time // Время передачи груза отправителем/получателю на адресе.
    // в данном случае время установлено по умолчанию и его таким образом можно не передавать

    // -------------------
    // необязательные поля
    // -------------------

    produceDate // "2022-02-05" - в таком формате // обязателен для derival !!!!!!!!!!!!!!!

    handling // Погрузо-разгрузочные работы на адресе.
    requirements // Дополнительные требования к транспорту: доступные виды загрузки машины (боковая, задняя и пр.), а также другие требования - манипулятор, растентовка и пр.


    constructor(data) {
        this.variant = "address"

        if (data.address.search === undefined && data.address.street === undefined) throw "Отсутствует обязательный параметр address."
        this.address = new Address(data.address)

        this.time = new Time(data.time)

        this.produceDate = data.produceDate || undefined
        this.handling = data.handling || undefined
        this.requirements = data.requirements || undefined
    }
}
