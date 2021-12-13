

module.exports = class DeliveryCosts {
    
    token // Токен для доступа к api-сервисам
    method // метод DeliveryCosts
    
    weight // Вес посылки в граммах	

    // нужен один из параметров (или target или zip)
    target // Код пункта выдачи заказа
    zip // Почтовый индекс для курьерской доставки (в случае передачи zip - target игнорируется).

    // -------------------
    // необязательные поля
    // -------------------

    targetstart // Код пункта приема заказа
        // По умолчанию - данные беруться из настроек пользователя
    ordersum // Объявленная стоимость посылки (страховая стоимость)	
    deliverysum	// Заявленная стоимость доставки
    paysum // Сумма к оплате с получателя
    height // Высота коробки, см
    width // Ширина коробки, см
    depth // Глубина коробки, см
    sucrh // Расчет с учетом настроек установленных в ЛК ИМ
    cms // название CMS. Параметр предназначен для разработчиков CMS
    url // url сайта. Параметр предназначен для разработчиков CMS
    version // версия интеграции/модуля

    
    constructor(parameters) {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "DeliveryCosts"

        this.weight = parameters.weight

        this.target = parameters.target || undefined
        this.zip = parameters.zip || undefined

        this.targetstart = parameters.targetstart || undefined
        this.ordersum = parameters.ordersum || undefined
        this.deliverysum = parameters.deliverysum || undefined
        this.paysum = parameters.paysum || undefined
        this.height = parameters.height || undefined
        this.width = parameters.width || undefined
        this.depth = parameters.depth || undefined
        this.sucrh = parameters.sucrh || undefined
        this.cms = parameters.cms || undefined
        this.url = parameters.url || undefined
        this.version = parameters.version || undefined
    }
}
