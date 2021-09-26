const Phone = require("./Phone")

module.exports = class Contact {
    name
    phones = [] // массив класса Phones, Не более 10 номеров

    // необязательные поля
    company = undefined // Название компании
    passport_series = undefined // Серия паспорта
    passport_number = undefined // Номер паспорта
    passport_date_of_issue = undefined // Дата выдачи паспорта
    passport_organization = undefined // Орган выдачи паспорта
    tin = undefined // ИНН, Может содержать 10, либо 12 символов
    passport_date_of_birth = undefined // Дата рождения
    email = undefined // Эл. адрес, Должен соответствовать RFC 2822

    constructor(data) {
        this.name = data.name || undefined
        if (data.phones !== undefined && Array.isArray(data.phones)) {
            data.phones.map((i,index) => {
                this.phones[index] = new Phone(i)
            })
        }else this.phones = undefined

        if (data.company !== undefined) this.company = data.company
        if (data.passport_series !== undefined) this.passport_series = data.passport_series
        if (data.passport_number !== undefined) this.passport_number = data.passport_number
        if (data.passport_date_of_issue !== undefined) this.passport_date_of_issue = data.passport_date_of_issue
        if (data.passport_organization !== undefined) this.passport_organization = data.passport_organization
        if (data.tin !== undefined) this.tin = data.tin
        if (data.passport_date_of_birth !== undefined)  this.passport_date_of_birth = data.passport_date_of_birth
        if (data.email !== undefined) this.email = data.email
    }
}

