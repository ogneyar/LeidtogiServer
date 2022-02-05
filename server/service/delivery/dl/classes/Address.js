

module.exports = class Address {
   
    search // "347056, Россия, Ростовская область, Белокалитвинский район, Западный х, Садовая улица, 26"
    // или
    street // "5000003200000000000000000" 

    constructor(data) {
        this.search = data.search || undefined
        this.street = data.street || undefined
    }
}
