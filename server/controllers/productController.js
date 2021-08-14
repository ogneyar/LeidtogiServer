const {Product, ProductInfo, ProductSize} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')


class ProductController {
    async create(req, res, next) { 
       try {
        let {name, price, brandId, categoryId, info, have, article, description, promo, country, size} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({name, price, have, article, description, promo, country, brandId, categoryId, img: fileName})

        if (info) {
            let inf = JSON.parse(info)
            inf.forEach(i => ProductInfo.create({
                title: i.title,
                description: i.description,
                productId: product.id 
            }))
        }

        if (size) {
            let s = JSON.parse(size)
            ProductSize.create({
                weight: s.weight,
                volume: s.volume,
                width: s.width,
                height: s.height,
                length: s.length,
                productId: product.id 
            })
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
        if (limit === -1) {
            products = await Product.findAll()
        }else {
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
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{model: ProductInfo, as: 'info'},{model: ProductSize, as: 'size'}]
        })
        return res.json(product)
    }

    async getInfo(req, res) {
        const {id} = req.params
        const info = await ProductInfo.findAll({
            where: {ProductId: id}
        })
        return res.json(info)
    }

    async getSize(req, res) {
        const {id} = req.params
        const size = await ProductSize.findAll({
            where: {ProductId: id}
        })
        return res.json(size)
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
        await ProductSize.destroy({
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

    async editAll(req, res) {
        console.log("log");
        const {id} = req.params        
        const product = await Product.findOne({
            where: {id}
        })
        const deleteOldImage = product.img
        try {
            let {name, price, brandId, categoryId, info, have, article, description, promo, country, size} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const product = await Product.update(
                {name, price, have, article, description, promo, country, brandId, categoryId, img: fileName}, 
                {where: { id }}
            )
    
            await ProductInfo.destroy({
                where: {productId: id}
            })

            if (info) {
                let inf = JSON.parse(info)
                inf.forEach(i => ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: id 
                }))
            } 
    
            if (size) {
                let s = JSON.parse(size)
                let yes = await ProductSize.findOne({
                    where: {productId: id}
                })
                if (yes)  {
                    ProductSize.update({
                        weight: s.weight,
                        volume: s.volume,
                        width: s.width,
                        height: s.height,
                        length: s.length
                    }, {where: { productId: id }})
                }else {                    
                    ProductSize.create({
                        weight: s.weight,
                        volume: s.volume,
                        width: s.width,
                        height: s.height,
                        length: s.length,
                        productId: id
                    })
                }
            }else {
                ProductSize.destroy({
                    where: {productId: id}
                })
            }       

            try {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteOldImage))
            }catch(e) {
                console.log("Удаляемый файл не найден.");
                return res.json(product)
            }
    
            return res.json(product)

        }catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async editRating(req, res) {
        const {id} = req.params
        const {rating} = req.body
        const response = await Product.update({rating}, {
            where: { id }
        })
        return res.json(response) // return boolean
    }

}

module.exports = new ProductController()