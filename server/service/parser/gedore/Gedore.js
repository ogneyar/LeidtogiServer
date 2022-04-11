const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')
const { Brand, Category, Product } = require('../../../models/models')
const findProductByUrl = require('../../product/findProductByUrl')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
const parseXlsx = require('../../xlsx/parseXlsx')
const getDataGedoreTool = require('./gedoreTool/getDataGedoreTool')
const getImagesGedoreTool = require('./gedoreTool/getImagesGedoreTool')
const getDescriptionGedoreTool = require('./gedoreTool/getDescriptionGedoreTool')
const getSizesGedoreCom = require('./gedoreCom/getSizesGedoreCom')
const getDataGedoreCom = require('./gedoreCom/getDataGedoreCom')
const getImagesGedoreCom = require('./gedoreCom/getImagesGedoreCom')
const getDescriptionGedoreCom = require('./gedoreCom/getDescriptionGedoreCom')



module.exports = class Gedore {
    
    static product = []
    
    constructor() {}

    async run(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'gedore', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Code",
                "РУС",
                "РРЦ с НДС Розница",
                "Категории",
            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        article: i["Code"],
                        name: i["РУС"],
                        price: i["РРЦ с НДС Розница"],
                        category: i["Категории"],
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }


    // количество записей в feed.xlsx
    async getLength() {
        return this.product.length
    }


    // вывод данных на экран
    async print(number) {

        let one = this.product[number - 1]

        let article = one.article
        let name = one.name
        let price = one.price
        let category = one.category
        
        let categoryId = 0

        if (category) { 

            let cat = await Category.findAll()
            cat.forEach(i => {
                if (i.url === category) {
                    categoryId = i.id
                }
            })
            
            if (categoryId === 0) throw "Не найден номер категории!"

        }else {
            categoryId = 99 // category = "setevoy-instrument_drugoe"
        }

        // let brand = await Brand.findOne({ where: { name: "Gedore" } })
        let brandId = 3 // brand.id
        if ( ! brandId ) throw "Не найден бренд товара!"

        let url = translit(name) + "_" + article
        
        // let product = await Product.findOne({ where: { url } })
        let product = await findProductByUrl(url)
        
        if (product && product.id !== undefined) throw "Такой товар уже есть."
        
        let country = "Германия"
        let info = []
        let size, image, description

        size = await getSizesGedoreCom(article)

        try {
            let dataGedoreTool = await getDataGedoreTool(article)
            image = getImagesGedoreTool(dataGedoreTool)
            description = getDescriptionGedoreTool(dataGedoreTool)
        }catch(e) {
            console.log("err: ",e)
            let dataGedoreCom = await getDataGedoreCom(article)
            image = getImagesGedoreCom(dataGedoreCom)
            console.log("image: ",image)
            description = getDescriptionGedoreCom(dataGedoreCom)
        }
        
        if (description) info.push( { title: "description", body: description } )
        
        article = "ged" + article

        let imageName = uuid.v4()  + '.jpg'

        createFoldersAndDeleteOldFiles("gedore", article)

        let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'big', imageName))
        let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'small', imageName))

        http.get(image, (res) => {
            res.pipe(imageBig)
            if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
            else res.pipe(imageSmall)
        })

        let files = `[`

        files += `{"big":"gedore/${article}/big/${imageName}","small":"gedore/${article}/small/${imageName}"}`
        
        files += `]`

        return { 
            categoryId,
            brandId,
            article, 
            name,
            url,
            have: 1,
            promo: "",
            country,
            files,
            price,
            size,
            info,
            filter: undefined,
            image
        }
    }

    // добавление товара в БД
    async add(number, quantity) {

        if (quantity) { // количество добавляемых товаров

            let array = []

            for(let i = number; i < number+quantity; i++) {
                
                try {
                    let print = await this.print(i)
                
                    let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
            
                    let response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)
                
                    array.push(`{${i}: ${response.url} - ${response.price}}р.`)
                    // continue

                }catch(e) {
                    array.push(`{${i}: ${e}}`)
                }

            }
            
            return array

        }else { // иначе добавляем один товар
            try {
                let print = await this.print(number)

                let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
            
                let response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)
                
                return `{${number}: ${response.url} - ${response.price}р.}`
            }catch(e) {
                return `{${number}: ${e}}`
            }
        }
    }

    // смена цен
    async changePrice() {
        let response = `[`
        
        // let brand = await Brand.findOne({ where: { name: "KVT" } })
        // if (brand.id === undefined) return { error: "Не найден бренд товара." }

        // let products = await Product.findAll({ where: { brandId: brand.id } })

        // this.price.forEach(newProduct => {
        //     if (response !== `[`) response += ",<br />"
        //     let yes = false
        //     products.forEach(oldProduct => {
        //         if (oldProduct.article === `kvt${newProduct.article}`) {
        //             let newPrice = newProduct.price * newProduct.quantity
        //             newPrice = Math.round(newPrice * 100) / 100
        //             if (newPrice != oldProduct.price) {
        //                 response += `{Старая цена: ${oldProduct.price}, Новая цена: ${newPrice}}`
        //                 Product.update({ price: newPrice },
        //                     { where: { id: oldProduct.id } }
        //                 ).then(()=>{}).catch(()=>{})
        //             }else {
        //                 response += `{Цена осталась неизменна: ${oldProduct.price}}`
        //             }
        //             yes = true
        //         }
        //     })
        //     if ( ! yes) response += `{Не найден артикул: kvt${newProduct.article}}`
        // })

        response = response + `]`

        return response
    }


}