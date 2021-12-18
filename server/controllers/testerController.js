const path = require('path')
const fs = require('fs')

const {Product, Brand} = require('../models/models')


class TesterController {
    
    async setFeed(req, res, next) {
        try {
            const products = await Product.findAll()
            const brands = await Brand.findAll()

            const xml = `<yml_catalog>
    <offers>${products.map(i => {
        let brandName = brands
            .filter(j => j.id === i.brandId)
            .map(k => k.name.toLowerCase())
            .join("")
        return (`
        <offer id="${i.article}" available="${i.have === 1 ? "true" : "false"}">
            <name>${i.name}</name>
            <url>https://leidtogi.ru/${brandName}/${i.url}</url>
            <picture>https://server.leidtogi.ru/${JSON.parse(i.img)[0].big}</picture>
            <price>${i.price}</price>
            <currencyId>RUB</currencyId>
            <categoryId>${i.categoryId}</categoryId>
            <pickup>true</pickup>
            <delivery>true</delivery>
            <manufacturer_warranty>true</manufacturer_warranty>
            <country_of_origin>${i.country}</country_of_origin>
        </offer>`)
    }).join("")}
    </offers>
</yml_catalog>`

            fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'feed', 'yml.xml'), xml)
            
            return res.json(true)
        }catch(e) {
            return  res.json({error:'Ошибка метода setFeed!'})
        }
    }

    async getFeed (req, res, next) {
        try {
            const response = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'feed', 'yml.xml'))
            return res.json(response)
        }catch(e) {
            return  res.json({error:'Ошибка метода getFeed!'})
        }
    }

}

module.exports = new TesterController()