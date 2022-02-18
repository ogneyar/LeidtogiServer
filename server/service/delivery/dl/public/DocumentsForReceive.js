


module.exports = class DocumentsForReceive { // Документы для получения груза
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/documents_for_receive.json"
        this.appkey = process.env.DL_APPKEY
    }
}
