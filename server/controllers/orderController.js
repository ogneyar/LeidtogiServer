const axios = require('axios')
const qs = require('qs')

const { Order } = require('../models/models')
const ApiError = require('../error/apiError')


class OrderController {

    async create(req, res, next) {
        try {
            // const {uuid, cart, email} = req.body
            const order = await Order.create(req.body)
            return res.json(order) 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода create!'));
        }
    }

    async getOrder(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.findOne({
                where: { id }
            })
            if (order) {
                res.json(order) // return 
            }
            return res.json(null) // return 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getOrder!'));
        }
    }

    async test(req, res, next) {
        try {
            let response
            let token = "a3rd28arc978uabudoqr0c164h"
            let amount = 16000 
            let orderNumber = "0029"
            let returnUrl = "https://web.rbsuat.com/ab/finish.html"
            let orderBundle = { 
                "cartItems": { 
                    "items": [ 
                        {
                            "positionId": "1", 
                            "name": "Warm Grips", 
                            "quantity": { "value": 1.0, "measure": "штук" }, 
                            "itemAmount": 8000, 
                            "itemCode": "G-16",
                            "tax": {"taxType": 1,"taxSum": 111}, 
                            "itemPrice": 8000 
                        },
                        {
                            "positionId": "2", 
                            "name": "Warm Grips", 
                            "quantity": { "value": 1.0, "measure": "штук" }, 
                            "itemAmount": 8000, 
                            "itemCode": "G-16",
                            "tax": {"taxType": 1,"taxSum": 111}, 
                            "itemPrice": 8000 
                        }
                    ] 
                } 
            }

            let data = {
                token,
                amount,
                orderNumber,
                returnUrl,
                orderBundle: JSON.stringify(orderBundle)
            }

            let url = "https://web.rbsuat.com/ab/rest/register.do" + "?" + qs.stringify(data)

            let method = "post"
            let headers = {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}

            await axios({method, data, url, headers})
                .then(res => response = res.data)
            
            return res.json(response) // return 
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода test!'));
        }
    }

    // async getAll(req, res, next) {
    //     try {
    //         const brands = await Brand.findAll()
    //         return res.json(brands) // return array
    //     }catch(e) {
    //         return next(ApiError.badRequest('Ошибка метода getAll!'));
    //     }
    // }

    // async delete(req, res, next) {
    //     try {
    //         const {id} = req.params
    //         const brand = await Brand.destroy({
    //             where: {id}
    //         })
    //         return res.json(brand) // return boolean
    //     }catch(e) {
    //         return next(ApiError.badRequest('Ошибка метода delete!'));
    //     }
    // }
    
    // async edit(req, res, next) {
    //     try {
    //         const {id} = req.params
    //         const body = req.body
    //         const brand = await Brand.update(body, {
    //             where: { id }
    //         })
    //         return res.json(brand) // return boolean
    //     }catch(e) {
    //         return next(ApiError.badRequest('Ошибка метода edit!'));
    //     }
    // }


}

module.exports = new OrderController()