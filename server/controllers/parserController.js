const fs = require('fs')
const path = require('path')
const axios = require('axios')
const XLSX = require('xlsx')
const iconv = require('iconv-lite')

const ApiError = require('../error/apiError')
// const { Brand, Category } = require('../models/models')

const getUrlVseinstrumenti = require('../service/parser/milwaukee/getUrlVseinstrumenti.js')
const getArrayImages = require('../service/parser/milwaukee/getArrayImages.js')
const getSizes = require('../service/parser/milwaukee/getSizes.js')
const getPrice = require('../service/parser/milwaukee/getPrice.js')
const getUrlMlkShop = require('../service/parser/milwaukee/getUrlMlkShop.js')
const getDescription = require('../service/parser/milwaukee/getDescription.js')
const getCharacteristics = require('../service/parser/milwaukee/getCharacteristics.js')
const getEquipment = require('../service/parser/milwaukee/getEquipment.js')
const getAllData = require('../service/parser/milwaukee/getAllData.js')

// const createProduct = require('../service/product/createProduct.js')
const addNewProduct = require('../service/xlsx/addNewProduct')

const getLink = require('../service/parser/husqvarna/getLink')
const getImage = require('../service/parser/husqvarna/getImage')
const getArticle = require('../service/parser/rgk/getArticle')


class parserController {

    async getImages(req, res, next) {
        try {
            let { brand, article } = req.query  // milwaukee, 4933471077
            let response, Html

            // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
            await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
                what: article
            }}).then(res => Html = res.data)
            
            Html = getUrlVseinstrumenti(Html, article)

            if (!Html) return res.send(null)
            
            // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
            response = "https://rostov.vseinstrumenti.ru" + Html

            await axios.get(response)
                .then(res => Html = res.data)
            
            response = getArrayImages(brand, article, Html)
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getImages!'));
        }

        return res.json(response) // return array 
    }

    
    async getSizes(req, res, next) {
        try {
            let { article } = req.query  // milwaukee, 4933471077
            let response, Html

            // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
            await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
                what: article
            }}).then(res => Html = res.data)
            
            Html = getUrlVseinstrumenti(Html, article)

            if (!Html) return res.send(null)
            
            // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
            response = "https://rostov.vseinstrumenti.ru" + Html

            await axios.get(response)
                .then(res => Html = res.data)
            
            response = getSizes(Html)
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getSizes!'));
        }
        
        return res.json(response) // return array 
    }
    

    async getPrice(req, res, next) {
        try {
            let { article } = req.query  // milwaukee, 4933451439
            let string

            // https://mlk-shop.ru/search?search=4933451439
            await axios.get('https://mlk-shop.ru/search', {params: {
                search: article
            }}).then(res => string = res.data)
            
            if (!string) return {error:'Не сработал axios.get(https://mlk-shop.ru/search)',string}

            string = getPrice(string)
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getPrice!'));
        }
                
        return res.json(string) 
    }
    

    async getDescription(req, res, next) {
        try {
            let { article } = req.query  // milwaukee, 4933451439
            let string

            // https://mlk-shop.ru/search?search=4933451439
            await axios.get('https://mlk-shop.ru/search', {params: {
                search: article
            }}).then(res => string = res.data)
            
            if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

            string = getUrlMlkShop(string)

            if (string.error !== undefined) return res.send(string)

            // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
            await axios.get(string.message).then(res => string = res.data)

            if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
            
            string = getDescription(string)
            
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getDescription!'));
        }

        return res.send(string)                
    }

    async getCharacteristics(req, res, next) {
        try {
            let { article } = req.query  // milwaukee, 4933451439
            let string

            // https://mlk-shop.ru/search?search=4933451439
            await axios.get('https://mlk-shop.ru/search', {params: {
                search: article
            }}).then(res => string = res.data)
            
            if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

            string = getUrlMlkShop(string)

            if (string.error !== undefined) return res.send(string)

            // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
            await axios.get(string.message).then(res => string = res.data)

            if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
            
            string = getCharacteristics(string)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getCharacteristics!'));
        }

        return res.send(string)                
    }
    

    async getEquipment(req, res, next) {
        try {
            let { article } = req.query  // milwaukee, 4933451439
            let string

            // https://mlk-shop.ru/search?search=4933451439
            await axios.get('https://mlk-shop.ru/search', {params: {
                search: article
            }}).then(res => string = res.data)
            
            if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

            string = getUrlMlkShop(string)

            if (string.error !== undefined) return res.send(string)

            // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
            await axios.get(string.message).then(res => string = res.data)

            if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
            
            string = getEquipment(string)

        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода getEquipment!'));
        }

        return res.send(string)
    }


    async getAll(req, res, next) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response

        try{
            response = await getAllData(brand, article)

            return res.json(response) // return array 

        }catch(e) {
            return res.json({error:e})
        }
    }

    async mailRu(req, res, next) {
        try {
            let { email } = req.query
            let response
            
            await axios.post("https://e.mail.ru/api/v1/user/password/restore", { email })
                .then(res => response = res.data)
                .catch(err => response = err)
            
            return res.json(response)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода mailRu!'));
        }
    }

    async yaRu(req, res, next) {
        try {
            let { email } = req.query
            let response
            await axios.post("https://passport.yandex.ru/registration-validations/auth/multi_step/start", { login:email })
                .then(res => response = res.data)
                .catch(err => response = err)
            return res.json(response)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода yaRu!'));
        }
    }


    
    async parseXLSX(req, res, next) {
        let { brand, number, party } = req.query
        let product, message, response

        let workbook = XLSX.readFile('newMILWAUKEE.xlsx')

        for(let i = Number(number); i < Number(number)+Number(party); i++) {

            try{
                product = await addNewProduct(workbook,brand,i)
            }catch(e) {
                product = e
            }
        
            if (product.article) {
                message = `${i}. Товар с артикулом ${product.article} добавлен.`
                console.log('\x1b[34m%s\x1b[0m', message)
            }else {
                message = `${i}. Ошибка: ${product}`
                console.log('\x1b[33m%s\x1b[0m', message)
            }
    
            message = message + "<br />"
            if (response) response = response + message
            else response = message

        }

        return res.send(response)
    }
    
// color text console

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"
    
    async husqvarnaGetImage(req, res, next) {
        try {
            let { article } = req.query // 9678968-01
            let response, link
            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            
            if (response.error !== undefined) return res.json(response.error)
            
            link = getLink(response)
            if (link.message !== undefined) {
                await axios.get("http://shop.plus-kpd.ru" + link.message)
                .then(res => response = res.data)
                .catch(err => response = err)
            }
            
            if (response.error !== undefined) return res.json(response.error)

            link = getImage(response)
            if (link.message !== undefined) return res.json("http://shop.plus-kpd.ru" + link.message)

            return res.json(response)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода husqvarna!'));
        }
    }

    async husqvarnaGetCharcteristic(req, res, next) {
        try {
            let { article } = req.query // 9678968-01
            let response, link
            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            
            if (response.error !== undefined) return res.json(response.error)
            
            return res.json(response)
            
            link = getLink(response)
            if (link.message !== undefined) {
                await axios.get("http://shop.plus-kpd.ru" + link.message)
                .then(res => response = res.data)
                .catch(err => response = err)
            }
            
            if (response.error !== undefined) return res.json(response.error)

            link = getImage(response)
            if (link.message !== undefined) return res.json("http://shop.plus-kpd.ru" + link.message)

            return res.json(response)
        }catch(e) {
            // return next(ApiError.badRequest('Ошибка метода husqvarna!'))
            return next(res.json({error: 'Ошибка метода husqvarna!'}))
        }
    }

    async rgk(req, res, next) {
        try {
            let response
            
            // response = await axios.get("http://www.rgk-tools.com/direct_feed.php")

            response = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'rgk', 'feed.csv'))
            
            // Convert from an encoded buffer to a js string.
            let str = iconv.decode(response, 'win1251')

            response = str
                .replace(/(&quot;)/g, "\'\'")
                .replace(/(&Prime;)/g, "\`")
                // .replace(/(&amp;lt;p&amp;gt;)/g, "<p>")
                // .replace(/(&amp;lt;\/p&amp;gt;)/g, "</p>")
                .replace(/(&amp;)/g, "&")
                .replace(/(&lt;)/g, "<")
                .replace(/(&gt;)/g, ">")
                .replace(/(; )/g, "_$_$_$_")

            response = response.split('\n')
            
            let category
            let yes = false

            category = response.map(i => {

                let text = i.split(";")
                
                if (text[0] === `"category id"`) {
                    yes = true
                }else if (text[0] === `"offer id"`) {
                    yes = false
                }else if (yes) {
                    return {id: text[0], name: text[1].replace(/\"/g, "").replace(/(\r)/g, "")}
                    // return {id: text[0], name: text[1]}
                }
                return null
            }).filter(j => j !== null)

            let product
            yes = false
            let array = []
            let length
            let memory
            let memoryYes = false

            product = response.map(i => {

                let text = i.split(";")
                
                if (text[0] === `"offer id"`) {
                    length = text.length
                    yes = true
                    array = text.map(j => {
                        // console.log(j.replace(/\"/g, ""))
                        return j.replace(/\"/g, "")
                    })
                    // array = [...text]
                    
                }else if (yes) {
                    if (memoryYes) {

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
                        // console.log(length)
                        memory = [...text]
                        memoryYes = true
                        return null
                    }else {
                        memoryYes = false
                    }

                    let m = 0
                    const arrMap = new Map();

                    array.forEach(k => {
                        arrMap.set(k.replace(/(\r)/g, ""),text[m++].replace(/(\r)/g, ""))
                    })

                    return arrMap
                    
                    return arrMap.get('offer id')

                    return "{"+array
                        .map(k => {
                            // return k
                            return `"${k.replace(/(\r)/g, "")}": "${text[m++].replace(/(\r)/g, "")}"`
                        })
                        .join(", ")+"}"

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
                    // "offer category": text[13].replace(/\"/g, "").replace(/(\r)/g, "")
                    
                }
                return null
            }).filter(j => j !== null)




            // Ниже описаны примеры вывода данных

            let search
            search = true
            // search = false
            if (search) { // вывод искомой записи (offer description)

                let searchValue = 68
                let strResponse = "null"
                let ye = false
                product.forEach(itog => {
                    itog.forEach((value,key) => {
                        if (key === "offer id" && value == searchValue) {
                            ye = true
                        }
                        if (ye === true && key === "offer url") {
                            strResponse = value
                            ye = false
                        }
                    })
                })
                
                let html
                await axios.get(strResponse + "/")
                    .then(res => html = res.data)
                // return res.send(html)

                let article = getArticle(html)

                if (article.error !== undefined) {
                    return res.json("Ошибка: " + article.error)
                }

                return res.json(article.message)

                // return res.redirect(strResponse + "/")
                return res.json(strResponse)
                return res.send(strResponse)
            }

            let arrayResponse = []
            let stringResponse = '['

            // let one = true
            let one = false
            if (!one) { // вывод всех записей или только одной

                product.forEach(itog => {
                    stringResponse += '{'
                    itog.forEach(function(value,key) {
                        stringResponse += '"' + key +'": "' + value + '",'
                    })
                    stringResponse = stringResponse.replace(/.$/, "") + '},'
                })

            }else { //  или только одной

                stringResponse += '{'
                product[product.length-3].forEach(function(value,key) {
                    stringResponse += '"' + key +'": "' + value + '",'
                })
                stringResponse = stringResponse.replace(/.$/, "") + '},'

            }

            stringResponse = stringResponse.replace(/.$/, "") + ']'

            return res.json(stringResponse)
            
            return res.json(category)

        }catch(e) {
            return next(res.json({error: 'Ошибка метода rgk!'}))
        }
    }


}

module.exports = new parserController()