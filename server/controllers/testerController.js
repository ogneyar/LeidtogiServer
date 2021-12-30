const path = require('path')
const fs = require('fs')

const {Product, Brand, Category} = require('../models/models')
const Sdek = require("../service/delivery/sdek/Sdek")


class TesterController {
    
    async setFeed(req, res, next) {
        try {
            const products = await Product.findAll()
            const brands = await Brand.findAll()
            const categories = await Category.findAll()

            let date = new Date().toISOString()
            let formatDate = date.substring(0, date.indexOf("."))
            // <name>${i.name.include(/"/g,"&quot;").include(/&/g,"&amp;").include(/>/g,"&gt;").include(/</g,"&lt;").include(/'/g,"&apos;")}</name>

            const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<yml_catalog date="${formatDate}">
    <shop>
        <name>ЛЕИДТОГИ</name>
        <company>ООО &quot;ЛЕИДТОГИ&quot;</company>
        <url>https://leidtogi.ru</url>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories>${categories.map(i => {
            if (i.sub_category_id === 0) {
            return (`
            <category id="${i.id}">${i.name}</category>`)
            }
            return (`
            <category id="${i.id}" parentId="${i.sub_category_id}">${i.name}</category>`)
        }).join("")}
        </categories>
        <offers>${products.map(i => {
            let brandName = brands
                .filter(j => j.id === i.brandId)
                .map(k => k.name.toLowerCase())
                .join("")
            let name = i.name
                .replace(/"/g,"&quot;")
                .replace(/&/g,"&amp;")
                .replace(/>/g,"&gt;")
                .replace(/</g,"&lt;")
                .replace(/'/g,"&apos;")
            return (`
            <offer id="${i.article}" available="${i.have === 1 ? "true" : "false"}">
                <name>${name}</name>
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
    </shop>
</yml_catalog>`

            fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'feed', 'yml.xml'), xml)

            return res.json(true)
        }catch(e) {
            return  res.json({error:'Ошибка метода setFeed!'})
        }
    }

    // async getFeed (req, res, next) {
    //     try {
    //         const response = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'feed', 'yml.xml'))
    //         return res.json(response)
    //     }catch(e) {
    //         return  res.json({error:'Ошибка метода getFeed!'})
    //     }
    // }

    async locationCitiesSdek (req, res, next) {
        try {
            let array, response
            response = await Sdek.locationSities(req.query)
            
            if (response.length > 1) {
                
                if (req.query.page !== undefined && req.query.page != 0) {
                    array = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'deliveries', 'sdek', 'locationCities.json'))
                    
                    array = JSON.parse(array)
                    
                    if (Array.isArray(array) && array.length > 1) {
                        response = [ ...array, ...response ]
                    }
                }
                
                fs.writeFile(path.resolve(__dirname, '..', 'static', 'deliveries', 'sdek', 'locationCities.json'), JSON.stringify(response), (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    //файл записан успешно
                    console.log("успех")
                  })

                return res.json(response.length)
            }

            return res.json(response)
        }catch(e) {
            return  res.json({error:'Ошибка метода locationCitiesSdek!'})
        }
    }

}

module.exports = new TesterController()