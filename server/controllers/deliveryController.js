const axios  = require("axios")
const qs = require('qs')
const Order = require("../service/delivery/sdek/Order")
// const { Delivery } = require('../models/models')


class DeliveryController {

    async sdek(req, res) {

        let url, data ,method, token, headers, response, options, requests, uuid, request_uuid

        
        method = 'post'
        url = "https://api.edu.cdek.ru/v2/oauth/token?parameters"
        headers = { 
            'accept': '*/*', 
            'host': 'api.edu.cdek.ru',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
        data = {
            "grant_type": "client_credentials",
            "client_id": "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
            "client_secret": "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
        }
        data = qs.stringify(data)

        try {
            options = { method, headers, data, url }
            await axios(options)
                .then(data => {
                    token = data.data.access_token
                })
                .catch(error => {
                    return res.json(error)
                })
        }catch(e) {  
            return res.json(e)
        }
       
        // return res.json(token) // return string

        url = "https://api.edu.cdek.ru/v2/orders"
        headers = { 
            ...headers,
            'content-type': 'application/json;charset=utf-8',
            'authorization': 'Bearer ' + token, 
        }
       
        data = {
            tariff_code: 139,
            comment: "Тестовый заказ", // необязательное поле 
            // delivery_recipient_cost: { // необязательное поле
            //     value: 50
            // },
            // delivery_recipient_cost_adv: [ // необязательное поле
            //     {
            //         threshold: 200,
            //         sum: 3000
            //     } 
            // ],
            recipient: {
                name: "Тестер Петрович",
                phones: [
                    {
                        number: "+79998887766"
                    }
                ]
            },
            from_location: { // обязательное поле, если заказ с тарифом "от двери"
                postal_code: "101000", // необязательное поле
                address: "г.Москва, ул.Садовая, д.26"
            },
            to_location: { // обязательное поле, если заказ с тарифом "до двери"
                postal_code: "347056", // необязательное поле
                address: "х.Западный, ул.Садовая, д.26"
            },
            // services: [ // необязательное поле
            //     {
            //         code: "SMS", // стоимость услуги 10р
            //         parameter: "+79998887766"
            //     }
            // ],
            packages: [
                {
                    number: "334445847", // уникальный номер в пределах заказа 
                    weight: 3700, // общий вес в граммах
                    length: 10, // длина упаковки в сантиметрах
                    width: 8, // ширина упаковки в сантиметрах
                    height: 6, // высота упаковки в сантиметрах
                    items: [
                        {
                            name: "Название товара",
                            ware_key: "44552854655", // артикул
                            payment: { 
                                value: 0 // оплата за товар при получении — наложенный платеж, в случае предоплаты значение = 0
                            },
                            cost: 0, // объявленая стоимость товара, с данного значения рассчитывается страховка
                            weight: 3700,
                            amount: 1, // количество единиц товара в штуках, от 1 до 999
                            url: "leidtogi.ru" // необязательное поле
                        }
                    ]
                }
            ]
        }

        // return res.json(new Order(data)) // return string

        try {
            options = { method, headers, data, url }
            // options = { method, headers, data:new Order(data), url }
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    return res.json(error)
                })
        }catch(e) {  
            return res.json(e)
        }
        
        // return res.json(response) // return string

        requests = response.requests

        uuid = response.entity.uuid // идентификатор заказа

        // request_uuid = requests[0].request_uuid

        if (requests[0].state !== 'ACCEPTED') {
            return res.json(requests[0])
        }

        url = "https://api.edu.cdek.ru/v2/orders/" + uuid
        method = "get"
        try {
            options = { method, headers, url }
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    return res.json(error)
                })
        }catch(e) {  
            return res.json(e)
        }

        if (response.requests[0].state === "INVALID") {
            return res.json({errors:response.requests[0].errors})
        }


        return res.json(response) // return object
        
    }


}

module.exports = new DeliveryController()