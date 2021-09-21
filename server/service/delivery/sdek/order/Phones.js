
module.exports = class Phones {
    number
    // необязательные поля
    additional = undefined // Дополнительная информация (добавочный номер)

    constructor(data) {
        this.number = data.number
        if (data.additional !== undefined) this.additional = data.additional
    }
}

