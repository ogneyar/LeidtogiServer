
module.exports = class Service {
    code
    
    // необязательные поля
    parameter = undefined // Параметр дополнительной услуги:
    // количество для услуг PACKAGE_1, COURIER_PACKAGE_A2, SECURE_PACKAGE_A2, SECURE_PACKAGE_A3, SECURE_PACKAGE_A4, SECURE_PACKAGE_A5, CARTON_BOX_XS, CARTON_BOX_S, CARTON_BOX_M, CARTON_BOX_L, CARTON_BOX_500GR, CARTON_BOX_1KG, Фото документовCARTON_BOX_2KG, CARTON_BOX_3KG, CARTON_BOX_5KG, CARTON_BOX_10KG, CARTON_BOX_15KG, CARTON_BOX_20KG, CARTON_BOX_30KG, CARTON_FILLER (для всех типов заказа)
    // объявленная стоимость заказа для услуги INSURANCE (только для заказов с типом "доставка")
    // длина для услуг BUBBLE_WRAP, WASTE_PAPER (для всех типов заказа)
    // номер телефона для услуги SMS
    
    constructor(data) {
        this.code = data.code
        if (data.parameter !== undefined) this.parameter = data.parameter
    }
}
