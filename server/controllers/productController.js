const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')


class ProductController {
    async create(req, res, next) { 
       try {
        let {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({name, price, brandId, typeId, img: fileName})

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
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where:{brandId, typeId}, limit, offset})
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

}

module.exports = new ProductController()