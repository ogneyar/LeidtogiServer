const { ProductInfo } = require('../models/models')


class ProductInfoController {

    async getAll(req, res, next) { // все имеющиеся записи в БД
        try {
            return res.json(await ProductInfo.findAll())
        }catch(e) {
            return res.json({error:'Ошибка метода getAll!'})
        }
    }

    async getAllOneProduct(req, res, next) { // все записи одного товара
        try {
            const { id } = req.params
            const info = await ProductInfo.findAll({
                where: {ProductId: id}
            })
            return res.json(info)
        }catch(e) {
            return res.json({error:'Ошибка метода getAllOneProduct!'})
        }
    }

    async getOne(req, res, next) { // одна конкретная запись
        try {
            const { id } = req.params
            let { title } = req.query
            if (!title) title = "description"
            const info = await ProductInfo.findOne({
                where: {ProductId: id, title}
            })
            return res.json(info)
        }catch(e) {
            return res.json({error:'Ошибка метода getOne!'})
        }
    }
    
    async edit(req, res, next) {
        try {
            let response = false
            const { productId } = req.params
            let body = req.body

            if (body.title === undefined) return res.json({error:'Ошибка метода edit! Отсутствуют необходимые параметры!'})

            let productInfo = await ProductInfo.findOne({
                where: { productId, title: body.title }
            })

            if ( ! body.body ) {
                if (productInfo) response = await ProductInfo.destroy({
                    where: { productId, title: body.title }
                })
            }else if (productInfo) {
                response = await ProductInfo.update({ body: body.body }, {
                    where: { productId, title: body.title }
                })
            }else {
                response = await ProductInfo.create({
                    title: body.title,
                    body: body.body,
                    productId 
                })
            }
            return res.json(response) // return boolean
        }catch(e) {
            return res.json({error:'Ошибка метода edit!'})
        }
    }

}

module.exports = new ProductInfoController()