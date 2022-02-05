const axios  = require("axios")

const Auth = require('./Auth')
const Calculator = require('./Calculator')
const Micro_calc = require('./Micro_calc')
const Kladr = require("./Kladr")
const Terminals = require("./Terminals")
const SearchTerminals = require("./SearchTerminals")
const Places = require("./Places")
const Streets = require("./Streets")
const LoadTypes = require("./LoadTypes")
const Servises = require("./Servises")
const RequestConditions = require("./RequestConditions")


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

    // 
    static async calculator(parameters) { // Калькулятор стоимости и сроков перевозки
        // console.log("DL calculator RUN");
       
        // new Calculator({
        //     delivery: {
        //         derival: {
        //             address: {
        //                 street: "5000003200000000000000000"
        //             },
        //             produceDate: "2022-02-09"
        //         },
        //         arrival: {
        //             address: {
        //                 street: "6100500010300010000000000"
        //             }
        //         }
        //     },
        //     cargo: {}
        // })

        let response = await this.curl(
            new Calculator(parameters)
        )

        return response
    }

    static async microCalc(parameters) { // Калькулятор ориентировочной стоимости и сроков заказа
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

    static async kladr(parameters) { // Поиск населённых пунктов
        // console.log("DL kladr RUN");

        let { q, cityID, code, limit } = parameters
        
        if (!q && !cityID && !code) return { error: "Не задан ни один из трёх параметров (q, cityID, code)" }
        
        let response = await this.curl(
            new Kladr(parameters)
        )
        
        if (response.cities !== undefined) return response.cities // массив городов

        return response
    }

    static async terminals() { // Справочник терминалов
        // console.log("DL terminals RUN");

        let response = await this.curl(
            new Terminals()
        )
        
        return response
    }
    
    static async terminalsCatalog(parameters) { // Справочник терминалов
        // console.log("DL terminals RUN");

        if (!parameters.url) return { error: "Не передан url." }

        let response

        let headers = {'content-type': 'application/json;charset=utf-8'}

        let options = { 
            url: parameters.url,
            method: "get", 
            headers
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

        if (response.city !== undefined) return response.city
        
        return response
    }
    
    // Справочник терминалов
    static async searchTerminals(parameters) { 
        // console.log("DL terminals RUN");

        if (!parameters.code && !parameters.cityID) return { error: "Не передан КЛАДР или cityID" }
        
        let response = await this.curl(
            new SearchTerminals(parameters)
        )

        if (response.terminals !== undefined) return response.terminals

        return response
    }
    
    // Справочник населённых пунктов
    static async places() { 
        // console.log("DL places RUN");
        
        let response = await this.curl(
            new Places()
        )

        if (response.url !== undefined) return response.url

        return response
    }
    
    // Справочник улиц
    static async streets() { 
        // console.log("DL streets RUN");
        
        let response = await this.curl(
            new Streets()
        )

        if (response.url !== undefined) return response.url

        return response
    }
    
    // Справочник видов загрузки
    static async loadTypes() { 
        // console.log("DL loadTypes RUN");
        
        let response = await this.curl(
            new LoadTypes()
        )
        
        return response
    }
    
    // Справочник специальных требований к транспорту
    static async servises() { 
        // console.log("DL servises RUN");
        
        let response = await this.curl(
            new Servises()
        )
        
        return response
    }
    
    // Ограничения по параметрам заказа
    static async requestConditions(parameters) { 
        // console.log("DL requestConditions RUN");
        
        let response = await this.curl(
            new RequestConditions(parameters)
        )
        
        return response
    }


}