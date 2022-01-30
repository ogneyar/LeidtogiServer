const fs = require('fs')
const path = require('path')
const Math = require('mathjs')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
const axios = require('axios')

const { Category, Brand } = require('../../../models/models')

const parseXlsx = require('../../xlsx/parseXlsx')
const createProduct = require('../../product/createProduct')
const findProductByArticle = require('../../product/findProductByArticle')
const translit = require('../../translit')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles')
const getImage = require('./getImage')
const getCharcteristics = require('./getCharcteristics')
const getDescription = require('./getDescription')
const getLink = require('./getLink')
const getWeight = require('./getWeight')


// класс для получения данных из фида xlsx 
// и для обновления цен

module.exports = class Husqvarna {
    
    static brand // наименование бренда
    static array // все записи из файла

    
    constructor() {
        this.brand = "husqvarna"
    }

    async run(feed = {}) {
        // let feed
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_CLP.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Accessories.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HU.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HCP.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv', feed.name)
            await feed.mv(fullPath)
        }

        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Наименование",
                "Код изделия",
                "Цена без НДС",
                "Категория",
            ])
            
            if (response && Array.isArray(response)) {
                this.array = response.map(i => {
                    return {
                        name: i["Наименование"],
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

    // смена цен (позже реализую)
    async changePrice() {
        return "Метод ещё не реализован!"
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
            // return this.array[number - 1]
            let { name, article, price, category } = this.array[number - 1]
            
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

            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = { error: err })
            if (response.error !== undefined) throw response.error
            
            response = getLink(response)

            await axios.get(response)
                .then(res => response = res.data)
                .catch(err => response = { error: err })
            if (response.error !== undefined) throw response.error
            
            let image = getImage(response)

            let description = getDescription(response) 

            let characteristics = getCharcteristics(response)

            let info = []
            if (description) info.push({title:"description",body:description})
            if (characteristics) info.push({title:"characteristics",body:characteristics})
            
            let weight
            try {
                weight = getWeight(characteristics)
            }catch(e) {
                console.log(e)
                weight = null
            }

            let size = undefined
            if (weight) size = {weight, volume: "", width: "", height: "", length: ""}
            
            article = "hqv" + article
            createFoldersAndDeleteOldFiles("husqvarna", article)

            let link = ""
            // images.forEach(image => {
                let fileName = uuid.v4() + '.jpg'
                
                let file = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'husqvarna', article, 'big', fileName))
                let file2 = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'husqvarna', article, 'small', fileName))
                http.get(image, function(res) {
                    res.pipe(file)
                    res.pipe(file2)
                })

                link = `{"big": "husqvarna/${article}/big/${fileName}", "small": "husqvarna/${article}/small/${fileName}"}`
            // })

            let files = `[${link}]`

            let country = "Швеция"

            let promo = undefined
            
            let url = translit(name) + "_" + article

            // console.log(" ")
            // console.log("-------------")
            // console.log("link",link)
            // console.log("-------------")
            // console.log(" ")
            
            response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size)

            if ( ! response ) throw `Не смог сохранить товар с артикулом ${article}!`

            return `Товар с артикулом ${article} добавлен!`
        }

        return false
    }

    //
    async addAllProduct() {
        let length = await this.getLength()
        let response = []
        let answer

        for(let item = 0; item < length; item++) {
            try { answer = await this.addProduct(item + 1) }
            catch(e) { answer = e }
            response.push(answer)
        }
        
        return response
    }


}
