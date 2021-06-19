const {Brand} = require('../models/models')
const ApiError = require('../error/apiError')


class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
        const {id} = req.params
        const brands = await Brand.destroy({
            where: {id}
        })
        return res.json(brands)
    }

}

module.exports = new BrandController()