const Location = require("./classes/Location")
const Contact = require("./classes/Contact")


module.exports = class Intakes {

    intake_date // Дата ожидания курьера (date (yyyy-MM-dd))
        // Дата ожидания курьера не может быть больше текущей более чем на 1 год.
        // Заявка, созданная на текущую дату после 15:00 по времени отправителя, может быть выполнена на следующий день

    intake_time_from // Время начала ожидания курьера (время в формате ISO 8601: hh:mm)
        // Не ранее 9:00 местного времени
    
    intake_time_to // Время окончания ожидания курьера (время в формате ISO 8601: hh:mm)
        // Не позднее 22:00 местного времени

    // необязательное поле, но желательное
    order_uuid = undefined // Идентификатор заказа в ИС СДЭК

    // -------------------
    // необязательные поля
    // -------------------


    cdek_number = undefined // Номер заказа СДЭК
    lunch_time_from = undefined // Время начала обеда, должно входить в диапазон [intake_time_from; intake_time_to]
        // (время в формате ISO 8601: hh:mm)
    lunch_time_to = undefined // Время окончания обеда, должно входить в диапазон [intake_time_from; intake_time_to]
        // (время в формате ISO 8601: hh:mm)

    name = undefined // Описание груза
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
    weight = undefined // Общий вес (в граммах)
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
    length = undefined // Габариты упаковки. Длина (в сантиметрах)
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
    width = undefined // Габариты упаковки. Ширина (в сантиметрах)
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
    height = undefined // Габариты упаковки. Высота (в сантиметрах)
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
    comment = undefined // Комментарий к заявке для курьера

    sender = undefined // Отправитель
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
        // объект класса Contact 

    from_location = undefined // Адрес отправителя (забора)
        // Необходимо заполнять, если не передан номер заказа. Иначе значение берется из заказа.
        // объект класса Location

    need_call = false // Необходим прозвон отправителя (по умолчанию - false)


    
    constructor(parameters) {

        this.intake_date = parameters.intake_date
        this.intake_time_from = parameters.intake_time_from
        this.intake_time_to = parameters.intake_time_to

        this.order_uuid = parameters.order_uuid || undefined
        this.cdek_number = parameters.cdek_number || undefined

        this.lunch_time_from = parameters.lunch_time_from || undefined

        this.lunch_time_to = parameters.lunch_time_to || undefined

        this.name = parameters.name || undefined
        this.weight = parameters.weight || undefined
        this.length = parameters.length || undefined
        this.width = parameters.width || undefined
        this.height = parameters.height || undefined
        this.comment = parameters.comment || undefined

        this.sender = parameters.sender ? new Contact(parameters.sender) : undefined
        this.from_location = parameters.from_location ? new Location(parameters.from_location) : undefined

        this.need_call = parameters.need_call || undefined

    }
}