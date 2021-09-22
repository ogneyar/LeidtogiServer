
module.exports = class Threshold {
    threshold
    sum
    vat_sum = undefined // необязательное поле (сумма НДС)
    vat_rate = undefined // необязательное поле (ставка НДС)
    
    constructor(data) {
        this.threshold = data.threshold
        this.sum = data.sum
        if (data.vat_sum !== undefined) this.vat_sum = data.vat_sum
        if (data.vat_rate !== undefined) this.vat_rate = data.vat_rate
    }
}
