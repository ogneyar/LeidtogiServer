const fs = require('fs')
const path = require('path')
const Math = require('mathjs')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
const axios = require('axios')

let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')

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
        // this.oldUrl = "http://husq.ru/search"
        this.url ="https://husq24.ru" // "https://husq24.ru/search/?q=9679776-01&s=поиск"
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
                where: { name: this.brand }
            })
            if ( ! brand ) throw `Не найден бренд husqvarna! (${article})`
            let brandId = brand.id

            let have = 1

            // await axios.get(this.url, { params: { search: article } })
            await axios.get(this.url + "/search", { params: { q: article, s: "поиск" } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            if (response.error !== undefined) throw response.error
            
            // если вернёт true, то выбросится исключение
            // if (parseHtml(response, { entry: "Нет товаров, которые соответствуют критериям поиска" })) {
            if (parseHtml(response, { entry: "К сожалению, на ваш поисковый запрос ничего не найдено." })) {
                // await deleteProduct("husqvarna", "hqv" + article)
                throw `Нет товара с артикулом ${article}`
            } // else throw `Товар с артикулом ${article} уже есть`

            // let link = parseHtml(response, {
            //     entry: `<div class="product-preview">`,
            //     start: `href="`,
            //     end: `"`
            // })

            let link = this.url + parseHtml(response, {
                entry: `<div class="search-item">`,
                start: `href="`,
                end: `"`
            })
            
            // link = this.url + link

            // let image = parseHtml(response, {
            //     entry: `<div class="product-preview">`,
            //     start: `<img src="`,
            //     end: `"`
            // })

            // throw link

            await axios.get(link)
                .then(res => response = res.data)
                .catch(err => response = { error: err })
            if (response.error !== undefined) throw response.error
            
            response = response.replace(/(&quot;)/g,`"`)

            // throw response

            let imagesUL = parseHtml(response, {
                entry: `<div class='det_left'`,
                start: `<ul class='det_slider'>`,
                end: `</ul>`
            })

            // throw imagesUL

            let images = []
            try {
                for (let i = 0; i < 4; i++) {

                    let resp = parseHtml(imagesUL, {
                        entry: `<img`,
                        start: `src='`,
                        end: `'`,
                        return: true
                    })
                    let img = resp.search
                    imagesUL = resp.rest

                    images.push(this.url + img)
                    
                }
            }catch(e) {
                if (images.length === 0) throw "Не найдено изображение товара."
            }
            
            // return images

            let name = parseHtml(response, {
                start: `<h1 itemprop="name">`,
                end: `</h1>`
            }).trim()

            // return name
            
            // let description = parseHtml(response, { start: `id="tab-description">`, end: `</section>` })
            // try {
            //     description = parseHtml(description, { start: `<ul`, end: `</ul>`, inclusive: true })
            // }catch(error) { 
            //     try { description = parseHtml(description, { start: "<p", end: "</p>", inclusive: true })
            //     }catch(error) { 
            //         console.log("Error: ",error)
            //         description = undefined
            //     }
            // }

            let description
            try {
                description = parseHtml(response, { 
                    entry: `itemprop="description">`, 
                    start: `<div>`, 
                    end: `</div>`,
                    inclusive: true
                })
            }catch(error) { console.log("Error: ",error) }

            // return description

            // let characteristics
            // try {
            //     characteristics = parseHtml(response, {
            //         entry: `class="text-uppercase">Характеристики`,
            //         start: `<tbody`,
            //         end: `</tbody>`,
            //         inclusive: true
            //     })
            // }catch(error) { console.log("Error: ",error) }

            let characteristics
            try {
                characteristics = parseHtml(response, {
                    entry: `<div class='dt_content`,
                    start: `<tbody`,
                    end: `</tbody>`,
                    inclusive: true
                })
            }catch(error) { console.log("Error: ",error) }

            // return characteristics || null

            let info = []
            if (description) info.push({title:"description",body:description})
            if (characteristics) info.push({title:"characteristics",body:characteristics})
            
           
            // let filter
            // let rest // остаток (если Фильтры будут найдены, поиск будет осуществлён с parseHtml -> return: true, что возвращает объект с остатком rest )
            // try {
            //     rest = parseHtml(response, {
            //         entry: `>Фильтры</strong>`,
            //         start: "<tbody>",
            //         end: "</tbody>"
            //     })
            // }catch(error) { console.log("Error: ",error) }

            // if (rest) {
            //     let resp = { rest}
            //     filter = []
            //     let yes =true

            //     while (yes) {
            //         let name, value
            //         try {
            //             resp = parseHtml(resp.rest, {
            //                 start: "<td >",
            //                 end: "</td>",
            //                 return: true
            //             })
            //             name = resp.search
            //             resp = parseHtml(resp.rest, {
            //                 start: "<td >",
            //                 end: "</td>",
            //                 return: true
            //             })
            //             value = resp.search
            //         }catch(error) {
            //             yes = false
            //         }
            //         if (yes) {
            //             filter.push({ name, value })
            //         }
            //     }
            // }
            
            // return filter

            // let size
            // try {
            //     size = parseHtml(response, {
            //         entry: `>Габариты и вес`,
            //         start: `<tbody>`,
            //         end: `</tbody>`
            //     })
            // }catch(error) { console.log("Error: ",error) }

            let size, weight = "", width = "", height = "", length = "", volume = ""
            try {
                if (characteristics) {
                    size = parseHtml(response, { // ДхШхВ, в мм
                        entry: `Габариты (ДхШхВ)`,
                        start: `<td>`,
                        end: `</td>`
                    }).replace("<p>","").replace("</p>","").trim()

                    length = parseHtml(size, {
                        start: ``,
                        end: `х`
                    })
                    // return length
                    width = parseHtml(size, {
                        start: `х`,
                        end: `х`,
                        return: true
                    })
                    height = width.rest.replace("х","")
                    width = width.search
                    // return width
                    // return height
                    if (width, height, length) volume = Math.round( ( Number(width) / 1000 ) * ( Number(height) / 1000 ) * ( Number(length) / 1000 ), 4 )
                    // return volume || null
                }
            }catch(error) { console.log("Error: ",error) }

            // return size

            try {
                if (characteristics) {
                    weight = parseHtml(response, { // вес в кг
                        entry: `Вес в упаковке`,
                        start: `<td>`,
                        end: `</td>`
                    }).replace("<p>","").replace("</p>","").trim()

                }
            }catch(error) { console.log("Error: ",error) }

            // return weight

            size = { weight, width, height, length, volume }

            // return size

            // if (size) {
            //     try { weight = parseHtml(size, { entry: "Вес", start: "<td >", end: "</td>" }) 
            //     }catch(error) { 
            //         try { weight = parseHtml(characteristics, { entry: "Рабочая масса", start: "<td >", end: "</td>" })
            //         }catch(error) { console.log("Error: ",error) }
            //     }
            //     try { width = parseHtml(size, { entry: "Ширина", start: "<td >", end: "</td>" })
            //     }catch(error) { console.log("Error: ",error) }
            //     try { height = parseHtml(size, { entry: "Высота", start: "<td >", end: "</td>" })
            //     }catch(error) { console.log("Error: ",error) }
            //     try { length = parseHtml(size, { entry: "Длина", start: "<td >", end: "</td>" })
            //     }catch(error) { console.log("Error: ",error) }

            //     if (width, height, length) volume = Math.round( ( Number(width) / 1000 ) * ( Number(height) / 1000 ) * ( Number(length) / 1000 ), 4 )

            //     size = { weight, width, height, length, volume }
            // }else if (characteristics) {
            //     try { weight = parseHtml(characteristics, { entry: "Рабочая масса", start: "<td >", end: "</td>" })
            //     }catch(error) { console.log("Error: ",error) }
            //     if (weight){
            //         size = { weight, width: 0, height: 0, length: 0, volume: 0 }
            //     }
            // }

            article = "hqv" + article
            createFoldersAndDeleteOldFiles(this.brand, article)

            let files = `[`

            images.forEach(image => {
            
                if (files !== `[`) files += `,`

                let imageName = uuid.v4() + '.jpg'
    
                let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', this.brand, article, 'big', imageName))
                let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', this.brand, article, 'small', imageName))

                https.get(image, (res) => {
                    res.pipe(imageBig)
                    if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
                    else res.pipe(imageSmall)
                })

                files += `{"big":"${this.brand}/${article}/big/${imageName}","small":"${this.brand}/${article}/small/${imageName}"}`
            
            })

            files += `]`

            // throw files

            let country = "Швеция"

            let promo = undefined
            
            let url = translit(name) + "_" + article
            
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
