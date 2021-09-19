// const { Delivery } = require('../models/models')

const axios  = require("axios")
import qs from 'qs'


class DeliveryController {

    async sdek(req, res) {
        // let { article } = req.query  // milwaukee, 4933451439
        // const body = req.body

        // const response = await axios.post('https://api.edu.cdek.ru/v2/oauth/token?parameters', {params: {
        //     grant_type: "client_credentials",
        //     client_id: "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
        //     client_secret: "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
        // }})

        const url = "https://api.edu.cdek.ru/v2/oauth/token?parameters"
        const data = {
            grant_type: "client_credentials",
            client_id: "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
            client_secret: "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        };
        // axios(options);
        const response = await axios(options)


        return res.json(response) // return object
        
    }

    // async getAll(req, res) { // рейтинг по одному товару
    //     const {productId} = req.params 
    //     const ratings = await Rating.findAll({
    //         where: { productId }
    //     })
    //     return res.json(ratings) // return array
    // }

    // async getOne(req, res) { // рейтинг по одному товару одного клиента
    //     const {productId, userId} = req.query 
    //     const ratings = await Rating.findOne({
    //         where: { productId, userId }
    //     })
    //     return res.json(ratings) // return Object
    // }

    // async delete(req, res) {
    //     const {userId,productId} = req.body
    //     const rating = await Rating.destroy({
    //         where: { userId, productId }
    //     })
    //     return res.json(rating) // return boolean
    // }
    
    // async edit(req, res) {
    //     const {userId,productId,rate} = req.body
    //     const rating = await Rating.update({rate}, {
    //         where: { userId, productId }
    //     })
    //     return res.json(rating) // return boolean
    // }


}

module.exports = new DeliveryController()