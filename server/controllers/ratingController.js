const { Rating } = require('../models/models')
const ApiError = require('../error/apiError')


class RatingController {
    
    async create(req, res) {
        try {
            const body = req.body
            const rating = await Rating.create(body)
            return res.json([rating]) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода create!'));
        }
    }

    async getAll(req, res) { // рейтинг по одному товару
        try {
            const {productId} = req.params 
            const ratings = await Rating.findAll({
                where: { productId }
            })
            return res.json(ratings) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода getAll!'));
        }
    }

    async getOne(req, res) { // рейтинг по одному товару одного клиента
        try {
            const {productId, userId} = req.query 
            const ratings = await Rating.findOne({
                where: { productId, userId }
            })
            return res.json(ratings) // return Object
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода getOne!'));
        }
    }

    async delete(req, res) {
        try {
            const {userId,productId} = req.body
            const rating = await Rating.destroy({
                where: { userId, productId }
            })
            return res.json(rating) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода delete!'));
        }
    }
    
    async edit(req, res) {
        try {
            const {userId,productId,rate} = req.body
            const rating = await Rating.update({rate}, {
                where: { userId, productId }
            })
            return res.json(rating) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода edit!'));
        }
    }

}

module.exports = new RatingController()