const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const axios = require('axios')

const getArticle = require('./getArticle')
const getImages = require('./getImages')
const getProducts = require('./getProducts')


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

        if (number > this.product.length) return "Ошибка: такого номера не существует!"

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
        let characteristics = this.product[number - 1]['offer param'].split("; ")
        object.description = this.product[number - 1]['offer description'].replace(/(\r\n)/g, "")
        // object.instructions = this.product[number - 1]['offer instructions']
        // object.certificates = this.product[number - 1]['offer certificates']
        let categoryId = this.product[number - 1]['offer category']


        object.characteristics = "<tbody>" + characteristics.map(i => {
            return "<tr>" + i.replace("-", "#@").split(" #@ ").map(j => {
                return "<td>" + j.replace(/\?/g, "&lt;=") + "</td>"
            }).join("") + "</tr>"
        }).join("") + "</tbody>"

        this.category.forEach(i => {
            if (i.id === categoryId) object.category = i.name
        }) 

        let html

        await axios.get(object.url)
            .then(res => html = res.data)

        let images = getImages(html)
        if (images.error !== undefined) {
            return "Ошибка: " + images.error
        }
        object.images = images.message

        let article = getArticle(html)
        if (article.error !== undefined) {
            return res.json("Ошибка: " + article.error)
        }
        object.article = article.message

        // return {...object, url: undefined}
        if (info === "full") return object
        else return object[info]
                
    }


}