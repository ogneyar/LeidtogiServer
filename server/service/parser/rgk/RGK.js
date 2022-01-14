const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const axios = require('axios')

const getArticle = require('./getArticle')
const getImages = require('./getImages')


module.exports = class RGK {
    
    static url = process.env.RGK_FEED_URL
    static category = []
    static product = []
    
    constructor() {
        // this.main().than(data => this.hz = data)
    }

    async run() {
        let response, array, yes, length, memory, memoryYes
        
        // response = await axios.get(this.url)
        response = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'static', 'rgk', 'feed.csv'))
        
        // Convert from an encoded buffer to a js string.
        let str = iconv.decode(response, 'win1251')

        response = str
            .replace(/(&amp;)/g, "&")
            .replace(/(&quot;)/g, "\'\'")
            .replace(/(&Prime;)/g, "\`")
            .replace(/(&rdquo;)/g, "\`\`")
            .replace(/(&lt;)/g, "<")
            .replace(/(&gt;)/g, ">")
            .replace(/(; )/g, "_$_$_$_")

        response = response.split('\n')
        
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
        
        // return this.category

        // поиск товаров
        yes = false
        array = []
        memoryYes = false
        this.product = response.map(i => {
            let text = i.split(";")
            if (text[0] === `"offer id"`) {
                length = text.length
                yes = true
                array = text.map(j => {
                    return j.replace(/\"/g, "")
                })
            }else if (yes) {
                if (memoryYes) { // если была запись в память

                    memory = memory.map((b, index) => {
                        if (index + 1 === memory.length) { // если элемент последний
                            if (text.length === 2 ) {
                                return b + text[0] + ";" + text[1]
                            }
                            return b + text[0]
                        }
                        return b
                    })
                    text.forEach((g, index) => {
                        if (text.length === 2 ) {
                            if (index !== 0 && index !== 1) {
                                memory = [...memory, g]
                            }
                        }else {
                            if (index !== 0) {
                                memory = [...memory, g]
                            }
                        }
                    })
                    text = [...memory]
                    
                }
                if (length > text.length) {
                    memory = [...text]
                    memoryYes = true
                    return null
                }else {
                    memoryYes = false
                }

                let m = 0
                const arrMap = new Map();

                array.forEach(k => {
                    let data = k.replace(/(\r)/g, "")
                    let str = text[m++].replace(/(\r)/g, "").replace(/(\")/g, "")
                    if (data === "offer param") {
                        arrMap.set(data, str.split("_$_$_$_"))
                    }else if (data === "offer url") {
                        arrMap.set(data, str + "/")
                    }else if (data === "offer description") {
                        arrMap.set(data, str.replace(/(_\$_\$_\$_)/g, "; "))
                    }else {
                        arrMap.set(data, str)
                    }
                })

                // return arrMap.get('offer id')

                return arrMap
                
                return {
                    "offer id": text[0],
                    "available": text[1],
                    "offer name": text[2],
                    "offer full_name": text[3],
                    "offer type": text[4],
                    "offer vendor": text[5],
                    "offer url": text[6] + "/",
                    "offer price": text[7],
                    "offer picture": text[8],
                    "offer param": text[9],
                    "offer description": text[10],
                    "offer instructions": text[11],
                    "offer certificates": text[12],
                    "offer category": text[13]
                }
                
            }
            return null
        }).filter(j => j !== null)

        // return this.product
    }

    // вывод данных
    async print(action = "product", one = false) {
        let stringResponse

        if (action === "product") {
            stringResponse = '['
            // one = true
            if (!one) { // вывод всех записей или только одной
                this.product.forEach(itog => {
                    stringResponse += '{'
                    itog.forEach(function(value,key) {
                        stringResponse += '"' + key +'": "' + value + '",'
                    })
                    stringResponse = stringResponse.replace(/.$/, "") + '},'
                })
            }else { //  или только одной
                stringResponse += '{'
                this.product[product.length-3].forEach(function(value,key) {
                    stringResponse += '"' + key +'": "' + value + '",'
                })
                stringResponse = stringResponse.replace(/.$/, "") + '},'
            }
            stringResponse = stringResponse.replace(/.$/, "") + ']'
        }else if (action === "category") {
            stringResponse = this.category
        }

        return stringResponse

    }

    async getLengthProducts() {
        return this.product.length
    }

    // поиск данных
    async search(number = 1, info = "full") {

        // if (info === "full") {

            if ( ! this.product[number - 1].get('available')) return "Нет в наличие"
            let object = {}

            object.id = this.product[number - 1].get('offer id')
            // object.available = this.product[number - 1].get('available')
            // object.name = this.product[number - 1].get('offer name')
            object.name = this.product[number - 1].get('offer full_name')
            // object.type = this.product[number - 1].get('offer type')
            // object.vendor = this.product[number - 1].get('offer vendor')
            object.url = this.product[number - 1].get('offer url')
            object.price = this.product[number - 1].get('offer price')
            // object.picture = this.product[number - 1].get('offer picture')
            let characteristics = this.product[number - 1].get('offer param')
            object.description = this.product[number - 1].get('offer description')
            // object.instructions = this.product[number - 1].get('offer instructions')
            // object.certificates = this.product[number - 1].get('offer certificates')
            let categoryId = this.product[number - 1].get('offer category')

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

        // }
                
    }


}