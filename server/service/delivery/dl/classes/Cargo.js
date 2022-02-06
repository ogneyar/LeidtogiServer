

module.exports = class Cargo { // Информация о грузе
    
    length // Длина самого длинного грузового места, м
    width // Ширина самого широкого грузового места, м.
    height // Высота самого высокого грузового места, м.
    totalVolume // не более 79 м.куб
    totalWeight // при общем весе от 100 кг необходимо указывать oversizedWeight и oversizedVolume

    // -------------------
    // необязательные поля
    // -------------------

    quantity // Количество грузовых мест, шт.
    weight // Вес самого тяжелого грузового места, кг. // *Параметр является обязательным, если количество грузовых мест больше одного 
    oversizedWeight // Вес негабаритных грузовых мест, кг
    oversizedVolume // Объём негабаритных грузовых мест, м3
    

    constructor(data) {
        if ( ! data ) data = {}
        if (typeof(data) === "string") data = JSON.parse(data)
        
        this.length = data.length || 1
        this.width = data.width || 1
        this.height = data.height || 1
        this.totalVolume = data.totalVolume || 1
        this.totalWeight = data.totalWeight || 5

        this.quantity = data.quantity || 1
        this.weight = data.weight || undefined

        if (Number(this.totalWeight) >= 100) {
            this.oversizedWeight = this.totalWeight
            this.oversizedVolume = this.totalVolume
        }else {
            this.oversizedWeight = data.oversizedWeight || undefined
            this.oversizedVolume = data.oversizedVolume || undefined
        }
    }
}
