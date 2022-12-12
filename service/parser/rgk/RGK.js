const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const axios = require('axios')
const http = require('http')
const https = require('https')
const uuid = require('uuid')

const { Brand, Category, Product } = require('../../../models/models')

const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const findProductByArticle = require('../../product/findProductByArticle.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
const ProductDto = require('../../../dtos/productDto')
const parseXml = require('../../xml/parseXml')
const parseHtml = require('../../html/parseHtml')
const saveInfoInFile = require('../../saveInfoInFile')



module.exports = class RGK {
    
    static url
    static category = []
    static product = []

    
    constructor() {
        this.url = process.env.RGK_FEED_URL
    }

    async update() { 
        let feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'rgk', 'feed.xml')
        
        return await new Promise((resolve, reject) => {
            try {
                https.get(this.url, res => {
                    res.pipe(fs.createWriteStream(feed))
                    res.on("end", () => {
                        console.log("Записал данные в файл feed.xml")
                        resolve(true)
                    })
                })
            }catch(e) {
                console.log("Не смог записать данные в файл feed.xml")
                reject(`Не смог записать данные в файл feed.xml. Ошибка: ${e}`)
            }
        })
    }

    async run(update = false) { // по умолчанию файл feed.xml не обновляется
        let feed

        if (update) await this.update()

        feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'rgk', 'feed.xml') 
        
        if (! fs.existsSync(feed)) {
            return { error: "Файл rgk/feed.xml отсутствует или пуст!" }
        }
        
        let { yml_catalog } = await parseXml(feed)

        let shop = yml_catalog.shop

        if (shop && shop.offers && Array.isArray(shop.offers.offer)) {
            this.product = shop.offers.offer.map(item => {
                let article, price, name, id, images, description, specifications, brand,
                    weight, length, height, width, characteristics, categoryId, currencyId, gabarits

                id = item._attributes.id
                name = item.name._text
                categoryId = item.categoryId._text
                price = item.price._text
                brand = item.vendor._text
                currencyId = item.currencyId._text
                description = item.description._text.trim()
                while(true) {
                    let urlDelete
                    try{
                        urlDelete = parseHtml(description, {
                            start: `<a href="`,
                            end: `">`, 
                            inclusive: true
                        })
                        description = description.replace(urlDelete, "").replace("</a>", "")
                    }catch(e) {
                        break
                    }
                }
                characteristics = item.specifications//._text
                // это какой-то странный, но необходимый костыль (: ©
                if (characteristics) characteristics = characteristics._text.trim()
                
                let trDelete
                try{
                    trDelete = parseHtml(characteristics, {
                        start: `<tr class="tech_item">`,
                        end: `</tr>`, 
                        inclusive: true
                    })
                    characteristics = characteristics.replace(trDelete, "")
                }catch(e) {}

                try{
                    gabarits = parseHtml(characteristics, {
                        entry: `<th>Размеры</th>`,
                        start: `<td>`,
                        end: `</td>`
                    })
                    characteristics = characteristics.replace(`<th>Размеры</th><td>${gabarits}</td>`, "")
                    gabarits = gabarits.split(" x ")
                    length = gabarits[0]
                    width = gabarits[1]
                    height = gabarits[2].split(" ")[0]
                }catch(e) {}
                
                try{
                    weight = parseHtml(characteristics, {
                        entry: `<th>Вес</th>`,
                        start: `<td>`,
                        end: `</td>`
                    })
                    characteristics = characteristics.replace(`<th>Вес</th><td>${weight}</td>`, "")
                    weight = weight.split(" ")[0]
                }catch(e) {}

                article = item.vendorCode._text

                images = []
                if (item.picture1) images.push(item.picture1._text)
                if (item.picture2) images.push(item.picture2._text)
                if (item.picture3) images.push(item.picture3._text)
                if (item.picture4) images.push(item.picture4._text)

                return {
                    id,
                    name,
                    categoryId,
                    price,
                    brand,
                    // currencyId,
                    description,
                    characteristics,
                    weight,
                    length,
                    width,
                    height,
                    article,
                    images
                }
            })
        }

        if (shop && shop.categories && Array.isArray(shop.categories.category)) {
            this.category = shop.categories.category.map(item => {
                return { 
                    id: item._attributes.id,
                    parentId: item._attributes.parentId,
                    name: item._text
                }
            })
        }
        
        return true
    }

    // вывод данных
    async print(action = "product") {
        if (action === "product") {
            return this.product
        }else if (action === "category") {
            return this.category
        }else if (typeof(action) === "number") {
            return this.product[action]
        }
        return null
    }

    // вывод суммы общего количества товара
    async getLengthProducts() {
        return this.product.length
    }


    // 
    async add(number) {

        // let object = await this.search(number) // object = { id, name, url, price, characteristics, description, category, images, article }
        // // необходимо добавить { brandId, categoryId, have, country, files, info }

        // if (object.error !== undefined) return object

        // // преобразуем объект object
        // let { name, price, characteristics, description, category, images, article } = object

        // article = "rgk" + article

        // let prod = await findProductByArticle(article)
        // if (prod) {
        //     console.log("Такой товар уже есть: ",article)
        //     return "Такой товар уже есть!" // если необходимо обновить товары, то эту строчку надо закомментировать
        // }

        // if (characteristics) 
        //     characteristics = characteristics
        //         .replace(/(<tr><td><\/td><\/tr>)/g, "")
        //         .replace(/(<tr><td> <\/td><\/tr>)/g, "")
        //         .replace(/(<tr><td>  <\/td><\/tr>)/g, "")
        //         .replace(/(<tbody><\/tbody>)/g, "")

        // let brand
        // try {
        //     brand = await Brand.findOne({
        //         where: {name: "RGK"}
        //     })
        // }catch(e) {
        //     return { error: "Ошибка: бренд не найден!!!" }
        // }
        // let brandId

        // if (brand.id !== undefined) brandId = brand.id
        // else return { error: "Ошибка: бренд не найден!" }
        
        // let categoryClass
        // try {
        //     categoryClass = await Category.findOne({
        //         where: {name: category}
        //     })
        // }catch(e) {
        //     return { error: "Ошибка: категория " + category + " не найдена!!!" }
        // }
        
        // let categoryId
        
        // if (categoryClass.id !== undefined) categoryId = categoryClass.id
        // else return { error: "Ошибка: категория не найдена!" }
        
        // createFoldersAndDeleteOldFiles("rgk", article)

        // let link = ""
        // images.forEach(i => {
        //     let fileName = uuid.v4() + '.jpg'
            
        //     let file = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'big', fileName))
        //     let file2 = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'small', fileName))
        //     https.get(i, function(res) {
        //         res.pipe(file)
        //         res.pipe(file2)
        //     })

        //     link = link + `{"big": "rgk/${article}/big/${fileName}", "small": "rgk/${article}/small/${fileName}"},`
        // })

        // let files = `[${link.replace(/.$/g, "")}]`

        // let info = []
        // if (description) info.push({title:"description",body:description})
        // if (characteristics) info.push({title:"characteristics",body:characteristics})

        // let country = "Россия"

        // let have = 1

        // let promo = undefined
        
        // let size = undefined
        
        // let urlTranslit = translit(name) + "_" + article.toString()

        // // console.log(" ");
        // // console.log("id",id);
        // // console.log(" ");
        
        // // response = { name, url: urlTranslite, price, have, article, promo, country, brandId, categoryId, files, info, size }
        
        // let product
        // try {
        //     let proDto = new ProductDto({name, urlTranslit, price, have, article, promo, country, brandId, categoryId, files, info, size})
        //     product = await createProduct(proDto)
        // }catch(e) {
        //     return { error: "Ошибка: не смог добавить товар!!!" }
        // }

        // return product
    }

    // смена цены
    async changePrice() {
        let response = `{<br />`
        
        let brand = await Brand.findOne({ where: { name: "RGK" } })
        if (brand.id === undefined) return { error: "Не найден бренд товара." }

        let old = await Product.findAll({ where: { brandId: brand.id } })

        if (this.product !== undefined) this.product.forEach(newProduct => {
            if (response !== `{<br />`) response += ",<br />"
            let yes = false
            old.forEach(oldProduct => {
                if (oldProduct.article === `rgk${newProduct.article}`) {
                    if (newProduct.price != oldProduct.price) {
                        response += `"${oldProduct.article}": "Старая цена = ${oldProduct.price}, новая цена = ${newProduct.price}"`
                        Product.update({ price: newProduct.price },
                            { where: { id: oldProduct.id } }
                        ).then(()=>{}).catch(()=>{})
                    }else {
                        response += `"${oldProduct.article}": "Цена осталась прежняя = ${oldProduct.price}"`
                    }
                    yes = true
                }
            })
            if ( ! yes) response += `"rgk${newProduct.code}": "Не найден артикул."` 
            
        })

        response = response + `<br />}`
        
        saveInfoInFile(brand.name, "update_price", response) 

        return response 

    }


}