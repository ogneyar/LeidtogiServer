const { Rating } = require('../models/models')


class RatingController {
    async create(req, res) {
        const body = req.body
        const rating = await Rating.create(body)
        return res.json([rating]) // return array
    }

    async getAll(req, res) { // рейтинг по одному товару
        const {productId} = req.params 
        const ratings = await Rating.findAll({
            where: { productId }
        })
        return res.json(ratings) // return array
    }

    async getOne(req, res) { // рейтинг по одному товару одного клиента
        const {productId, userId} = req.query 
        const ratings = await Rating.findOne({
            where: { productId, userId }
        })
        return res.json(ratings) // return Object
    }

    async delete(req, res) {
        const {userId,productId} = req.body
        const rating = await Rating.destroy({
            where: { userId, productId }
        })
        return res.json(rating) // return boolean
    }
    
    async edit(req, res) {
        const {userId,productId,rate} = req.body
        const rating = await Rating.update({rate}, {
            where: { userId, productId }
        })
        return res.json(rating) // return boolean
    }


}

module.exports = new RatingController()