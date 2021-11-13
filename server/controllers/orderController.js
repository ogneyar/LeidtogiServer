const axios = require('axios')
const qs = require('qs')

const { Order } = require('../models/models')
const ApiError = require('../error/apiError')
const AlfaBank = require('../service/payment/AlfaBank')


class OrderController {

    async create(req, res, next) {
        try {
            const body = req.body

            if (!body) return res.json({error: "Отсутствует тело запроса"}) 
            if (!body.cart) return res.json({error: "Отсутствует корзина в теле запроса"}) 
            if (!body.uuid) return res.json({error: "Отсутствует uuid в теле запроса"}) 
            if (!body.email) return res.json({error: "Отсутствует email в теле запроса"})
            if (!body.url) return res.json({error: "Отсутствует url в теле запроса"}) 
            let lastIndex
            let items = JSON.parse(body.cart).map((item, index) => {
                lastIndex = index + 1
                return {
                    positionId: lastIndex,
                    name: item.name,
                    quantity: { value: item.value, measure: "штук" },
                    itemCode: item.article,
                    tax: { taxType: 6 }, 
                    itemPrice: item.price * 100 // перевод в копейки
                }
            })
            if (body.deliverySum !== undefined) {
                items = [ ...items, {
                    positionId: lastIndex + 1,
                    name: "Доставка",
                    quantity: { value: 1, measure: "штук" },
                    itemCode: "0001",
                    tax: { taxType: 6 }, 
                    itemPrice: body.deliverySum * 100 // перевод в копейки
                }]
            }
            let cart = JSON.stringify(items)
            let uuid = body.uuid
            let email = body.email
            let url = body.url
            
            let create = { cart, uuid, email }
            // client - user_id
            if (body.client !== undefined) create = {...create, client: body.client}
            if (body.phone !== undefined) create = {...create, phone: body.phone}
            if (body.role !== undefined) create = {...create, role: body.role}
            if (body.address !== undefined) create = {...create, address: body.address}
            if (body.delivery !== undefined) create = {...create, delivery: body.delivery} 

            const order = await Order.create(create)

            if (!order.id) return res.json({error: "Отсутствует номер заказа (order.id) в ответе от БД"}) 
            let orderNumber = order.id

            let returnUrl = url + "success/" + uuid + "/" + orderNumber

            let failUrl = url + "error"

            let orderBundle = {
                customerDetails: { email },
                cartItems: { items }
            }

            let data = {
                orderNumber,
                returnUrl,
                failUrl,
                orderBundle
            }

            if (body.description) data = {...data, description: body.description}
            if (body.sessionTimeoutSecs) data = {...data, sessionTimeoutSecs: body.sessionTimeoutSecs}

            let response = await AlfaBank.register(data)

            return res.json(response) // return 

        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода create! ' + "Error: " + e.message));
        }
    }

    async getOrder(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.findOne({
                where: { id }
            })
            if (order) {
                return res.json(order) // return 
            }
            return res.json(null) // return 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getOrder! ' + "Error: " + e.message));
        }
    }
    
    async setPay(req, res, next) {
        try {
            const { uuid } = req.params
            const order = await Order.update({pay:true},{
                where: { uuid }
            })
            if (order) {
                return res.json(order) // return 
            }
            return res.json(null) // return 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода setPay! ' + "Error: " + e.message));
        }
    }

    async test(req, res, next) {
        try {
            return res.json("response") // return 
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода test! ' + "Error: " + e.message));
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