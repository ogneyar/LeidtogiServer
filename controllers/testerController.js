const path = require('path')
const fs = require('fs')
const axios = require('axios')
const Math = require('mathjs')

const { Product, Brand, Category, ProductSize } = require('../models/models')
const Sdek = require("../service/delivery/sdek/Sdek")
const Dl = require("../service/delivery/dl/Dl")
const siteMap = require('../service/tester/siteMap')


class TesterController {
    
    async setFeed(req, res, next) {
        try {
            let products = await Product.findAll()
            const brands = await Brand.findAll()
            const categories = await Category.findAll()
            
            products = products.filter(i => {
                let img                    
                try {
                    img = JSON.parse(i.img)
                }catch(e) {}
                if (img && Array.isArray(img) && img[0].big !== undefined) { 
                    if ( ! i.request && i.price > 0 ) return true 
                }
                // если нет изображений
                // если "цена по запросу" или нет цены
                // тогда убираем из списка
                return false                
            })

            let formatDate = new Date().toISOString()
            // formatDate = formatDate.substring(0, formatDate.indexOf("."))
            formatDate = formatDate.substring(0, formatDate.lastIndexOf(":")) + "+00:00"
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


    async setSitemap(req, res, next) {
        try {
            let args
            if (req.query && req.query.routes !== undefined) args = req.query
            else args = req.body
            
            await siteMap(args)

            return res.json(true)
        }catch(e) {
            return next(res.json({ error: `Ошибка метода setSitemap! (${e})` }))
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
		
	
	async getLengthTor(req, res, next) {
        try {
            let products = await Product.findAll({
                where: {brandId: 13}
            })
			
            return res.json(products.length)

        }catch(e) {
            return  res.json({error:'Ошибка метода getLengthTor!'})
        }
    }
	
	
    async editWeightTor (req, res, next) {  
        try {			
			let response = ""
			let args = req.query
			
			if ( args.start === undefined || args.stop === undefined) return res.json({error: "Нет необходимых query параметров!"})
				
            let products = await Product.findAll({
                where: {brandId: 13}
            })
			
			let size = await ProductSize.findAll()
			
			for(let i = args.start; i <= args.stop; i++) {
				let weight = 0
				size.forEach(j => {
					if (j.productId === products[i].id) weight = j.weight
				})
				if (weight > 0) {					
					let newWeight = Math.round((weight / 1000)*100)/100
					
					ProductSize.update({weight:newWeight}, {
                        where: { productId: products[i].id }
                    }).then(() => console.log(`Обновил вес товара с артикулом ${products[i].article}. Был: ${weight}, стал: ${newWeight}. `))	

					response += `Обновил вес товара с артикулом ${products[i].article}. Был: ${weight}, стал: ${newWeight}. `
				}		
			}
            

            if (response) return res.json(response)
			else  return res.json(`С ${args.start} по ${args.stop} нет данных для обновления!`)

        }catch(e) {
            return  res.json({error:'Ошибка метода editWeightTor!'})
        }
    }
	
	
	// временный роут 
    // п.с. нет ничего более постоянного, чем временное...	
    async temp(req, res, next) {
        try {
            
            return res.json("temp")

        }catch(e) {
            return  res.json({error:'Ошибка метода temp!'})
        }
    }
	

}

module.exports = new TesterController()