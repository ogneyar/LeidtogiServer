


module.exports = class ReportParams { // Справочник параметров для статистического отчета
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    
    constructor() {
        this.method = "v1/public/report_params.json"
        this.appkey = process.env.DL_APPKEY
    }
}
