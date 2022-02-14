


module.exports = class AuthLogin { // Авторизация пользователя
    
    method // метод для доступа к api-сервисам
    appkey // ключ для доступа к api-сервисам
    login // логин для доступа к api-сервисам
    password // пароль для доступа к api-сервисам

    
    constructor() {
        this.method = "v3/auth/login.json"
        this.appkey = process.env.DL_APPKEY
        this.login = process.env.DL_LOGIN
        this.password = process.env.DL_PASSWORD
    }
}
