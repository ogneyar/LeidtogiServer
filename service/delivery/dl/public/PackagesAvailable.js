


module.exports = class PackagesAvailable { // Список доступных упаковок при заданных параметрах
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    arrivalPoint // Код КЛАДР пункта отправки груза
    derivalPoint // Код КЛАДР пункта прибытия груза
    length // Длина груза, м
    width // Ширина груза, м
    height // Высота груза, м
    weight // Вес груза, кг
    quantity // Количество грузовых мест, шт.


    constructor(parameters) {
        this.method = "v1/public/packages_available.json"
        this.appkey = process.env.DL_APPKEY

        if (parameters.arrivalPoint === undefined) throw "Необходим обязательный параметр arrivalPoint."
        this.arrivalPoint = parameters.arrivalPoint

        if (parameters.derivalPoint === undefined) throw "Необходим обязательный параметр derivalPoint."
        this.derivalPoint = parameters.derivalPoint

        if (parameters.length === undefined) throw "Необходим обязательный параметр length."
        this.length = parameters.length

        if (parameters.width === undefined) throw "Необходим обязательный параметр width."
        this.width = parameters.width

        if (parameters.height === undefined) throw "Необходим обязательный параметр height."
        this.height = parameters.height

        if (parameters.weight === undefined) throw "Необходим обязательный параметр weight."
        this.weight = parameters.weight

        if (parameters.quantity === undefined) throw "Необходим обязательный параметр quantity."
        this.quantity = parameters.quantity
    }
}
