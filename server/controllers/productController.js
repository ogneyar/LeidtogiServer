const {Product, ProductInfo, ProductSize, Brand} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const createFoldersAndDeleteOldFiles = require('../service/createFoldersAndDeleteOldFiles.js')
const createProduct = require('../service/product/createProduct.js')


class ProductController {

    async create(req, res, next) { 
        try {
            let {name, price, brandId, categoryId, have, article, promo, country, files, info, size} = req.body
            let imgBig, imgSmall, fileName
            if (req.files && req.files.img_big && req.files.img_small) {
                imgBig =req.files.img_big
                imgSmall =req.files.img_small
                const brand = await Brand.findOne({
                    where: {id:product.brandId}
                })
                fileName = uuid.v4() + '.jpg'
                
                createFoldersAndDeleteOldFiles(brand.name.toLowerCase(), article)

                imgBig.mv(path.resolve(__dirname, '..', 'static', brand.name.toLowerCase(), article, 'big', fileName))
                imgSmall.mv(path.resolve(__dirname, '..', 'static', brand.name.toLowerCase(), article, 'small', fileName))
                files = `[{"big": "${fileName}", "small": "${fileName}"}]`
            }else if (!files) {
                files = "[{}]"
            } 
            
            const product = await createProduct(name, price, have, article, promo, country, brandId, categoryId, files, info, size)

            return res.json(product)

        }catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {brandId, categoryId, limit, page} = req.query
            page = Number(page) || 1
            limit = Number(limit) || 8
    
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
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getAll!'));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findOne({
                where: {id},
                include: [{model: ProductInfo, as: 'info'},{model: ProductSize, as: 'size'}]
            })
            return res.json(product)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getOne!'));
        }
    }

    async getInfo(req, res, next) {
        try {
            const {id} = req.params
            const info = await ProductInfo.findAll({
                where: {ProductId: id}
            })
            return res.json(info) // return array
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getInfo!'));
        }
    }

    async getSize(req, res, next) {
        try {
            const {id} = req.params
            const size = await ProductSize.findOne({
                where: {ProductId: id}
            })
            return res.json(size)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getSize!'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findOne({
                where: {id}
            })
    
            const brand = await Brand.findOne({
                where: {id:product.brandId}
            })
          
            createFoldersAndDeleteOldFiles(brand.name.toLowerCase(), product.article)
    
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
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода delete!'));
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params
            const body = req.body
            const response = await Product.update(body, {
                where: { id }
            })
            return res.json(response) // return boolean
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода edit!'));
        }
    }

    async editSizes(req, res, next) {
        try {
            const {id} = req.params
            const {size} = req.body
            let response
    
            if (size) {
                let s = JSON.parse(size)
                if (s.weight || s.volume || s.width || s.height || s.length) {
                    if (s.weight !== 0) s.weight = s.weight.toString().replace(',', '.')
                    if (s.volume !== 0) s.volume = s.volume.toString().replace(',', '.')
                    if (s.width !== 0) s.width = s.width.toString().replace(',', '.')
                    if (s.height !== 0) s.height = s.height.toString().replace(',', '.')
                    if (s.length !== 0) s.length = s.length.toString().replace(',', '.')
                    let yes = await ProductSize.findOne({
                        where: {productId: id}
                    })
                    if (yes)  {
                        response = ProductSize.update({
                            weight: s.weight,
                            volume: s.volume,
                            width: s.width,
                            height: s.height,
                            length: s.length
                        }, {where: { productId: id }})
                    }else {
                        response = ProductSize.create({
                            weight: s.weight,
                            volume: s.volume,
                            width: s.width,
                            height: s.height,
                            length: s.length,
                            productId: id
                        })
                    }
                }else {
                    response = ProductSize.destroy({
                        where: {productId: id}
                    })
                }  
            }
    
            return res.json(response) // return boolean
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода editSizes!'));
        }
    }

    async editOnArticle(req, res, next) {
        try {
            const {article} = req.params
            const body = req.body
            const response = await Product.update(body, {
                where: { article }
            })
            return res.json(response) // return boolean
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода editOnArticle!'));
        }
    }

    async editAll(req, res, next) {
        const {id} = req.params
        try {
            let {name, price, brandId, categoryId, info, have, article, description, promo, country, size, equipment} = req.body

            let imgBig, imgSmall, fileName
            if (req.files && req.files.img_big && req.files.img_small) {
                imgBig =req.files.img_big
                imgSmall =req.files.img_small
            }
            let files
            if (imgBig && imgSmall) {
                const brand = await Brand.findOne({
                    where: {id:product.brandId}
                })
                fileName = uuid.v4() + '.jpg'

                createFoldersAndDeleteOldFiles(brand.name.toLowerCase(), article)

                imgBig.mv(path.resolve(__dirname, '..', 'static', brand.name.toLowerCase(), article, 'big', fileName))
                imgSmall.mv(path.resolve(__dirname, '..', 'static', brand.name.toLowerCase(), article, 'small', fileName))
                files = [{"big": fileName, "small": fileName}]
            }
            
            let product

            if (files) {
                product = await Product.update(
                    {name, price, have, article, description, promo, equipment, country, brandId, categoryId, img: JSON.stringify(files)}, 
                    {where: { id }}
                )
            }else {
                product = await Product.update(
                    {name, price, have, article, description, promo, equipment, country, brandId, categoryId}, 
                    {where: { id }}
                )
            }
    
            await ProductInfo.destroy({
                where: {productId: id}
            })

            if (info) {
                let inf = JSON.parse(info)
                if (Array.isArray(inf)) {
                    for (let i = 0; i < inf.length; i++) {
                        ProductInfo.create({
                            title: inf[i].title,
                            body: inf[i].body,
                            productId: id 
                        })
                    }
                }
            }
    
            if (size) {
                let s = JSON.parse(size)
                if (s.weight || s.volume || s.width || s.height || s.length) {
                    if (s.weight !== 0) s.weight = s.weight.toString().replace(',', '.')
                    if (s.volume !== 0) s.volume = s.volume.toString().replace(',', '.')
                    if (s.width !== 0) s.width = s.width.toString().replace(',', '.')
                    if (s.height !== 0) s.height = s.height.toString().replace(',', '.')
                    if (s.length !== 0) s.length = s.length.toString().replace(',', '.')
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
            }else {
                ProductSize.destroy({
                    where: {productId: id}
                })
            }  
    
            return res.json(product)

        }catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async editRating(req, res, next) { // для рейта отдельная функция из-за проверки роли юзера вместо администратора
        try {
            const {id} = req.params
            const {rating} = req.body
            const response = await Product.update({rating}, {
                where: { id }
            })
        return res.json(response) // return boolean
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода editRating!'));
        }
    }


    async temp(req, res, next) {
        try {
            
            // const products = await ProductSize.findAll({
            //     where: {productId: null}
            // })
    
            // await ProductSize.destroy({
            //     where: {productId: null}
            // })

            // return res.json(products)
            
            return res.json("temp")

        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода temp!'));
        }
    }

}

module.exports = new ProductController()