//

module.exports = class RequestConditions { // Поиск населённых пунктов
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    blocks // 
    
    derivalPoint
    arrivalPoint
    volume
    weight
    deliveryType

    // -------------------
    // необязательные поля
    // -------------------
    
    derivalTerminalID //
    arrivalTerminalID // 
    
    derivalDoor // от двери?
    arrivalDoor // до двери?

    
    constructor(parameters) {
        this.method = "v1/public/request_conditions.json"
        this.appkey = process.env.DL_APPKEY

        this.blocks = parameters.blocks || [ "day_to_day", "packages", "loadings", "insurance" ]

        if (parameters.derivalPoint === undefined) throw "Отсутствует обязательный параметр derivalPoint."
        this.derivalPoint = parameters.derivalPoint // "5000003200000000000000000" - г.Котельники

        if (parameters.arrivalPoint === undefined) throw "Отсутствует обязательный параметр arrivalPoint."
        this.arrivalPoint = parameters.arrivalPoint

        this.volume = parameters.volume || 1
        this.weight = parameters.weight || 5
        this.deliveryType = parameters.deliveryType || 1


        this.derivalTerminalID = parameters.derivalTerminalID || undefined
        this.arrivalTerminalID = parameters.arrivalTerminalID || undefined

        this.derivalDoor = parameters.derivalDoor || true
        this.arrivalDoor = parameters.arrivalDoor || true
    }
}
