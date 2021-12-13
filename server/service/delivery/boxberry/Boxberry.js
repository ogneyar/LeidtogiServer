const axios  = require("axios")
const qs = require('qs')

const DeliveryCosts = require('./DeliveryCosts')
const ListCities = require('./ListCities')
const ListCitiesFull = require('./ListCitiesFull')
const ListPoints = require('./ListPoints')
const ListZips = require('./ListZips')
const ZipCheck = require('./ZipCheck')


module.exports = class Boxberry {
    
    static url = process.env.BOXBERRY_URL
    // static token = process.env.BOXBERRY_TOKEN
    
    constructor() {
        // console.log("BOXBERRY START");
    }

    static async curl(data) {
        // console.log("BOXBERRY CURL RUN");

        let response

        let options = { 
            method: "get", 
            url: this.url + "?" + qs.stringify(data) 
        }

        try {
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("BOXBERRY CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("BOXBERRY CURL THROW: ",e);
            return { error:e }
        }
        // console.log("BOXBERRY CURL RESPONSE: ",response);
        return response
    }

    static async deliveryCosts(parameters) { //  Расчет стоимости доставки
        // console.log("BOXBERRY DeliveryCosts RUN");
       
        // два обязательных параметра
        if (!parameters.weight) return {error: "Отсутствует объект weight"}
        if (!parameters.target && !parameters.zip) return {error: "Отсутствует объект target и zip"}

        let response = await this.curl(
            new DeliveryCosts(parameters)
        )

        return response
    }

    static async listCities(parameters) { //  Список городов доставки
        // console.log("BOXBERRY listCities RUN");
       
        // нет обязательных параметров

        let response = await this.curl(
            new ListCities(parameters)
        )

        return response
    }

    static async listCitiesFull(parameters) { //  Список городов доставки (полный)
        // console.log("BOXBERRY listCitiesFull RUN");
       
        // нет обязательных параметров

        let response = await this.curl(
            new ListCitiesFull(parameters)
        )

        return response
    }

    static async listPoints(parameters) { //  Список ПВЗ
        // console.log("BOXBERRY listPoints RUN");
       
        // нет обязательных параметров

        let response = await this.curl(
            new ListPoints(parameters)
        )

        return response
    }

    static async listZips() { //  Список почтовых индексов для КД
        // console.log("BOXBERRY listZips RUN");
       
        // нет параметров

        let response = await this.curl(
            new ListZips()
        )

        return response
    }

    static async zipCheck(parameters) { //  Проверка почтового индекса для КД
        // console.log("BOXBERRY zipCheck RUN");
       
        // один обязательный параметр
        if (!parameters.zip) return {error: "Отсутствует параметр zip"}

        let response = await this.curl(
            new ZipCheck(parameters)
        )

        return response
    }

}