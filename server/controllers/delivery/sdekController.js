const axios  = require("axios")
const qs = require('qs')
const Order = require("../../service/delivery/sdek/Order")
const Contact = require("../../service/delivery/sdek/classes/Contact")
const Sdek = require("../../service/delivery/sdek/Sdek")
const Phone = require("../../service/delivery/sdek/classes/Phone")
const Location = require("../../service/delivery/sdek/classes/Location")
const Package = require("../../service/delivery/sdek/classes/Package")
const Item = require("../../service/delivery/sdek/classes/Item")
const Money = require("../../service/delivery/sdek/classes/Money")


class SdekController {

    async calculate(req, res) {

        return res.json(await Sdek.calculateByTariff(req.body))
    }
    
    async newOrder(req, res) {

        return res.json(await Sdek.newOrder(req.body))
    }
    
    async test(req, res) {

        let url, data ,method, token, headers, response, options, requests, uuid, request_uuid
        
        response = await Sdek.newOrder({
            "recipient": {
                "name": "Тестер Петрович",
                "phones": [
                    {
                        "number": "+79998887766"
                    }
                ]
            },
            "from_location": {
                "postal_code": "101000",
                "address": "г.Москва, ул.Садовая, д.26"
            },
            "to_location": { 
                "postal_code": "347056",
                "address": "х.Западный, ул.Садовая, д.26"
            },
            "packages": [
                {
                    "number": "334445847", 
                    "weight": 3700,
                    "length": 10,
                    "width": 8,
                    "height": 6,
                    "items": [
                        {
                            "name": "Название товара",
                            "ware_key": "44552854655",
                            "payment": { 
                                "value": 0
                            },
                            "cost": 0,
                            "weight": 3700,
                            "amount": 1, 
                            "url": "leidtogi.ru"
                        }
                    ]
                }
            ]
        })

        requests = response.requests

        uuid = response.entity.uuid // идентификатор заказа

        return res.json(uuid)

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

module.exports = new SdekController()