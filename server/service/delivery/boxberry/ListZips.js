
module.exports = class ListZips {
    
    token // Токен для доступа к api-сервисам
    method // метод ListZips
       
    constructor() {
        this.token = process.env.BOXBERRY_TOKEN
        this.method = "ListZips"
    }
}
