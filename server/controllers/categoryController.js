const {Category} = require('../models/models')
const ApiError = require('../error/apiError')


class CategoryController {

    async create(req, res) {
        try {
            const body = req.body
            const category = await Category.create(body)
            return res.json([category]) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода create!'));
        }
    }
    
    async getAll(req, res) {
        try {
            const categories = await Category.findAll()
            return res.json(categories) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода getAll!'));
        }
    }

    async getCategories(req, res) {
        try {
            const {sub_id} = req.params
            const categories = await Category.findAll({
                where: {sub_category_id: sub_id}
            })
            return res.json(categories) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода getCategories!'));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const category = await Category.destroy({
                where: {id}
            })
            return res.json(category) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода delete!'));
        }
    }

    async edit(req, res) {
        try {
            const {id} = req.params
            const body = req.body
            const category = await Category.update(body, {
                where: { id }
            })
            return res.json(category) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода edit!'));
        }
    }

}

module.exports = new CategoryController()