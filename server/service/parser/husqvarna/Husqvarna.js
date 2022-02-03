const fs = require('fs')
const path = require('path')
const Math = require('mathjs')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
const axios = require('axios')

const { Product, Category, Brand } = require('../../../models/models')

const parseXlsx = require('../../xlsx/parseXlsx')
const createProduct = require('../../product/createProduct')
const findProductByArticle = require('../../product/findProductByArticle')
const translit = require('../../translit')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles')
const parseHtml = require('../../html/parseHtml')
// const deleteProduct = require('../../product/deleteProduct')


// класс для получения данных из фида xlsx 
// и для обновления цен

module.exports = class Husqvarna {
    
    static url // наименование бренда
    static brand // наименование бренда
    static array // все записи из файла

    
    constructor() {
        // this.url = "http://husq24.ru/search/?q=9679776-01&s=поиск"
        this.url = "http://husq.ru/search"
        this.brand = "husqvarna"
    }

    async run(feed = {}) {
        // let feed
        let fullPath, response

        // для заведения товаров
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'old', 'withCategory', 'Accessories.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'old', 'withCategory', 'Products_CLP.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'old', 'withCategory', 'Products_HCP.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'old', 'withCategory', 'Products_HU.xlsx')
        
        // для обновления цен
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Accessories.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_CLP.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HCP.xlsx')
        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HU.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                // "Наименование",
                "Код изделия",
                "Цена без НДС",
                "Категория",
            ])
            
            if (response && Array.isArray(response)) {
                this.array = response.map(i => {
                    return {
                        // name: i["Наименование"],
                        article: i["Код изделия"],
                        price: Math.round(Number(i["Цена без НДС"]) * 1.2),
                        category: i["Категория"]
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }
    
    // количество записей
    async getLength() {
        return this.array.length
    }

    // вывод одной записи
    async getOne(number) { 
        if (Number(number)) return this.array[number - 1]
        return false
    }

    // вывод всех записей
    async getAll() {
        return this.array
    }

    // добавление товара в БД
    async addProduct(number) {
        if (Number(number)) {
            let response
            
            let { article, price, category } = this.array[number - 1]
            
            let product = await findProductByArticle("hqv" + article)
            if (product) throw `Товар с артикулом ${article} уже добавлен!`

            let cat = await Category.findOne({
                where: { url: category }
            })
            if ( ! cat ) throw `Не найдена категория по заданному url! (${article})`
            let categoryId = cat.id

            let brand = await Brand.findOne({
                where: { name: "husqvarna" }
            })
            if ( ! brand ) throw `Не найден бренд husqvarna! (${article})`
            let brandId = brand.id

            let have = 1

            await axios.get(this.url, { params: { search: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            if (response.error !== undefined) throw response.error
            
            // если вернёт true, то выбросится исключение
            if (parseHtml(response, { entry: "Нет товаров, которые соответствуют критериям поиска" })) {
                // await deleteProduct("husqvarna", "hqv" + article)
                throw `Нет товара с артикулом ${article}`
            }
            // else throw `Товар с артикулом ${article} уже есть`

            let link = parseHtml(response, {
                entry: `<div class="product-preview">`,
                start: `href="`,
                end: `"`
            })

            let image = parseHtml(response, {
                entry: `<div class="product-preview">`,
                start: `<img src="`,
                end: `"`
            })

            await axios.get(link)
                .then(res => response = res.data)
                .catch(err => response = { error: err })
            if (response.error !== undefined) throw response.error
            
            response = response.replace(/(&quot;)/g,`"`)
            
            let name = parseHtml(response, {
                start: `<h1 itemprop="name">`,
                end: `</h1>`
            })

            let description = parseHtml(response, { start: `id="tab-description">`, end: `</section>` })
            try {
                description = parseHtml(description, { start: `<ul`, end: `</ul>`, inclusive: true })
            }catch(error) { 
                try { description = parseHtml(description, { start: "<p", end: "</p>", inclusive: true })
                }catch(error) { 
                    console.log("Error: ",error)
                    description = undefined
                }
            }

            let characteristics
            try {
                characteristics = parseHtml(response, {
                    entry: `class="text-uppercase">Характеристики`,
                    start: `<tbody`,
                    end: `</tbody>`,
                    inclusive: true
                })
            }catch(error) { console.log("Error: ",error) }

            let info = []
            if (description) info.push({title:"description",body:description})
            if (characteristics) info.push({title:"characteristics",body:characteristics})
            
           
            let filter
            let rest // остаток (если Фильтры будут найдены, поиск будет осуществлён с parseHtml -> return: true, что возвращает объект с остатком rest )
            try {
                rest = parseHtml(response, {
                    entry: `>Фильтры</strong>`,
                    start: "<tbody>",
                    end: "</tbody>"
                })
            }catch(error) { console.log("Error: ",error) }

            if (rest) {
                let resp = { rest}
                filter = []
                let yes =true

                while (yes) {
                    let name, value
                    try {
                        resp = parseHtml(resp.rest, {
                            start: "<td >",
                            end: "</td>",
                            return: true
                        })
                        name = resp.search
                        resp = parseHtml(resp.rest, {
                            start: "<td >",
                            end: "</td>",
                            return: true
                        })
                        value = resp.search
                    }catch(error) {
                        yes = false
                    }
                    if (yes) {
                        filter.push({ name, value })
                    }
                }
            }
            
            let size
            try {
                size = parseHtml(response, {
                    entry: `>Габариты и вес`,
                    start: `<tbody>`,
                    end: `</tbody>`
                })
            }catch(error) { console.log("Error: ",error) }

            let weight = "", width = "", height = "", length = "", volume = ""

            if (size) {
                try { weight = parseHtml(size, { entry: "Вес", start: "<td >", end: "</td>" }) 
                }catch(error) { 
                    try { weight = parseHtml(characteristics, { entry: "Рабочая масса", start: "<td >", end: "</td>" })
                    }catch(error) { console.log("Error: ",error) }
                }
                try { width = parseHtml(size, { entry: "Ширина", start: "<td >", end: "</td>" })
                }catch(error) { console.log("Error: ",error) }
                try { height = parseHtml(size, { entry: "Высота", start: "<td >", end: "</td>" })
                }catch(error) { console.log("Error: ",error) }
                try { length = parseHtml(size, { entry: "Длина", start: "<td >", end: "</td>" })
                }catch(error) { console.log("Error: ",error) }

                if (width, height, length) volume = Math.round( ( Number(width) / 1000 ) * ( Number(height) / 1000 ) * ( Number(length) / 1000 ), 4 )

                size = { weight, width, height, length, volume }
            }else if (characteristics) {
                try { weight = parseHtml(characteristics, { entry: "Рабочая масса", start: "<td >", end: "</td>" })
                }catch(error) { console.log("Error: ",error) }
                if (weight){
                    size = { weight, width: 0, height: 0, length: 0, volume: 0 }
                }
            }

            article = "hqv" + article
            createFoldersAndDeleteOldFiles("husqvarna", article)

            let files = `[`
            
            let fileName = uuid.v4() + '.jpg'
            
            let file = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'husqvarna', article, 'big', fileName))
            // let file2 = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'husqvarna', article, 'small', fileName))
            https.get(image, function(res) {
                res.pipe(file)
                // res.pipe(file2)
            })

            files += `{"big": "husqvarna/${article}/big/${fileName}", "small": "husqvarna/${article}/big/${fileName}"}`

            files += `]`

            let country = "Швеция"

            let promo = undefined
            
            let url = translit(name) + "_" + article

            // console.log(" ")
            // console.log("-------------")
            // console.log("link",link)
            // console.log("-------------")
            // console.log(" ")
            
            response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)

            if ( ! response ) throw `Не смог сохранить товар с артикулом ${article}!`

            return `Товар с артикулом ${article} добавлен!`
        }

        return false
    }

    // добавление всех товаров из файла
    async addAllProduct() {
        let item, answer, response = []
        response.push(`<br />`)
        for(item = 1; item <= this.array.length; item++) {
            try { answer = await this.addProduct(item) }
            catch(e) { answer = e }
            response.push(answer + `<br />`)
        }
        
        return JSON.stringify(response)
    }

    // смена цен
    async changePrice(number) {
        let response 

        if (number > this.array.length || number < 1) return `Нет номера ${number} в массиве!`

        let { article, price } = this.array[number - 1]
        // article = "hqv" + article
        let product = await Product.findOne({
            where: { article: "hqv" + article }
        })
        if (product) {
            if (Number(product.price) === Number(price)) return `Цена у артикула ${article} не изменилась!`
            response = {
                article,
                oldPrice: product.price,
                newPrice: price
            }
            
            let update = await Product.update(
                { price },
                { where: { article: "hqv" + article } }
            )

            if ( ! update ) return `Не смог обновить цену у артикула ${article}!`

            return `Цена у артикула ${article} обновлена, была: ${product.price}, стала: ${price}!`
        }

        return `Нет артикула ${article} в базе данных!`

    }

    // смена всех цен
    async changeAllPrice() {
        let item, answer, response = []
        response.push(`<br />`)
        for(item = 1; item <= this.array.length; item++) {
            try { answer = await this.changePrice(item) }
            catch(e) { answer = e }
            response.push(answer + `<br />`)
        }
        
        return JSON.stringify(response)
    }



}
