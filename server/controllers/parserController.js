
const axios = require('axios')
const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')
const Math = require('mathjs')
const iconv = require('iconv-lite')
const encoding = require('encoding')

const { ProductSize, Product } = require('../models/models')
const ApiError = require('../error/apiError')

const getUrlVseinstrumenti = require('../service/parser/milwaukee/getUrlVseinstrumenti.js')
const getArrayImages = require('../service/parser/milwaukee/getArrayImages.js')
const getSizes = require('../service/parser/milwaukee/getSizes.js')
const getPrice = require('../service/parser/milwaukee/getPrice.js')
const getUrlMlkShop = require('../service/parser/milwaukee/getUrlMlkShop.js')
const getDescription = require('../service/parser/milwaukee/getDescription.js')
const getCharacteristics = require('../service/parser/milwaukee/getCharacteristics.js')
const getEquipment = require('../service/parser/milwaukee/getEquipment.js')
const getAllData = require('../service/parser/milwaukee/getAllData.js')

const addNewProduct = require('../service/xlsx/addNewProduct')

const getLink = require('../service/parser/husqvarna/getLink')
const getImage = require('../service/parser/husqvarna/getImage')

const RGK = require('../service/parser/rgk/RGK')

const Milwaukee = require('../service/parser/milwaukee/Milwaukee')
const getProducts = require('../service/csv/parse')

const parse = require('../service/xlsx/parse')


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

    // временный роут РусГеоКом
    async rgkTemp(req, res, next) {
        let size, workbook, worksheet, response = []

        size = path.resolve(__dirname, '..', 'static', 'temp', 'rgk', 'size.xlsx')
        // console.log("fullResponse: ",fullResponse)
        if (fs.existsSync(size)) {
            workbook = XLSX.readFile(size)
        }else {
            return next(res.json({ error: "Файл rgk/size.xlsx отсутствует или пуст!" }))
        }
        
        let first_sheet_name = workbook.SheetNames[0] // наименование первой вкладки
        worksheet = workbook.Sheets[first_sheet_name] // рабочая вкладка
        
        
        let len = 317
        let desired, article, weight, length, width, height, volume

        for(let number = 2; number <= len; number++) {
            desired = worksheet["A" + number] // артикул
            article = "rgk" + (desired ? desired.v : undefined)

            desired = worksheet["F" + number] // вес
            weight = (desired ? desired.v : undefined)
            weight = Math.round((Number(weight) / 1000), 2)

            desired = worksheet["G" + number] // длина
            length = (desired ? desired.v : undefined)

            desired = worksheet["H" + number] // ширина
            width = (desired ? desired.v : undefined)

            desired = worksheet["I" + number] // высота
            height = (desired ? desired.v : undefined)
            
            volume = Math.round(((Number(length) /1000) * (Number(width) /1000) * (Number(height) /1000)), 4)
            
            // 
            let product = await Product.findOne({
                where: { article }
            })
            let have = false
            if (product && product.id !== undefined) {
                have = true
                let product_size = await ProductSize.findOne({
                    where: { productId: product.id }
                })
                if ( ! product_size ) {
                    weight = weight.toString().replace(',', '.')
                    volume = volume.toString().replace(',', '.')
                    width = width.toString().replace(',', '.')
                    height = height.toString().replace(',', '.')
                    length = length.toString().replace(',', '.')
                    ProductSize.create({
                        weight,
                        volume,
                        width,
                        height,
                        length,
                        productId: product.id 
                    })
                }
            }

            response.push({ article, weight, length, width, height, volume, have })
        }

        return res.json(response)
        // return res.json({ article, weight, length, width, height, volume })


    }

    // РусГеоКом
    async rgk(req, res, next) {
        try {
            let { 
                update, // если передан параметр update (с любым значением), значит необходимо обновить файл feed.csv
                change, // если передан параметр change (с любым значением), значит необходимо обновить цену  - в этом случае параметр number обязателен 
                print,  // если передан параметр print=product, значит необходимо вывести на экран информацию о товарах
                        // если передан параметр print=category, значит необходимо вывести на экран информацию о категориях
                field,  // если передан параметр field, значит необходимо вывести информацию о заданном поле (например: field=article) - в этом случае параметр number обязателен 
                number  // если передан параметр number без параметра field, значит необходимо добавить в БД товар по очереди под номером number
            } = req.query

            let response, rgk
            // создание экземпляра класса RGK
            rgk = new RGK()
            // обновление файла feed.csv
            if (update) await rgk.update() 
            // обработка данных файла feed.csv
            response = await rgk.run()
            if (response.error !== undefined) return res.json(response) // вывод ошибки
            // обновление цен
            if (change) {
                if (number) return res.json(await rgk.changePrice(Number(number)))
                else return next(res.json({error: 'Ошибка, не задан number при заданном параметре change!'}))
            }
            // вывод информации на экран
            if (print) {
                if (print === "category") return res.json(await rgk.print("category")) // все категории
                if (print === "product") return res.json(await rgk.print("product")) // все товары
            }
            // вывод на экран конкретной записи (например: field = "article")
            if (field) {
                if (number) return res.json(await rgk.search(Number(number), field))
                else return next(res.json({error: 'Ошибка, не задан number при заданном field!'}))
            }
            // добавление нового товара
            if (number) {
                response = await rgk.add(Number(number))
                
                if (response && response.error === undefined) return res.json(number)
                else return next(res.json({error: `Не смог сохранить товар, ${number} по очереди!` + response.error ? " " + response.error : ""}))
            }
            // вывод на экран общего количества товаров (например: 372)
            return res.json(await rgk.getLengthProducts()) 

        }catch(e) {
            return next(res.json({error: 'Ошибка метода rgk!'}))
        }
    }

    
    async mlkTemp(req, res, next) {
        let feed, workbook, worksheet, response = []
        
        feed = path.resolve(__dirname, '..', 'prices', 'milwaukee', 'old', 'newMILWAUKEE.xlsx')
        // console.log("fullResponse: ",fullResponse)
        if (fs.existsSync(feed)) {
            workbook = XLSX.readFile(feed)
        }else {
            return { error: "Файл milwaukee/old/newMILWAUKEE.xlsx отсутствует или пуст!" }
        }

        let first_sheet_name = workbook.SheetNames[0] // наименование первой вкладки
        worksheet = workbook.Sheets[first_sheet_name] // рабочая вкладка

        let start, articleSymbol, categorySymbol
        
        let array = ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]
        for (let number = 1; number <= 20; number++) {
            if (articleSymbol && categorySymbol) break
            for (let i = 0; i < array.length; i++) {
                let address = array[i] + number // A1, B1, .., K1, A2, B2, ... 
                let desired = worksheet[address] // искомое
                let value = (desired ? desired.v : undefined)

                if (value && typeof(value) === "string") {
                    if (value.includes("Артикул")) {                        
                        start = number + 1
                        articleSymbol = array[i]
                        continue
                    }
                    if (value.includes("Категории")) {
                        categorySymbol = array[i]
                        continue
                        break
                    }
                }

            }
        }
        let article, category
        for (let i = 1; i <= 4676; i++) {
            article = worksheet[ articleSymbol + ( start + Number(i) - 1 ) ].v
            category = worksheet[ categorySymbol + ( start + Number(i) - 1 ) ].v

            response.push({article, category})
        }

        let fullResponse

        feed = path.resolve(__dirname, '..', 'static', 'info', 'milwaukee', '2022.1.22_18.23', 'unknown.csv')
        // console.log("fullResponse: ",fullResponse);
        if (fs.existsSync(feed) && iconv.decode(fs.readFileSync(feed), 'win1251') !== "") {
            fullResponse = fs.readFileSync(feed)
        }else {
            return { error: "Файл info/milwaukee/2022.1.22_18.23/unknown.csv отсутствует или пуст!" }
        }
        
        // Convert from an encoded buffer to a js string.
        fullResponse = iconv.decode(fullResponse, 'win1251')
        
        let products = getProducts(fullResponse, `Категория`)

        if (products.error !=undefined) return res.json(products)

        let response2 = products.message

        let text = "Категория;Группа;Артикул;Модель;Цена;Ссылка\r\n" + response2.map(i => {
            let article = i["Артикул"]
            let url = ""
            response.forEach(j => {
                if (Number(j.article) === Number(article)) url = j.category
            })
            return `${i["Категория"]};${i["Группа"]};${article};"${i["Модель"] && i["Модель"].replace(/\"/g, "&quot;")}";${i["Цена"]};${url}\r\n`
        }).join("")

        let unknown = path.resolve(__dirname, '..', 'static', 'temp', 'mlk', 'unknown.csv')
        let urlUnknown
        try {
            fs.writeFileSync( unknown, encoding.convert(text, 'WINDOWS-1251', 'UTF-8') )
            urlUnknown = `${process.env.URL}/temp/mlk/unknown.csv`
        }catch(e) {
            urlUnknown = `Создать файл unknown.csv не удалось.`
        }

        return res.json(urlUnknown)
    }


    async milwaukee(req, res, next) {

        let { all, party, change, number } = req.query

        let mlk = new Milwaukee()
        let response = await mlk.run()

        if (response) {

            if (all) return res.json(await mlk.getAll())

            if (party) {
                if (number) return res.json(await mlk.getPart(number, party))
                else return next(res.json({error: 'Ошибка, не задан number при заданном party!'}))
            }
            // обновление цен 
            if (change) {
                if (number) return res.json(await mlk.changePrice(number))
                else return res.json(await mlk.changePriceAll())
            }

            if (number) return res.json(await mlk.getOne(number))

            return res.json(await mlk.getLength())
        }

        return res.json(false)
    }

    async temp(req, res, next) {

        let response = await parse(
            path.resolve(__dirname, '..', 'prices', 'milwaukee', 'feed.xlsx'),
            [
                "Артикул",
                "Модель",
                "Цена с учетом НДС, руб."
            ]
        )

        return res.json(response)
    }


}

module.exports = new parserController()