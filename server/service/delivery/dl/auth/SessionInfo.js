


module.exports = class AuthSessionInfo { // Данные сессии
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии для запросов к данным Личного кабинета

    
    constructor(params) {
        this.method = "v3/auth/session_info.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Отсутствует обязательный параметр sessionID."
        this.sessionID = params.sessionID
    }
}
