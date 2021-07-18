const {Category} = require('../models/models')
const ApiError = require('../error/apiError')

class CategoryController {
    async create(req, res) {
        // const {name} = req.body
        // const category = await Category.create({name})
        const body = req.body
        const category = await Category.create(body)
        return res.json(category)
    }

    // async getCategories(req, res) {
    //     const categories = await Category.findAll({
    //         where: {sub_category_id: 0}
    //     })
    //     return res.json(categories)
    // }

    async getAll(req, res) {        
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getCategories(req, res) {
        const {sub_id} = req.params
        const categories = await Category.findAll({
            where: {sub_category_id: sub_id}
        })
        return res.json(categories)
    }

    async delete(req, res) {
        const {id} = req.params
        const category = await Category.destroy({
            where: {id}
        })
        return res.json(category)
    }

    async edit(req, res) {
        const {id} = req.params
        const {name} = req.body
        const category = await Category.update({ name }, {
            where: { id }
        })
        return res.json(category)
    }



}

module.exports = new CategoryController()