
module.exports = class Seller {
    address // Адрес истинного продавца. Используется при печати инвойсов для отображения адреса настоящего продавца товара, либо торгового названия.
        // Только для международных заказов "интернет-магазин"
    
    // необязательные поля
    inn = undefined // ИНН истинного продавца
        // Может содержать 10, либо 12 символов
    name = undefined // Наименование истинного продавца, если заполнен inn
    phone = undefined // Телефон истинного продавца (string), если заполнен inn
    ownership_form = undefined // Код формы собственности, если заполнен inn


    constructor(data) {
        if (data.name !== undefined) this.name = data.name
        if (data.inn !== undefined)  this.inn = data.inn
        if (data.phone !== undefined) this.phone = data.phone
        if (data.ownership_form !== undefined) this.ownership_form = data.ownership_form
        if (data.address !== undefined) this.address = data.address
    }
}

