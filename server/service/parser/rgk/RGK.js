const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const axios = require('axios')
const https = require('https')
const uuid = require('uuid')

const { Brand, Category } = require('../../../models/models')

const getArticle = require('./getArticle')
const getImages = require('./getImages')
const getProducts = require('./getProducts')

const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const findProductByArticle = require('../../product/findProductByArticle.js')
const createProduct = require('../../product/createProduct.js')
const translite = require('../../translite.js')



module.exports = class RGK {
    
    static url = process.env.RGK_FEED_URL
    static category = []
    static product = []
    
    constructor() {
    }

    async run() {
        let response, fullResponse, yes
        
        // response = await axios.get(this.url)
        fullResponse = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', 'feed.csv'))
        
        // Convert from an encoded buffer to a js string.
        let str = iconv.decode(fullResponse, 'win1251')

        fullResponse = str
            .replace(/(&amp;)/g, "&")
            .replace(/(&amp;)/g, "&")
            .replace(/(&quot;)/g, "\'\'")
            .replace(/(&Prime;)/g, "\`")
            .replace(/(&rdquo;)/g, "\`\`")
            .replace(/(&lt;)/g, "<")
            .replace(/(&gt;)/g, ">")

        response = fullResponse.split('\n')

        // поиск категорий
        yes = false
        this.category = response.map(i => {
            let text = i.split(";")
            if (text[0] === `"category id"`) {
                yes = true
            }else if (text[0] === `"offer id"`) {
                yes = false
            }else if (yes) {
                return {id: text[0], name: text[1].replace(/\"/g, "").replace(/(\r)/g, "")}
            }
            return null
        }).filter(j => j !== null)


        // поиск товаров
        response = getProducts(fullResponse)
        if (response.error !== undefined) {
            return "Ошибка: " + response.error
        }
        this.product = response.message

        // return this.product
    }

    // вывод данных
    async print(action = "product") {
        let stringResponse
        if (action === "product") {
            stringResponse = this.product
        }else if (action === "category") {
            stringResponse = this.category
        }
        return stringResponse
    }

    // вывод суммы общего количества товара
    async getLengthProducts() {
        return this.product.length
    }

    // поиск данных (поочерёдное, от 1 до getLengthProducts)
    async search(number = 1, info = "full") {
        if (number > this.product.length) return { error: "Ошибка: такого номера не существует!" }
        
        // if ( ! this.product[number - 1]['available']) return "Нет в наличии"
        let object = {}
        
        object.id = this.product[number - 1]['offer id']
        // object.available = this.product[number - 1]['available']
        // object.name = this.product[number - 1]['offer name']
        object.name = this.product[number - 1]['offer full_name']
        // object.type = this.product[number - 1]['offer type']
        // object.vendor = this.product[number - 1]['offer vendor']
        object.url = this.product[number - 1]['offer url'] + "/"
        object.price = this.product[number - 1]['offer price']
        // object.picture = this.product[number - 1]['offer picture']

        let characteristics
        if (this.product[number - 1]['offer param']) {
            characteristics = this.product[number - 1]['offer param'].split("; ")
            object.characteristics = "<tbody>" + characteristics.map(i => {
                return "<tr>" + i.replace(" - ", "#@").split("#@").map(j => {
                    return "<td>" + j.replace(/\?/g, "&lt;=") + "</td>"
                }).join("") + "</tr>"
            }).join("") + "</tbody>"
        }
        
        if (this.product[number - 1]['offer description']) {
            object.description = this.product[number - 1]['offer description'].replace(/(\r\n)/g, "")
        }

        // object.instructions = this.product[number - 1]['offer instructions']
        // object.certificates = this.product[number - 1]['offer certificates']
        let categoryId = this.product[number - 1]['offer category']
        
        this.category.forEach(i => {
            if (i.id === categoryId) object.category = i.name
        }) 
        
        if ( ! object.category ) {
            if ( ! categoryId ) object.category = "НЕ НАЙДЕНА"
            else object.category = categoryId
        }
        
        let html

        await axios.get(object.url)
            .then(res => html = res.data)

        let images = getImages(html)
        if (images.error !== undefined) {
            return images
        }
        object.images = images.message

        let article = getArticle(html)
        if (article.error !== undefined) {
            console.log(article.error)
            // return article
            article.message = object.id
        }
        object.article = article.message

        // return {...object, url: undefined}
        if (info === "full") return object // { id, name, url, price, characteristics, description, category, images, article }
        else return object[info]
        
    }

    // 
    async add(number) {

        let object = await this.search(number) // object = { id, name, url, price, characteristics, description, category, images, article }
        // необходимо добавить { brandId, categoryId, have, country, files, info }

        if (object.error !== undefined) return object

        // console.log(" ");
        // console.log("object",object);
        // console.log(" ");

        // преобразуем объект object
        let { name, price, characteristics, description, category, images, article } = object

        article = "rgk" + article

        let prod = await findProductByArticle(article)
        if (prod) {
            console.log("Такой товар уже есть: ",article);
            return "Такой товар уже есть!" // если необходимо обновить товары, то эту строчку надо закомментировать
        }

        if (characteristics) 
            characteristics = characteristics
                .replace(/(<tr><td><\/td><\/tr>)/g, "")
                .replace(/(<tr><td> <\/td><\/tr>)/g, "")
                .replace(/(<tr><td>  <\/td><\/tr>)/g, "")
                .replace(/(<tbody><\/tbody>)/g, "")

        let brand
        try {
            brand = await Brand.findOne({
                where: {name: "RGK"}
            })
        }catch(e) {
            return { error: "Ошибка: бренд не найден!!!" }
        }
        let brandId

        if (brand.id !== undefined) brandId = brand.id
        else return { error: "Ошибка: бренд не найден!" }
        
        let categoryClass
        try {
            categoryClass = await Category.findOne({
                where: {name: category}
                // where: {id: 272}
            })
        }catch(e) {
            return { error: "Ошибка: категория " + category + " не найдена!!!" }
        }
        
        let categoryId
        
        if (categoryClass.id !== undefined) categoryId = categoryClass.id
        else return { error: "Ошибка: категория не найдена!" }
        
        createFoldersAndDeleteOldFiles("rgk", article)

        let link = ""
        images.forEach(i => {
            let fileName = uuid.v4() + '.jpg'
            
            let file = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'big', fileName))
            let file2 = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', article, 'small', fileName))
            https.get(i, function(res) {
                res.pipe(file)
                res.pipe(file2)
            })

            link = link + `{"big": "rgk/${article}/big/${fileName}", "small": "rgk/${article}/small/${fileName}"},`
        })

        let files = `[${link.replace(/.$/g, "")}]`

        let info = []
        if (description) info.push({title:"description",body:description})
        if (characteristics) info.push({title:"characteristics",body:characteristics})

        let country = "Россия"

        let have = 1

        let promo = undefined
        
        let size = undefined
        
        let urlTranslite = translite(name) + "_" + article.toString()

        // console.log(" ");
        // console.log("id",id);
        // console.log(" ");
        
        // response = { name, url: urlTranslite, price, have, article, promo, country, brandId, categoryId, files, info, size }
        
        let product
        try {
            product = await createProduct(name, urlTranslite, price, have, article, promo, country, brandId, categoryId, files, info, size)
        }catch(e) {
            return { error: "Ошибка: не смог добавить товар!!!" }
        }

        return product
    }


}