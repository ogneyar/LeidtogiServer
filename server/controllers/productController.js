const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')


class ProductController {
    async create(req, res, next) { 
       try {
        let {name, price, brandId, categoryId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({name, price, brandId, categoryId, img: fileName})

        if (info) {
            let inf = JSON.parse(info)
            inf.forEach(i => ProductInfo.create({
                title: i.title,
                description: i.description,
                productId: product.id 
            }))
        }

        return res.json(product)
       }catch (e) {
           return next(ApiError.badRequest(e.message))
       }
    }

    async getAll(req, res) {
        let {brandId, categoryId, limit, page} = req.query
        page = Number(page) || 1
        limit = Number(limit) || 8
        // categoryId = Number(categoryId)
        // brandId = Number(brandId)

        let offset = page * limit - limit
        let products;
        if (!brandId && !categoryId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !categoryId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && categoryId) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (brandId && categoryId) {
            products = await Product.findAndCountAll({where:{brandId, categoryId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
        })
        return res.json(product)
    }

    async delete(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id}
        })        
      
        try {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', product.img))
        }catch(e) {
            console.log("Удаляемый файл не найден.");
        }
        

        await ProductInfo.destroy({
            where: {productId: id}
        })
        const response = await Product.destroy({
            where: {id}
        })
        return res.json(response)
    }

    async edit(req, res) {
        const {id} = req.params
        const body = req.body
        const response = await Product.update(body, {
            where: { id }
        })
        return res.json(response) // return boolean
    }

    async editRating(req, res) {
        const {id} = req.params
        const {rate} = req.body
        const response = await Product.update({rate}, {
            where: { id }
        })
        return res.json(response) // return boolean
    }

}

module.exports = new ProductController()