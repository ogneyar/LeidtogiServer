const axios  = require("axios")
const qs = require('qs')
const Calculator = require("./Calculator")
const Order = require("./Order")
const EditOrder = require("./EditOrder")
const Intakes = require("./Intakes")


module.exports = class Sdek {
    
    // static url = "https://api.edu.cdek.ru/v2/"
    static url = process.env.SDEK_URL
    static tariff_code = 139
    static token = undefined
    
    constructor() {
        // console.log("SDEK START");
    }

    static async curl(parameters) {
        // console.log("SDEK CURL RUN");

        let { method, type, data, url } = parameters
        if (!method) method = "get"
        if (!type) type = "json"
        let response

        let host = await this.getHost(url)

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
                    // console.log("SDEK CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("SDEK CURL THROW: ",e);
            return { e }
        }
        // console.log("SDEK CURL RESPONSE: ",response);
        return response
    }

    // поиск хоста в url
    static async getHost(url) {
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

        return host
    }

    // запрос токена с сервера СДЭК
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
        if (!response) return {error:"Запрос oauth/token?parameters вернул пустой ответ."}
        if (response.error !== undefined) return response

        this.token = response.access_token

        // console.log("access_token:",response.access_token)

        return response.access_token
    }

    static async calculateByTariff(parameters) {
        // console.log("SDEK CALCULATOR RUN");
       
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
        // console.log("SDEK ORDER RUN");

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


    static async getOrder(uuid) {
        // console.log("SDEK GET_ORDER RUN");

        if (!uuid) return {error: "Отсутствует uuid"}
        
        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ url: this.url + "orders/" + uuid })

        if (response.requests && response.requests[0].state === "INVALID") {
            return {errors:response.requests[0].errors}
        }

        return response
    }
    

    static async editOrder(uuid, data) {
        // console.log("SDEK EDIT_ORDER RUN");

        if (!uuid) return {error: "Отсутствует uuid"}
        
        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "patch",
            url: this.url + "orders",
            data: new EditOrder({uuid, ...data})
        })

        if (response.requests && response.requests[0].state === "INVALID") {
            return {errors:response.requests[0].errors}
        }

        return response
    }
    
    static async deleteOrder(uuid) {
        // console.log("SDEK DELETE_ORDER RUN");

        if (!uuid) return {error: "Отсутствует uuid"}
        
        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "delete",
            url: this.url + "orders/" + uuid
        })

        if (response.requests && response.requests[0].state === "INVALID") {
            return {errors:response.requests[0].errors}
        }

        return response
    }
    
    static async refusalOrder(uuid) {
        // console.log("SDEK REFUSAL_ORDER RUN");

        if (!uuid) return {error: "Отсутствует uuid"}
        
        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "post",
            url: this.url + "orders/" + uuid + "/refusal"
        })

        if (response.requests && response.requests[0].state === "INVALID") {
            return {errors:response.requests[0].errors}
        }

        return response
    }


    static async newIntakes(parameters) {
        // console.log("SDEK NEW_INTAKES RUN");

       // три обязательных параметра + одно желательное (order_uuid)
       if (!parameters.order_uuid) return {error: "Отсутствует параметр order_uuid"}
       if (!parameters.intake_date) return {error: "Отсутствует параметр intake_date"}
       if (!parameters.intake_time_from) return {error: "Отсутствует параметр intake_time_from"}
       if (!parameters.intake_time_to) return {error: "Отсутствует параметр intake_time_to"}
        
        if (!this.token) {
            let token = await this.getToken()
            if (token.error !== undefined) return token
        }

        let response = await this.curl({ 
            method: "post",
            url: this.url + "intakes",
            data: new Intakes(parameters)
        })

        if (response.requests && response.requests[0].state === "INVALID") {
            return {errors:response.requests[0].errors}
        }

        return response
    }


}
