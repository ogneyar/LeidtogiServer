const {Brand} = require('../models/models')
const ApiError = require('../error/apiError')


class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json([brand]) // return array
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands) // return array
    }

    async delete(req, res) {
        const {id} = req.params
        const brand = await Brand.destroy({
            where: {id}
        })
        return res.json(brand) // return boolean
    }
    
    async edit(req, res) {
        const {id} = req.params
        const body = req.body
        const brand = await Brand.update(body, {
            where: { id }
        })
        return res.json(brand) // return boolean
    }


}

module.exports = new BrandController()