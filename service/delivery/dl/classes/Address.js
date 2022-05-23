

module.exports = class Address {
   
    search // Адрес в виде произвольной строки. Минимум 2 символа, максимум - 1024 (2)
    // или
    street // Код КЛАДР улицы (см. "Поиск КЛАДР") (2)
    
    // -------------------
    // НЕ обязательные поля
    // -------------------

    house // Номер дома, включая литеру. Например, "13/А" (2). Максимум 7 символов
    building // Корпус (2). Максимум 5 символов
    structure // Строение (2). Максимум 7 символов
    flat // Номер квартиры/офиса. Допускается написание с буквой, например "222 А" (2). Максимум 5 символов

    /*
    **  Примечания:
    **    1) Обязательно должен быть передан адрес - в виде произвольное строки ("search") 
    **          или набора параметров (в этом случае обязательными являются параметры "street" и "house"). 
    **    2) Передача параметра "search" исключает передачу параметров "street", "house", "building", "structure" и "flat"
    */
    constructor(data) {
        this.search = data.search || undefined
        this.street = data.street || undefined

        this.house = data.house || undefined
        this.building = data.building || undefined
        this.structure = data.structure || undefined
        this.flat = data.flat || undefined
    }
}
