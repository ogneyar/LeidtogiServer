const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')
const encoding = require('encoding')

const { Product, ProductInfo, Brand, Category } = require('../../../models/models')

// const addNewProduct = require('../../../service/parser/milwaukee/addNewProduct')
const getAllData = require('./getAllData.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit')
const parseXlsx = require('../../xlsx/parseXlsx')
const productDto = require('../../../dtos/productDto')

// класс для получения данных из фида xlsx 
// для добавления товара
// и обновления цен

module.exports = class Milwaukee {
    
    static brand = "milwaukee" // наименование бренда
    static product = [] // массив товаров
    
    constructor() {
    }

    async run(feed = {}, withOldCategories = false) {
        
        let feedWithCategory, arrayWithCategories
        if (withOldCategories) { // использовать ли категории из старого фида?
            feedWithCategory = path.resolve(__dirname, '..', '..', '..', 'prices', 'milwaukee', 'old', 'newMILWAUKEE.xlsx')
            arrayWithCategories = await parseXlsx(feedWithCategory, [ "Артикул", "Категории" ])
        }

        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'milwaukee', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'mlk'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'mlk'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'mlk', feed.name)
            await feed.mv(fullPath)
        }

        if (fs.existsSync(fullPath)) { 

            let array = [ "Артикул", "Модель", "Цена с учетом НДС, руб.", ] // массив полей
            if ( ! withOldCategories ) array.push("Категории") // если без использования старых категорий, то искать их в исходном файле

            response = await parseXlsx(fullPath, array)
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    let article, category
                    article = i["Артикул"]
                    if (arrayWithCategories && Array.isArray(arrayWithCategories)) {
                        arrayWithCategories.forEach(j => {
                            if (article === j["Артикул"]) {
                                category = j["Категории"]
                            }
                        })
                    }else {
                        category = i["Категории"]
                    }
                    return {
                        article,
                        name: i["Модель"],
                        price: i["Цена с учетом НДС, руб."],
                        category,
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false

        // return true

    }
    
    // количество записей
    async getLength() {
        return this.product.length
    }

    // одна запись
    async getOne(number) { // number - номер строки
        return this.product[ number - 1 ]
    }


    async add(number) {
        let product, message, response

        try{
            let article = this.product[ Number(number) - 1 ].article
            let name = this.product[ Number(number) - 1 ].name
            let price = this.product[ Number(number) - 1 ].price
            let categoryUrl = this.product[ Number(number) - 1 ].category || undefined
        
            if (article) {
                const oldProduct = await Product.findOne({
                    where: {article}
                })
                if (oldProduct) {
                    throw `Товар с артикулом ${article} уже существует!`
                    const productInfo = await ProductInfo.findOne({
                        where: {productId:oldProduct.id,title:"description"}
                    })
                    if (productInfo && oldProduct.price) throw `Товар с артикулом ${article} уже существует!`
                }
            }else {
                throw "Не найден артикул товара."
            }
        
            // парсинг сайта
            let response = await getAllData(article, price)
        
            if (response.error) throw response.error
        
            let {images, sizes, description, characteristics, equipment} = response
        
            let have = 1
            let promo = ""
            let country = "Германия"
        
            const brand = await Brand.findOne({
                where: {name: "milwaukee"}
            })
            let brandId = brand.id
        
            const category = await Category.findOne({
                where: {url: categoryUrl}
            })
            let categoryId = category.id
        
            let files = JSON.stringify(images)
        
            let desc, charac, equip = null
            if (description) desc = {"title":"description","body":description}
            if (characteristics) charac = {"title":"characteristics","body":characteristics}
            if (equipment) equip = {"title":"equipment","body":equipment}
        
            let info = null
            if (desc || charac || equip) info = JSON.stringify([desc,charac,equip])
        
            let size = JSON.stringify(sizes)
        
            let url = translit(name) + "_" + article.toString()
            
            // return { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size }

            let pro = productDto({name, url, price, have, article, promo, country, brandId, categoryId, files, info, size})
            
            product = await createProduct(pro) 

            
        }catch(e) {
            product = e
        }
        
        if (product.article) {
            message = `${number}. Товар с артикулом ${product.article} добавлен.`
            console.log('\x1b[34m%s\x1b[0m', message)
        }else {
            if (typeof(product) === "string") product = product.replace("<","&lt;").replace(">","&gt;")
            message = `${number}. Ошибка: ${product}`
            console.log('\x1b[33m%s\x1b[0m', message)
        }
        message = message + "<br />"

        if (response) response = response + message
        else response = message


        return response
    }

    // добавление товаров частями
    async addParty(number, party = 10) {
        let response = ""

        for(let i = Number(number); i < Number(number)+Number(party); i++) {
            if (i <= this.product.length) response += await this.add(i)
        }

        return response
    }


    // async addAll() {
    //     console.log("addAll")
    //     let party = 10
    //     for(let i = 1; i <= this.product.length; i=i+party) {
    //         await this.addParty(i, party)
    //     }
    // }


    async changePrice(number) {

        let print = await this.print(number)
        if (print.article === undefined) return { article: undefined, update: "warning" }

        let { article, price, category } = print

        const product = await Product.findOne({
            where: { article }
        })
        if (product) {
            if (Number(price) === Number(product.price)) {
                return { article, update: "no" }
                return `Артикул: ${article}. Цена не изменилась.`
            }
            
            Product.update({ price }, {
                where: { id: product.id }
            })
            
            return { article, update: "yes" }
        }else {
            return { article, category, price, update: "unknown" }
        }
        
    }


    async changePriceAll() {

        let length, array = [], string = ""

        length = await this.getLength()

        for (let number = 1; number <= length; number++) {
            string = await this.changePrice(number)
            array.push(string)
        }

        let urlChange, urlUnknown

        let date = new Date()
        let folderName = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + "_" + date.getHours() + "." + date.getMinutes()
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info'))){
            try {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info'))
            }catch(e) {
                return `Создать папку info не удалось.`
            }
        }
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee'))){
            try {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee'))
            }catch(e) {
                return `Создать папку milwaukee не удалось.`
            }
        }
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee', folderName))){
            try {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee', folderName))
            }catch(e) {
                return `Создать папку ${folderName} не удалось.`
            }
        }

        let unknown = path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee', folderName, 'unknown.csv')

        let text = "Артикул;Цена;Ссылка\r\n" + array.map(i => {
            if (i.update === "unknown") {
                return `"${i.article}";"${i.price}";"${i.category}"\r\n`
            }
            return null
        }).filter(j => j !== null).join("")

        fs.writeFile( unknown, encoding.convert(text, 'WINDOWS-1251', 'UTF-8'), () => {})
        urlUnknown = `<a href="${process.env.URL}/info/milwaukee/${folderName}/unknown.csv" >unknown.csv</a><br />`


        let changes = path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee', folderName, 'changes.json')
        try {
            fs.writeFileSync(changes, "[" + array.map(i => {
                return "\n    " + JSON.stringify(i)
            }) + "]")
            urlChange = `<a href="${process.env.URL}/info/milwaukee/${folderName}/changes.json" >changes.json</a><br />`
        }catch(e) {
            urlChange = `Создать файл changes.json не удалось.<br />`
        }

        return urlChange + urlUnknown
    }


}