const axios  = require("axios")

const Auth = require('./Auth')
const Calculator = require('./Calculator')
const Micro_calc = require('./Micro_calc')


module.exports = class Dl {
    
    static url = process.env.DL_URL
    
    constructor() {
        // console.log("DL START");
    }

    static async curl(data) {
        // console.log("DL CURL RUN");

        let response

        let headers = {'content-type': 'application/json;charset=utf-8'}

        let options = { 
            url: this.url + data.method,
            method: "post", 
            headers,
            data
        }

        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("DL CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("DL CURL THROW: ",e);
            return { error:e }
        }
        // console.log("DL CURL RESPONSE: ",response);
        return response
    }

    static async auth() { //  Авторизация
        // console.log("DL auth RUN");
       
        let response = await this.curl(
            new Auth()
        )

        return response
    }

    // НЕ РАБОТАЕТ
    static async calculator(parameters) { // Калькулятор стоимости и сроков перевозки
        // console.log("DL calculator RUN");
       
        let response = await this.curl(
            new Calculator(parameters)
        )

        return response
    }

    static async micro_calc(parameters) { // Калькулятор ориентировочной стоимости и сроков заказа
        // console.log("DL micro_calc RUN");

        let { arrival_city, derival_city, sessionID } = parameters
        
        if (!arrival_city) return { error: "Не задан arrival_city" }
        if (!derival_city) return { error: "Не задан derival_city" }

        let response = await this.curl(
            new Micro_calc({
                derival: {
                    city: derival_city
                },
                arrival: {
                    city: arrival_city
                },
                sessionID
            })
        )

        return response
    }


}