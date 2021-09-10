const axios = require('axios')
const XLSX = require('xlsx')

// const ApiError = require('../error/apiError')
// const { Brand, Category } = require('../models/models')

const getUrlVseinstrumenti = require('../service/parser/getUrlVseinstrumenti.js')
const getArrayImages = require('../service/parser/getArrayImages.js')
const getSizes = require('../service/parser/getSizes.js')
const getPrice = require('../service/parser/getPrice.js')
const getUrlMlkShop = require('../service/parser/getUrlMlkShop.js')
const getDescription = require('../service/parser/getDescription.js')
const getCharacteristics = require('../service/parser/getCharacteristics.js')
const getEquipment = require('../service/parser/getEquipment.js')
const getAllData = require('../service/parser/getAllData.js')

// const createProduct = require('../service/product/createProduct.js')
const addNewProduct = require('../service/xlsx/addNewProduct')


class parserController {

    async getImages(req, res) {
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

        return res.json(response) // return array 
    }

    
    async getSizes(req, res) {
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
        
        return res.json(response) // return array 
    }
    

    async getPrice(req, res) {
        let { article } = req.query  // milwaukee, 4933451439
        let string

        // https://mlk-shop.ru/search?search=4933451439
        await axios.get('https://mlk-shop.ru/search', {params: {
            search: article
        }}).then(res => string = res.data)
        
        if (!string) return {error:'Не сработал axios.get(https://mlk-shop.ru/search)',string}

        string = getPrice(string)
                
        return res.json(string) 
    }
    

    async getDescription(req, res) {
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

        return res.send(string)                
    }

    async getCharacteristics(req, res) {
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

        return res.send(string)                
    }
    

    async getEquipment(req, res) {
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

        return res.send(string)                
    }


    async getAll(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response

        try{
            response = await getAllData(brand, article)

            return res.json(response) // return array 

        }catch(e) {
            return res.json({error:e})
        }
    }


    async parseXLSX(req, res) {
        // let { brand } = req.query
        let product, message, response

        let workbook = XLSX.readFile('newMILWAUKEE.xlsx')

        for(let i = 200; i < 300; i++) {

            try{
                product = await addNewProduct(workbook,i)
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

        message = `Закончил.`
        console.log('\x1b[32m%s\x1b[0m', message)
        if (response) response = response + message
        else response = message

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



    async mailRu(req, res) {
        let { email } = req.query
        let response
        // let config = {
        //     host: "e.mail.ru",
        //     headers: {
        //         "Cookie": "mrcu=615E6129F2B1975A5B53E64C3BB0",
        //         "Origin": "https://e.mail.ru"
        //     }
        //   }

        // await axios.post("https://e.mail.ru/api/v1/user/password/restore", { email }, config)
        await axios.post("https://e.mail.ru/api/v1/user/password/restore", { email })
            .then(res => response = res.data)
            .catch(err => response = err)
        
        return res.json(response)
    }

    async yaRu(req, res) {
        let { email } = req.query
        let response
        await axios.post("https://passport.yandex.ru/registration-validations/auth/multi_step/start", { login:email })
            .then(res => response = res.data)
            .catch(err => response = err)
        return res.json(response)
    }
}

module.exports = new parserController()