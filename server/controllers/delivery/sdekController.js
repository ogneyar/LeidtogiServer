const axios  = require("axios")
const https = require("https")
const pdfreader = require("pdfreader")
const fs = require('fs')
const path = require('path')

const { Delivery } = require('../../models/models')
const Sdek = require("../../service/delivery/sdek/Sdek")


class SdekController {

    async calculate(req, res) {

        return res.json(await Sdek.calculateByTariff(req.body))
    }

    
    async newOrder(req, res) {
        const {id} = req.params
        let response = await Sdek.newOrder(req.body) 
        if (!response) return res.json({error:"Отсутствует ответ от сервера"})
        if (response.error !== undefined) return res.json(response)
        let requests = response.requests || undefined
        if (!requests) return res.json({error:"В ответе сервера отсутствует поле requests."})

        if (Array.isArray(requests) && requests[0].state !== 'ACCEPTED') {
            return res.json(requests[0])
        }

        let uuid = response.entity.uuid // идентификатор заказа
        let delivery
        try{
            delivery = await Delivery.create({
                name:"sdek",
                uuid,
                userId: id
            })
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:"Не смог создать запись в таблице deliveries"})

        return res.json(delivery)
    }


    async getOrder(req, res) {
        const {order_id} = req.params
        let delivery
        try{
            delivery = await Delivery.findOne({where:{
                id: order_id
             }})
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})

        return res.json(await Sdek.getOrder(delivery.uuid))
    }

    
    async editOrder(req, res) {
        const {order_id} = req.params
        let delivery
        try{
            delivery = await Delivery.findOne({where:{
                id: order_id
             }})
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})

        return res.json(await Sdek.editOrder(delivery.uuid ,req.body))
    }
    
    async deleteOrder(req, res) {
        const {order_id} = req.params
        let delivery
        try{
            delivery = await Delivery.findOne({where:{
                id: order_id
             }})
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})

        let response = await Sdek.deleteOrder(delivery.uuid)

        if (response.requests && response.requests[0].state === "INVALID") {
            return res.json({errors:response.requests[0].errors})
        }

        try{
            await Delivery.destroy({where:{
                id: order_id
             }})
        }catch(error) {
            console.log(error);
            // return res.json({error})
        }

        return res.json(response)
    }
    
    async refusalOrder(req, res) {
        const {order_id} = req.params
        let delivery
        try{
            delivery = await Delivery.findOne({where:{
                id: order_id
             }})
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})
        
        return res.json(await Sdek.refusalOrder(delivery.uuid))
    }
    

    async newIntakes(req, res) {
        const {order_id} = req.params
        let delivery
        try{
            delivery = await Delivery.findOne({where:{
                id: order_id
             }})
        }catch(error) {
            return res.json({error})
        }
        if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})
        
        return res.json(await Sdek.newIntakes({order_uuid:delivery.uuid, ...req.body}))
    }
    

    async printOrders(req, res) {
        let body = req.body // пример: { orders: [ 1, 2, 3 ] }
        // в body.orders массив [ 1, 3, 6, ... ] необходимо преобразовать в массив [ {order_uuid:...}, {order_uuid:...}, ...  ] 
        // достав данные из таблицы deliveries
        let orders = body.orders
        let delivery 
        let array_order_uuid = []
        try{
            if (orders && Array.isArray(orders)) {
                orders.forEach(async(i, index) => {
                    // console.log("i:",i)                
                    delivery = await Delivery.findOne({
                        where:{ id: i }
                    })
                    if (delivery) array_order_uuid[index] = {order_uuid:delivery.uuid}
                })
                // console.log("delivery:",delivery)
            }
            // console.log("orders:",orders[0])
        }catch(error) {
            return res.json({error})
        }
        // if (!delivery) return res.json({error:`В базе данных нет заказа с номером ${order_id}`})
        return res.json(await Sdek.printOrders({...req.body, orders:array_order_uuid}))
    }

    async getPrintOrders(req, res) {
        const {uuid} = req.params
        // 72753031-5181-4889-865a-6d94fb13a6e5
        return res.send(await Sdek.getPrintOrders(uuid))
    }
    

    async test(req, res) {

        return res.send("Какой-то ответ...")  
    }


}

module.exports = new SdekController()