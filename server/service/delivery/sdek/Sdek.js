const axios  = require("axios")
const qs = require('qs')
const Calculator = require("./Calculator")
const Order = require("./Order")


module.exports = class Sdek {
    
    static url = "https://api.edu.cdek.ru/v2/"
    static tariff_code = 139
    static token = undefined
    
    constructor() {
        console.log("SDEK START");
    }

    static async curl(parameters) {
        console.log("SDEK CURL RUN");
        let { method, type, data, url } = parameters
        let response

        // поиск хоста в url
        let lengthString = url.length
        let serchString = `://`
        let lengthSerchString = serchString.length
        let number = url.indexOf(serchString)
        if (number === -1) return {error:`'Не найден '${serchString}' в '${url}'`}
        let host = url.substring(number + lengthSerchString, lengthString)
        lengthString = host.length
        serchString = `/`
        number = host.indexOf(serchString)
        if (number !== -1) host = host.substring(0, number)

        let headers = { host }
        if (type === "urlencoded") {
            headers = {...headers, 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
            if (data) data = qs.stringify(data)
        }else if (type === "json") {
            headers = {...headers, 'content-type': 'application/json;charset=utf-8'}
            if (this.token !== undefined) headers = {...headers, 'authorization': 'Bearer ' + this.token}
        }
        
        try {
            let options = { method, headers, data, url }
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    console.log("SDEK CURL ERROR: ",error);
                    return { error }
                })
        }catch(e) {  
            console.log("SDEK CURL THROW: ",e);
            return { e }
        }
        console.log("SDEK CURL RESPONSE: ",response);
        return response
    }

    static async getToken() {
        let response = await this.curl({ 
            method: "post", 
            type: "urlencoded", 
            url: this.url + "oauth/token?parameters", 
            data: {
                grant_type: "client_credentials",
                client_id: process.env.SDEK_CLIENT_ID,
                client_secret: process.env.SDEK_CLIENT_SECRET
            }
        })
        if (response.error !== undefined) return response

        this.token = response.access_token

        return response.access_token
    }

    static async calculateByTariff(parameters) {
        console.log("SDEK CALCULATOR RUN");
       
        // три обязательных параметра
        if (!parameters.from_location) return {error: "Отсутствует объект from_location"}
        if (!parameters.to_location) return {error: "Отсутствует объект to_location"}
        if (!parameters.packages) return {error: "Отсутствует объект packages"}

        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "post", 
            url: this.url + "calculator/tariff", 
            type: "json", 
            data: new Calculator(parameters)
        })

        return response
    }

    static async newOrder(parameters) {
        console.log("SDEK ORDER RUN");

        // четыре обязательных параметра
        if (!parameters.recipient) return {error: "Отсутствует объект recipient"}
        if (!parameters.from_location) return {error: "Отсутствует объект from_location"}
        if (!parameters.to_location) return {error: "Отсутствует объект to_location"}
        if (!parameters.packages) return {error: "Отсутствует объект packages"}

        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "post", 
            url: this.url + "orders", 
            type: "json", 
            data: new Order(parameters)
        })

        return response
    }

}
