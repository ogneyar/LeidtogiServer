


module.exports = class ReferencesOpfList { // Поиск ОПФ
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    
    // ------------------------
    // НЕобязательные параметры
    // ------------------------

    search // этого в оригинальном API нет (пример: "Частное лицо")

    
    constructor(params) {
        this.method = "v1/references/opf_list.json"
        this.appkey = process.env.DL_APPKEY

        this.search = params.search || undefined
    }
}
