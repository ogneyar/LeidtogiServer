const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const axios = require('axios')
const http = require('http')
const https = require('https')
let sharp = require('sharp')

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
                let article, price, name, id, images, description, brand,
                    weight, length, height, width, characteristics, categoryId, gabarits

                id = item._attributes.id
                name = item.name._text
                categoryId = item.categoryId._text
                price = item.price._text
                brand = item.vendor._text
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

            let one = this.product[action - 1]
            let categoryId = null
            let brand = await Brand.findOne({ where: { name: "RGK" } })
            let brandId = brand.id
            if ( ! brandId ) throw "Не найден бренд товара!"
            let article = one.article

            let product = await findProductByArticle("rgk" + article)        
            if (product && product.id !== undefined) throw "Такой товар уже есть."

            let name = one.name

            let url = translit(name) + "_" + article
            
            article = "rgk" + article
            
            let price = one.price
            let size = {
                weight: one.weight,
                length: one.length,
                width: one.width,
                height: one.height
            }
            if (one.length && one.width && one.height) size.volume = ((one.length * one.width * one.height) / 1e9).toFixed(4)

            let info = []
            if (one.description) info.push( { title: "description", body: one.description} )
            if (one.characteristics) info.push( { title: "characteristics", body: one.characteristics} )

            let files = `[`
            
            if (one.images) {
                
                createFoldersAndDeleteOldFiles("rgk", article)
    
                let first = true
    
                one.images.forEach((image, idx) => {
                    if (idx < 4) {
                        if (first) first = false
                        else files += `,`
    
                        let imageName = (idx + 1)  + '.jpg'
    
                        let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'big', imageName))
                        let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'small', imageName))
    
                        if (image.includes("https")) {
                            https.get(image, (res) => {
                                res.pipe(imageBig)
                                res.pipe(sharp().resize(100)).pipe(imageSmall)
                            })
                        }else {
                            http.get(image, (res) => {
                                res.pipe(imageBig)
                                res.pipe(sharp().resize(100)).pipe(imageSmall)
                            })
                        }
    
                        files += `{"big":"rgk/${article}/big/${imageName}","small":"rgk/${article}/small/${imageName}"}`
                    }
                })
            }else {
                files += `{}`
            }
    
            files += `]`
    

            return { 
                categoryId,
                brandId,
                article, 
                name,
                url,
                have: 1,
                promo: "",
                country: "Китай",
                img: files,
                price,
                size,
                info
            }
        }
        return null
    }

    // вывод суммы общего количества товара
    async getLengthProducts() {
        return this.product.length
    }


    // добавление товара в БД
    async add(number) {

        try {
            let obj = await this.print(number)
        
            let proDto = new ProductDto(obj) // Dto отсекает лишнее

            let product = await createProduct(proDto)
            
            let response = `{${number}: ${product.url} - ${product.price}р. (${product.article})}`
            console.log('\x1b[34m%s\x1b[0m', response)

            return response
        }catch(e) {
            let response = `{${number}: ${e.replace("<","&lt;").replace(">","&gt;")}}`
            console.log('\x1b[33m%s\x1b[0m', response)
            return response
        }
    }

    
    // добавление партии товара в БД
    async addParty(number, quantity) {

        if (quantity === 1) return await this.add(number)
        
        let array = []

        for(let i = number; i < number+quantity; i++) {
            let response = await this.add(i)
            array.push(response)
        }
        
        return array
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