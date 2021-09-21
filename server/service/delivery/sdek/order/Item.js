const Money = require("./Money")

module.exports = class Item {

    name // Наименование товара (может также содержать описание товара: размер, цвет)
    ware_key // Идентификатор/артикул товара
        // Артикул товара может содержать только символы: [A-z А-я 0-9 ! @ " # № $ ; % ^ : & ? * () _ - + = ? < > , .{ } [ ] \ / , пробел]
    payment // объект класса Money
        // Оплата за товар при получении (за единицу товара в валюте страны получателя, значение >=0) — наложенный платеж, в случае предоплаты значение = 0
    cost // Объявленная стоимость товара (за единицу товара в валюте взаиморасчетов, значение >=0). С данного значения рассчитывается страховка
    weight // Вес (за единицу товара, в граммах)
    amount // Количество единиц товара (в штуках) 
        // Количество одного товара в заказе может быть от 1 до 999
    
        
    // необязательные поля
    marking = undefined // Маркировка товара
    // Если для товара/вложения указана маркировка, Amount не может быть больше 1
    weight_gross = undefined // Вес брутто, обязателен, если заказ - международный
    name_i18n = undefined // Наименование на иностранном языке
    brand = undefined // Бренд на иностранном языке
    country_code = undefined // Код страны производителя товара в формате  ISO_3166-1_alpha-2
    material = undefined // Код материала
    wifi_gsm = undefined // Содержит wifi/gsm (boolean)
    url = undefined // Ссылка на сайт интернет-магазина с описанием товара


    constructor(data) {
        this.name = data.name
        this.ware_key = data.ware_key
        if (data.marking !== undefined) this.marking = data.marking
        this.payment = new Money(data.payment)
        this.cost = data.cost
        this.weight = data.weight
        if (data.weight_gross !== undefined) this.weight_gross = data.weight_gross
        this.amount = data.amount
        if (data.name_i18n !== undefined) this.name_i18n = data.name_i18n
        if (data.brand !== undefined) this.brand = data.brand
        if (data.country_code !== undefined) this.country_code = data.country_code
        if (data.material !== undefined) this.material = data.material
        if (data.wifi_gsm !== undefined)  this.wifi_gsm = data.wifi_gsm
        if (data.url !== undefined) this.url = data.url
    }
}
