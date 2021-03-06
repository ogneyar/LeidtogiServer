const axios = require('axios')
const { v4 } = require('uuid')
const qs = require('qs')
const Math = require('mathjs')

const { Order } = require('../models/models')
const ApiError = require('../error/apiError')
const AlfaBank = require('../service/payment/AlfaBank')
const sendMessage = require('../service/telegram/sendMessage')


class OrderController {

    async create(req, res, next) {
        try {
            let body = req.body //|| req.query
            if (body === undefined) return res.json({error: "Отсутствует тело запроса"}) 
            if (body.cart === undefined) return res.json({error: "Отсутствует корзина в теле запроса"}) 
            if (body.email === undefined) return res.json({error: "Отсутствует email в теле запроса"})
            if (body.url === undefined) return res.json({error: "Отсутствует url в теле запроса"})
            let lastIndex
					
            let items = JSON.parse(body.cart).map((item, index) => {
                lastIndex = index + 1
                return {
                    positionId: lastIndex,
                    name: item.name,
                    quantity: { value: item.value, measure: "штук" },
                    itemCode: item.article,
                    tax: { taxType: 6 }, 
                    itemPrice: Math.round(item.price * 100) // перевод в копейки
                }
            })
            if (body.deliverySum !== undefined) {
                items = [ ...items, {
                    positionId: lastIndex + 1,
                    name: "Доставка",
                    quantity: { value: 1, measure: "штук" },
                    itemCode: "0001",
                    tax: { taxType: 6 }, 
                    itemPrice: Math.round(body.deliverySum * 100) // перевод в копейки
                }]
            }
			
            let cart = JSON.stringify(items)
            let uuid = v4()
            let email = body.email
            let url = body.url

            let create = { cart, uuid, email }
            // client - user_id
            if (body.client !== undefined) create = {...create, client: body.client}
            if (body.phone !== undefined) create = {...create, phone: body.phone}
            if (body.role !== undefined) create = {...create, role: body.role}
            if (body.address !== undefined) create = {...create, address: body.address}
            if (body.delivery !== undefined) create = {...create, delivery: body.delivery} 
            if (body.name !== undefined) create = {...create, name: body.name} 
            if (body.trackNumber !== undefined) create = {...create, trackNumber: body.trackNumber} 

            const order = await Order.create(create)

            if (!order.id) return res.json({error: "Отсутствует номер заказа (order.id) в ответе от БД"}) 
            let orderNumber = order.id

            let returnUrl = url + "success?uuid=" + uuid + "&id=" + orderNumber

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

    // 
    async getAll(req, res, next) {
        try {
            const orders = await Order.findAll()
            return res.json(orders) // return array
        }catch(e) {
            return next(res.json({error:'Ошибка метода getAll! ' + e}))
        }
    }

    //
    async editOrder(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body
            const order = await Order.update(body, {
                where: { id }
            })
            return res.json(order) // return 
        }catch(e) {
            return next(res.json({error:'Ошибка метода editOrder! ' + e}))
        }
    }

    //
    async setTaken(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.update({ state: "taken"}, {
                where: { id }
            })
            return res.json(order) // return 
        }catch(e) {
            return next(res.json({error:'Ошибка метода setTaken! ' + e}))
        }
    }

    //
    async getOrdersForUser(req, res, next) {
        try {
            const { user_id } = req.params
            const order = await Order.findAll({
                where: { client: user_id }
            })
            if (order) {
                return res.json(order) // return 
            }
            return res.json(null) // return 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getOrdersForUser! ' + "Error: " + e.message));
        }
    
    }

    //
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
                const data = await Order.findOne({
                    where: { uuid }
                })
                if (data && data.id !== undefined) {
                    let id = `Оплата заказа №${data.id} произведена.\n\n`
                    let name = ""
                    if (data.name !== undefined && data.name !== null) {
                        name = `Имя клиента ${data.name}\n\n`
                    }
                    let email = ""
                    if (data.email !== undefined && data.email !== null) {
                        email = `Email клиента ${data.email}\n\n`
                    }
                    let phone = ""
                    if (data.phone !== undefined && data.phone !== null) {
                        phone = data.phone.toString().replace('7', '8')
                        phone = `Телефон клиента ${phone}\n\n`
                    }
                    let delivery = ""
                    if (data.delivery !== undefined && data.delivery !== null) {
                        delivery = `Доставка: ${data.delivery === "pickup" ? "самовывоз" : data.delivery}\n\n`
                    }
                    let address = ""
                    if (data.address !== undefined && data.address !== null) {
                        address = `Адрес доставки: ${data.address}\n\n`
                    }
                    let cart = ""
                    if (data.cart !== undefined && data.cart !== null) {
                        if (Array.isArray(data.cart)) {
                            cart = data.cart
                        }else {
                            cart = JSON.parse(data.cart)
                        }
                        cart = `Корзина: \n${cart.map(i => {
                            return "Артикул: " + i.itemCode + ". Наименование: " + i.name + " - " + i.quantity.value + ` шт. (Цена за штуку - ${i.itemPrice/100}р.) - ` + i.quantity.value * i.itemPrice/100 + "р.\n"
                        })}\n\n`
                    }
                    let response = await sendMessage(id + name + email + phone + delivery + address + cart)
                    if (response.ok !== undefined && response.ok === true) return res.json(order) // return 
                    else {
                        sendMessage("Ошибка, не смог отправить сообщение об успешном заказе")
                        return res.json({error: "Ошибка, не смог отправить сообщение об успешном заказе"})
                    }
                }
                // await убрал, так как мне не нужен ответ от сервера
                sendMessage("Ошибка, не найден заказ с uuid = " + uuid)
                return res.json({error: "Ошибка, не найден заказ с uuid = " + uuid}) // return 
            }
            sendMessage("Ошибка, не смог обновить заказ с uuid = " + uuid)
            return res.json({error: "Ошибка, не смог обновить заказ с uuid = " + uuid}) // return 

        }catch(e) {
            // sendMessage("Ошибка метода setPay!")
            sendMessage("Ошибка метода setPay! Error: " + e.message)
            return next(ApiError.badRequest("Ошибка метода setPay! Error: " + e.message));
        }
    }

    async test(req, res, next) {
        try {
            return res.json("response") // return 
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода test! ' + "Error: " + e.message));
        }
    }

    

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
    


}

module.exports = new OrderController()