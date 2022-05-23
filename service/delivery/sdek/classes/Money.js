
module.exports = class Money {
    value 
    vat_sum = undefined // необязательное поле (сумма НДС)
    vat_rate = undefined // необязательное поле (ставка НДС)

    constructor(data) {
        this.value = data.value

        if (data.vat_sum !== undefined) this.vat_sum = data.vat_sum
        if (data.vat_rate !== undefined) this.vat_rate = data.vat_rate
    }
}

