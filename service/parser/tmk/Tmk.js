const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')
const { Category } = require('../../../models/models')
const findProductByArticle = require('../../product/findProductByArticle')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
// const parseXlsx = require('../../xlsx/parseXlsx')
// const createCategory = require('../../category/createCategory')
const getUrl = require('./getUrl')
const ProductDto = require('../../../dtos/productDto')



module.exports = class Tmk {
    
    static categories = []
    static products = []
    
    constructor() {}

    async run() {
        let feed, response

        feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'tmk', 'feed.json')
            
        if (fs.existsSync(feed)) { 
            
            try {
                response = fs.readFileSync(feed)
            }catch(e) {
                throw `Не смог прочесть файл ${feed}!`
            }

            if (response) {
                response = JSON.parse(response.toString())

                this.categories = response.categories

                let keys = Object.keys(response.products)
                this.products = keys.map(i => response.products[`${i}`])
                    // .filter(i => 
                    //     i.category_id !== null 
                    //     && i.pictures[0] !== undefined
                    // )

                return true
            }

        }else {
            // необходимо от сюда взять и сохранить в файл feed.json
            // process.env.TMK_FEED_URL
            throw `Файл ${feed} отсутствует или пуст!`
        }

        return false
    }

    // количество записей в feed.json
    async getLength() {
        return this.products.length
    }


    // список всех категорий
    async getAllCategories() { 

        // вывод всех категорий в удобочитаемом виде
        const getCategoryList = (cat = this.categories, number = null, offset = "") => {
            return cat.filter(i => i.parent_id === number).map(j => {
                let arr = getCategoryList(cat, j.id, offset + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")

                let url = getUrl(j.id, j.title)
                // if ( ! url ) translit(j.title)

                return `${offset}"${j.title}{${j.id}}" - (${url})${arr[0] !== undefined ? ": {<br/>" + arr + `${offset}}<br/>` : "<br/>"}`
            }).join("")
        }

        return getCategoryList(this.categories)
    }


    // вывод данных на экран
    async print(number) {

        let one = this.products[number - 1]
        // return one

        let article = one.code
        let ean = one.ean
        let name = one.title
        let price = one.price
        
        let tmkCategoryId = one.category_id

        let urlCategory = getUrl(tmkCategoryId)

        if ( ! urlCategory ) {
            let title = ""
            this.categories.forEach(i => {
                if (i.id === tmkCategoryId) {
                    title = i.title
                }
            })
            urlCategory = translit(title)
        }


        let categoryId = 0

        let cat = await Category.findOne({ where: { url: urlCategory } })
        if (cat) categoryId = cat.id
        
        if (categoryId === 0) throw "Не найден номер категории!"


        // let brand = await Brand.findOne({ where: { name: "TMK" } })
        let brandId = 9 // brand.id
        if ( ! brandId ) throw "Не найден бренд товара!"
        
        let product = await findProductByArticle("tmk" + article)
        
        if (product && product.id !== undefined) throw "Такой товар уже есть."
        
        let country = ""
        
        let size

        if ( ! one.weight ) throw "Отсутствуют данные о весе товара."

        size = {
            weight: one.weight / 1000,
            height: one.height || 0,
            width: one.width || 0,
            length: one.depth || 0,
            volume: one.height && one.width && one.depth ? ((one.height * one.width * one.depth) / 1e9).toFixed(4) : 0 // 1e9 = 10 ** 9 = 1 000 000 000
        }
        
        let info = []
        let characteristics, equipment
        let attributes = one.attributes // [{title,value}]

        if (attributes && Array.isArray(attributes)) {
            characteristics = attributes
                .filter(i => i.title !== "Оснастка") // убираем оснастку
                .filter(i => {
                    if (i.title !== "Комплектация") return true
                    else {
                        equipment = i.value.split(";").map(i => i.trim()).join(";") // переносим комплектацию убрав лишние пробелы
                        return false
                    }
                })
                .map(i => {
                    if (i.title === "Страна производства") country = i.value
                    return i.title + ";" + i.value.replace(/;/g, ".")
                })
                .join(";")
            if (characteristics) info.push( { title: "characteristics", body: characteristics } )
            if (equipment) info.push( { title: "equipment", body: equipment } )
        }
        
        let url = translit(name) + "_" + article
        
        
        let pictures = one.pictures // []
        let files = `[`
        
        article = "tmk" + article

        if (pictures && Array.isArray(pictures) && pictures[0] !== undefined) {
            
            createFoldersAndDeleteOldFiles("tmk", article)

            let first = true

            pictures.forEach(image => {

                if (first) first = false
                else files += `,`

                let imageName = uuid.v4()  + '.jpg'

                let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'tmk', article, 'big', imageName))
                let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'tmk', article, 'small', imageName))

                if (image.includes("https")) {
                    https.get(image, (res) => {
                        res.pipe(imageBig)
                        if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
                        else res.pipe(imageSmall)
                    })
                }else {
                    http.get(image, (res) => {
                        res.pipe(imageBig)
                        if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
                        else res.pipe(imageSmall)
                    })
                }

                files += `{"big":"tmk/${article}/big/${imageName}","small":"tmk/${article}/small/${imageName}"}`

            })
        }else {
            files += `{}`
        }

        files += `]`


        let obj = { 
            tmkCategoryId, // лишнее
            urlCategory, // лишнее
            categoryId,
            brandId,
            article, 
            ean, // лишнее
            name,
            url,
            have: 1,
            promo: "",
            country,
            files, // вместо files будет img
            price,
            size,
            info,
            pictures // лишнее
        }
        
        return obj
        // return new ProductDto(obj) // Dto отсекает лишнее
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


    // смена цен
    async changePrice() {
        let response = `[`
        
        // let brand = await Brand.findOne({ where: { name: "TMK" } })
        // if (brand.id === undefined) return { error: "Не найден бренд товара." }

        // let old = await Product.findAll({ where: { brandId: brand.id } })

        // if (this.product !== undefined) this.product.forEach(newProduct => {
        //     if (response !== `[`) response += ",<br />"
        //     let yes = false
        //     old.forEach(oldProduct => {
        //         if (oldProduct.article === `ged${newProduct.article}`) {
        //             let newPrice = newProduct.price
        //             newPrice = Math.round(newPrice * 100) / 100
        //             if (newPrice != oldProduct.price) {
        //                response += `{${oldProduct.article} - Старая цена: ${oldProduct.price}, Новая цена: ${newPrice}}`
        //                 Product.update({ price: newPrice },
        //                     { where: { id: oldProduct.id } }
        //                 ).then(()=>{}).catch(()=>{})
        //             }else {
        //                 response += `{${oldProduct.article} - Цена осталась прежняя: ${oldProduct.price}}`
        //             }
        //             yes = true
        //         }
        //     })
        //     if ( ! yes) response += `{Не найден артикул: ged${newProduct.article}}`
        // })

        response = response + `]`

        return response
    }


}
