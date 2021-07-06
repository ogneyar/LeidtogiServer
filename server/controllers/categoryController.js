const {Category} = require('../models/models')
const ApiError = require('../error/apiError')

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const categoryes = await Category.findAll({
            where: {sub_category_id: 0}
        })
        return res.json(categoryes)
    }

    async getSubCategoryes(req, res) {
        const {id} = req.params
        const categoryes = await Category.findAll({
            where: {sub_category_id: id}
        })
        return res.json(categoryes)
    }

    async delete(req, res) {
        const {id} = req.params
        const category = await Category.destroy({
            where: {id}
        })
        return res.json(category)
    }

}

module.exports = new CategoryController()