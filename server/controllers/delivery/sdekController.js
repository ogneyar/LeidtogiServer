const axios  = require("axios")

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
        if (!delivery) return res.json({error:"Отсутствует ответ от БД"})

        return res.json(await Sdek.getOrder(delivery.uuid))
    }

    
    async test(req, res) {

        let url, data ,method, token, headers, response, options, requests, uuid, request_uuid
        

        return res.json("response") 
    }


}

module.exports = new SdekController()