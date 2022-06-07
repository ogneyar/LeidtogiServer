const path = require('path')
const fs = require('fs')
const axios = require('axios')

const {Product, Brand, Category} = require('../models/models')
const Sdek = require("../service/delivery/sdek/Sdek")
const Dl = require("../service/delivery/dl/Dl")
const translit = require('../service/translit')


class TesterController {
    
    async setFeed(req, res, next) {
        try {
            let products = await Product.findAll()
            const brands = await Brand.findAll()
            const categories = await Category.findAll()
            
            let errors = []

            products = products.filter(i => {
                let img                    
                try {
                    img = JSON.parse(i.img)
                }catch(e) {
                    errors.push(i.article)
                }
                if (img && Array.isArray(img) && img[0].big !== undefined) {
                    if ( ! i.request && i.price > 0 ) return true
                }
                return false                
            })

            // return res.json({
            //     length: products.length,
            //     errors
            // })

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
                .replace(/&/g,"&amp;")
                .replace(/"/g,"&quot;")
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
                <country_of_origin>${i.country || "Китай"}</country_of_origin>
            </offer>`)
        }).join("")}
        </offers>
    </shop>
</yml_catalog>`

            fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'feed', 'yml.xml'), xml)

            return res.json(true)
        }catch(e) {
            return  res.json({ error: `Ошибка метода setFeed! (${e})` })
        }
    }

    // временный роут для исправления JSON объекта поля img
    // и удаления лишних фотографий товара
    // п.с. нет ничего более постоянного, чем временное...
    async temp (req, res, next) {  
        try {
            let products = await Product.findAll()
            
            let errors = []

            products.forEach(i => {
                try {
                    JSON.parse(i.img)
                }catch(e) {

                    let lastIndex = i.img.lastIndexOf(",{")
                    let img = i.img.substring(0, lastIndex) + "]"

                    img = JSON.parse(img)

                    img = img.filter((j,idx) => idx < 4)

                    let files = fs.readdirSync(path.resolve(__dirname, "..", "static", `tmk`, i.article, "big"))

                    files.forEach(j => {
                        let yes = null // удалять файл?
                        img.forEach((k,index) => {
                            if (`tmk/${i.article}/big/${j}` === k.big) yes = false
                            if (index === 3 && yes !== false) yes = true
                        })
                        if (yes) {
                            try {
                                fs.unlinkSync(path.resolve(__dirname, "..", "static", `tmk`, i.article, "big", j))
                                console.log(`Удалил BIG файл ${j}.`)
                                fs.unlinkSync(path.resolve(__dirname, "..", "static", `tmk`, i.article, "small", j))
                                console.log(`Удалил SMALL файл ${j}.`)
                            }catch(e) {
                                console.log(`Удаляемый файл ${j} не найден.`)
                            }
                        }
                    })

                    img = JSON.stringify(img)
                           
                    Product.update({img}, {
                        where: { id: i.id }
                    }).then(() => console.log(`Обновил товар с артикулом ${i.article}.`))

                    errors.push(i.article) 
                }             
            })

            return res.json(errors)

        }catch(e) {
            return  res.json({error:'Ошибка метода temp!'})
        }
    }

    // 
    async setLocationCitiesSdek (req, res, next) {
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

    //
    async setPlacesDl (req, res, next) {
        try {
            let array, response
            response = await Dl.places()
            
            if (response.errors === undefined) {

                let { data } = await axios.get(response)

                if (data) {

                    if (!fs.existsSync(path.resolve(__dirname, '..', 'static', 'deliveries'))){
                        try {
                            fs.mkdirSync(path.resolve(__dirname, '..', 'static', 'deliveries'))
                        }catch(e) {
                            console.log(`Создать папку static/deliveries не удалось.`)
                            return res.json({error:'Создать папку static/deliveries не удалось.'})
                        }
                    }
                    if (!fs.existsSync(path.resolve(__dirname, '..', 'static', 'deliveries', 'dl'))){
                        try {
                            fs.mkdirSync(path.resolve(__dirname, '..', 'static', 'deliveries', 'dl'))
                        }catch(e) {
                            console.log(`Создать папку static/deliveries/dl не удалось.`)
                            return res.json({error:'Создать папку static/deliveries/dl не удалось.'})
                        }
                    }
                    fs.writeFile(path.resolve(__dirname, '..', 'static', 'deliveries', 'dl', 'places.csv'), data, (err) => {
                        if (err) {
                        console.error(err)
                        return
                        }
                        //файл записан успешно
                        console.log("успех")
                    })

                    return res.json(process.env.URL + "/deliveries/dl/places.csv")
                    
                }
            }

            return res.json(response)
        }catch(e) {
            return  res.json({error:'Ошибка метода placesDl!'})
        }
    }

}

module.exports = new TesterController()