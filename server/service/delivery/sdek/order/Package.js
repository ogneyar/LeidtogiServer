const Item = require("./Item")

module.exports = class Package {

    number // Номер упаковки (можно использовать порядковый номер упаковки заказа или номер заказа), уникален в пределах заказа
    weight // Общий вес (в граммах)
    length // длина упаковки (в сантиметрах)
    width // ширина упаковки (в сантиметрах)
    height // высота упаковки (в сантиметрах)
    items = [] // Позиции товаров в упаковке
        // Только для заказов "интернет-магазин"
        // Максимум 126 уникальных позиций в заказе
        // Общее количество товаров в заказе может быть от 1 до 10000

    // необязательные поля
    comment = undefined // Комментарий к упаковке
        // Обязательно и только для заказа типа "доставка"

    constructor(data) {
        this.number = data.number
        this.weight = data.weight
        this.length = data.length
        this.width = data.width
        this.height = data.height

        if (data.items !== undefined && Array.isArray(data.items)) {
            data.items.map((i,index) => {
                this.items[index] = new Item(i)
            })
        }

        if (data.comment !== undefined) this.comment = data.comment
    }
}
