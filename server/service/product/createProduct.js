const {Product, ProductInfo, ProductSize} = require('../../models/models')


async function createProduct(name, price, have, article, promo, country, brandId, categoryId, files, info, size) {

    const oldProduct = await Product.findOne({
        where: {article}
    })
    if (oldProduct) {
        await Product.destroy({
            where: {article}
        })
        await ProductInfo.destroy({
            where: {productId: oldProduct.id}
        })
        await ProductSize.destroy({
            where: {productId: oldProduct.id}
        })
    }

    const product = await Product.create({name, price, have, article, promo, country, brandId, categoryId, img: files})

    if (info) {
        let inf = JSON.parse(info)
        if (Array.isArray(inf)) {
            for (let i = 0; i < inf.length; i++) {
                ProductInfo.create({
                    title: inf[i].title,
                    body: inf[i].body,
                    productId: product.id 
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
            ProductSize.create({
                weight: s.weight || 0,
                volume: s.volume || 0,
                width: s.width || 0,
                height: s.height || 0,
                length: s.length || 0,
                productId: product.id 
            })
        }
    }
    
    return product
}


module.exports = createProduct