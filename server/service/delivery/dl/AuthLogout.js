


module.exports = class AuthLogout { // Удаление сессии авторизации
    
    method 
    appkey // ключ для доступа к api-сервисам

    sessionID // ID сессии для запросов к данным Личного кабинета

    
    constructor(params) {
        this.method = "v3/auth/logout.json"
        this.appkey = process.env.DL_APPKEY

        if (params.sessionID === undefined) throw "Необходим обязательный параметр sessionID"
        this.sessionID = params.sessionID
    }
}
