


module.exports = class CalculatorSf { // Калькулятор услуги доставка до адреса
    
    appkey // ключ для доступа к api-сервисам
    method // метод для доступа к api-сервисам
    
    // -------------------
    // обязательные поля
    // -------------------

    arrivalPoint // Код КЛАДР пункта прибытия груза. Может быть указан код КЛАДР города или улицы.
    docSQLUid // UID накладной. Для получения идентификатора накладной необходимо воспользоваться методом "Журнал заказов"
    calculateDate // Дата прибытия груза

    // --------------------
    // НЕ обязательные поля
    // --------------------

    sessionID // ID сессии, требуется для учета индивидуальных скидок
    arrivalHouse // Номер дома
    arrivalPeriodVisit // Период времени доставки груза
    arrivalServices // UID дополнительных услуг для доставки груза до адреса.
    arrivalFixedTimeVisit // Фиксированное время доставки груза. Игнорируется, если период времени забора (параметр "arrivalPeriodVisit") больше 30 минут.
    arrivalUnLoading // Заказ разгрузки ТС. Содержит дополнительные параметры, необходимые для расчета погрузо-разгрузочных работ
    requester

    
    constructor(parameters) {
        this.appkey = process.env.DL_APPKEY
        this.method = "v1/public/calculator_sf.json"

        if (parameters.arrivalPoint === undefined) throw "Отсутствует обязательный параметр arrivalPoint."
        this.arrivalPoint = parameters.arrivalPoint

        if (parameters.docSQLUid === undefined) throw "Отсутствует обязательный параметр docSQLUid."
        this.docSQLUid = parameters.docSQLUid

        if (parameters.calculateDate === undefined) throw "Отсутствует обязательный параметр calculateDate."
        this.calculateDate = parameters.calculateDate

        this.sessionID = parameters.sessionID || undefined
        this.arrivalHouse = parameters.arrivalHouse || undefined
        this.arrivalPeriodVisit = parameters.arrivalPeriodVisit || undefined
        this.arrivalServices = parameters.arrivalServices || undefined
        this.arrivalFixedTimeVisit = parameters.arrivalFixedTimeVisit || undefined
        this.arrivalUnLoading = parameters.arrivalUnLoading || undefined
        this.requester = parameters.requester || 1
    }
}
