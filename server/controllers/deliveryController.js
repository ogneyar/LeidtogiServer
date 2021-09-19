const axios  = require("axios")
const qs = require('qs')
// const { Delivery } = require('../models/models')


class DeliveryController {

    async sdek(req, res) {
        // let { article } = req.query  // milwaukee, 4933451439
        // const body = req.body

        // const response = await axios.post('https://api.edu.cdek.ru/v2/oauth/token?parameters', {params: {
        //     grant_type: "client_credentials",
        //     client_id: "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
        //     client_secret: "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
        // }})

        const url = "https://api.edu.cdek.ru/v2/oauth/token"
        let data = {
            "grant_type": "client_credentials",
            "client_id": "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
            "client_secret": "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
        }
        let headers = { 
            // 'Accept': '*/*', 
            'Content-Type': 'application/x-www-form-urlencoded', 
            // 'Content-Length': data.toString().length, 
            'Host': 'api.edu.cdek.ru', 
            // 'Authorization': 'Bearer token', 
            // 'User-Agent': 'PostmanRuntime/7.26.8', 
        }
        let method = 'POST'
        let response //= 
        try {
            // data = qs.stringify(data,{
            //     charset: 'utf-8',
            //     charsetSentinel: true
            // })
        }catch(e) {
            return res.json(e)
        }
        
        try {
            const options = { method, headers, data, url }
            await axios(options)
            .then(data => {
                response = data
            })
            .catch(error => {
                response = error
            })
            console.log("datadatadatadatadatadatadatadatadatadatadata")
        }catch(e) { 
            return res.json(e)
        }
        
        // const $authHost = axios.create({
        //     withCredentials: true,
        //     baseURL: url
        // })
        // const authInterceptor = config => {
        //     config.headers = { 
        //         'Accept': '*/*', 
        //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 
        //         // 'Host': 'api.edu.cdek.ru', 
        //         // 'Authorization': 'Bearer token', 
        //     }
        //     return config
        // }
        // $authHost.interceptors.request.use(authInterceptor)
        // await $authHost.post(url, {params:data})
        //     .then(data => response = data)
        //     .catch(error => response = error)


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