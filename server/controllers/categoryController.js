const {Category} = require('../models/models')
const ApiError = require('../error/apiError')

class CategoryController {
    async create(req, res) {
        const body = req.body
        const category = await Category.create(body)
        return res.json([category]) // return array
    }
    
    async getAll(req, res) {        
        const categories = await Category.findAll()
        return res.json(categories) // return array
    }

    async getCategories(req, res) {
        const {sub_id} = req.params
        const categories = await Category.findAll({
            where: {sub_category_id: sub_id}
        })
        return res.json(categories) // return array
    }

    async delete(req, res) {
        const {id} = req.params
        const category = await Category.destroy({
            where: {id}
        })
        return res.json(category) // return boolean
    }

    async edit(req, res) {
        const {id} = req.params
        const {name} = req.body
        const category = await Category.update({ name }, {
            where: { id }
        })
        return res.json([category]) // return array
    }



}

module.exports = new CategoryController()