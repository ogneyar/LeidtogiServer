const { Order } = require('../models/models')
const ApiError = require('../error/apiError')


class OrderController {

    async create(req, res, next) {
        try {
            // const {cart, email} = req.body
            const order = await Order.create(req.body)
            return res.json(order) 
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода create!'));
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