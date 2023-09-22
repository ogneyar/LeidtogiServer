
const fs = require('fs')
const path = require('path')
const http = require('https')
const https = require('https')
const uuid = require('uuid')
const Math = require('mathjs')

let sharp = require('sharp')

const { Brand, Category, Product } = require('../../../models/models')

const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')

const parseXlsx = require('../../xlsx/parseXlsx')
const ProductDto = require('../../../dtos/productDto')
// const getImages = require('./getImages')
const saveInfoInFile = require('../../saveInfoInFile')


module.exports = class Cleanvac {
    
    static product = []
    static price = []
    
    constructor() {
    }

    async run(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'cleanvac', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac', feed.name)
            await feed.mv(fullPath)
        }
        						

        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Артикул",
                "Наименование",
                "Картинки",
                "Характеристики",
                "Описание",
                "Цена",
                "Размеры",
            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        article: i["Артикул"],
                        name: i["Наименование"],
                        image: i["Картинки"],
                        characteristics: i["Характеристики"],
                        description: i["Описание"],
                        price: i["Цена"],
                        size: i["Размеры"],
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }

    async run_price(feed = {}) {
        let fullPath, response

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'cleanvac', feed.name)
            await feed.mv(fullPath)

            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "Артикул",
                    "Наименование",
                    "РРЦ",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price1 = response.map(i => {
                        return {
                            article: i["Артикул"],
                            name: i["Наименование"],
                            price: i["РРЦ"],
                        }
                    })
                    return true
                }
    
            }else {
                throw `Файл ${fullPath} отсутствует или пуст!`
            }

        }else { // берём прайс с сервера

            fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'cleanvac', 'price.xlsx')

            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "Артикул",
                    "Наименование",
                    "РРЦ",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price = response.map(i => {
                        return {
                            article: i["Артикул"],
                            name: i["Наименование"],
                            price: i["РРЦ"],
                        }
                    })
                }
    
            }else {
                throw `Файл ${fullPath} отсутствует или пуст!`
            }
    
            return true
        }
        
        return false
    }

    // количество записей в feed.xlsx
    async getLength() {
        return this.product.length
    }

    // количество записей в price.xlsx
    async getLengthPrice() {
        return this.price.length
        
    }

    // вывод данных на экран
    async print(number) {

        if (number > this.product.length) return { error: "Нет такого номера товара." }

        let one = this.product[number - 1]

        let article = one.article
        
        let price = one.price
        // if ( ! price ) return { error: "Не найдена цена товара." }
        price = 0

        let categoryUrl = "kliningovoe-oborudovanie_too"
        let category = await Category.findOne({ where: { url: categoryUrl} })
        let categoryId = category.id
        if (!categoryId || categoryId === 0) return { error: "Не найдена категория товара." }

        let brand = await Brand.findOne({ where: { name: "Cleanvac" } })        
        if (brand.id === undefined) return { error: "Не найден бренд товара." }
        
        // article = "clv" + article
        
        let name = one.name

        let url = translit(name) + "_" + article.trim().replace(/ /g, "_")

        let product = await Product.findOne({ where: { url } })
        if (product && product.id !== undefined) return { error: "Такой товар уже есть." }
        
        let image = one.image ? JSON.parse(one.image) : 42 // массив типа [{"big":"cleanvac/wd201/big/1.jpg","small":"cleanvac/wd201/small/1.jpg"}]
        
        if (image && Array.isArray(image) && image[0].big !== undefined && image != 42) {

            for (let i = 0; i < image.length; i++) {
                try{
                    let imageBig = path.resolve(__dirname, '..', '..', '..', 'static', image[i].big)
                    let imageSmall = path.resolve(__dirname, '..', '..', '..', 'static', image[i].small)
                    
                    if ( ! fs.existsSync(imageSmall) ) {

                        sharp(imageBig).resize(100).toFile(imageSmall)
                            .then(function(newFileInfo) {
                                // newFileInfo holds the output file properties
                                // console.log("Success")
                            })
                            .catch(function(err) {
                                console.log("Error occured")
                            })

                    }
                }catch(e) {
                    // return { error: "Не найдено изображение товара." }
                }
            }

        }else {
            return { error: "Не найдено изображение товара." }
        }

        let files = JSON.stringify(image)
        
        let info = []

        if (one.description) {
            info.push( { 
                title: "description", 
                body: one.description
            } )
        }
        
        if (one.characteristics) {
            info.push( { 
                title: "characteristics", 
                body: one.characteristics
            } )
        }

        let size = one.size ? JSON.parse(one.size) : 42

        
        return {
            categoryId,
            brandId: brand.id, 
            article, 
            name,
            url,
            have: 1, 
            promo: "",
            country: "Турция",
            files,
            price,
            size,
            info,
            filter: undefined
        }
    }

    // добавление товара в БД
    async add(number, quantity) {

        if (quantity) {
            let array = []
            for(let i = number; i < number+quantity; i++) {
                try {
                    let print = await this.print(i)
                    if (print.error !== undefined) {
                        array.push(`{${i}: ${print.error}}`)
                        continue
                    }
                    let proDto = new ProductDto(print)
                    // создание записи
                    let response = await createProduct(proDto)
                    array.push(`{${i}: ${response.url} - ${response.price}}р.`)
                }catch(e) {
                    array.push(`{${i}: ${e}}`)
                }
            }
            
            return array

        }else {
            try {
                let print = await this.print(number)
                if (print.error !== undefined) return `{${number}: ${print.error}}`
                let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
                // создание записи
                let response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)

                return `{${number}: ${response.url} - ${response.price}р.}`
            }catch(e) {
                return `{${number}: ${e}}`
            }
        }
    }

    // смена цен
    async changePrice() {
        let response = `{<br />`
        
        let brand = await Brand.findOne({ where: { name: "Cleanvac" } })
        if (brand.id === undefined) return { error: "Не найден бренд товара." }

        let products = await Product.findAll({ where: { brandId: brand.id } })

        this.price.forEach(newProduct => {
            if (response !== `{<br />`) response += ",<br />"
            let yes = false
            products.forEach(oldProduct => {
                if (oldProduct.article === newProduct.article) {
                    let newPrice = newProduct.price
                    newPrice = Math.round(newPrice * 100) / 100
                    if (newPrice != oldProduct.price) {
                        response += `"${newProduct.article}": "Старая цена = ${oldProduct.price}, новая цена = ${newPrice}.`
                        Product.update({ price: newPrice },
                            { where: { id: oldProduct.id } }
                        ).then(()=>{}).catch(()=>{})
                    }else {
                        response += `"${newProduct.article}": "Цена осталась прежняя = ${oldProduct.price}."`
                    }
                    yes = true
                }
            })
            if ( ! yes) response += `"${newProduct.article}": "Не найден артикул."`
        })
        response = response + `<br />}`

        saveInfoInFile(brand.name, "update_price", response)

        return response
    }


}
