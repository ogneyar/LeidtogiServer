const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')
const encoding = require('encoding')

const { Product } = require('../../../models/models')


module.exports = class Milwaukee {
    
    static brand // наименование бренда
    static workbook // рабочая книга
    static worksheet // рабочая вкладка
    static start // стартовая позиция (номер строки)
    static categorySymbol // имя столбца категория (A, B, C,..)
    static groupSymbol // имя столбца группа (A, B, C,..)
    static articleSymbol // имя столбца артикула (A, B, C,..)
    static modelSymbol // имя столбца модель (A, B, C,..)
    static priceSymbol // имя столбца цены (A, B, C,..)

    
    constructor() {
        this.brand = "milwaukee"
    }

    async run() {

        let feed

        feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'milwaukee', 'feed.xlsx')
        // console.log("fullResponse: ",fullResponse)
        if (fs.existsSync(feed)) {
            this.workbook = XLSX.readFile(feed)
        }else {
            return { error: "Файл milwaukee/feed.xlsx отсутствует или пуст!" }
        }

        let first_sheet_name = this.workbook.SheetNames[0] // наименование первой вкладки
        this.worksheet = this.workbook.Sheets[first_sheet_name] // рабочая вкладка

        let array = ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]
        for (let number = 1; number <= 20; number++) {
            for (let i = 0; i < array.length; i++) {
                let address = array[i] + number // A1, B1, .., K1, A2, B2, ... 
                let desired = this.worksheet[address] // искомое
                let value = (desired ? desired.v : undefined)

                if (value && typeof(value) === "string") {
                    if (value.includes("Категория")) {
                        this.start = number + 1
                        this.categorySymbol = array[i]
                        continue
                    }
                    if (value.includes("Группа")) {
                        this.groupSymbol = array[i]
                        continue
                    }
                    if (value.includes("Артикул")) {
                        this.articleSymbol = array[i]
                        continue
                    }
                    if (value === "Модель") {
                        this.modelSymbol = array[i]
                        continue
                    }
                    if (value.includes("Цена")) {
                        this.priceSymbol = array[i]
                        break
                    }
                }

            }
        }
        
        if ( ! this.articleSymbol || ! this.priceSymbol || ! this.categorySymbol || ! this.groupSymbol || ! this.modelSymbol ) return false
        
        // console.log(" ");
        // console.log("start", this.start);
        // console.log("articleSymbol", this.articleSymbol);
        // console.log("priceSymbol", this.priceSymbol);
        // console.log(" ");
        
        // console.log("article", this.worksheet[this.articleSymbol+this.start].v);
        // console.log("price", this.worksheet[this.priceSymbol+this.start].v); 
        // console.log(" ");

        return true

    }
    
    // количество записей
    async getLength() {

        let value, article = "", number = 0

        do {
            value = this.worksheet[ this.articleSymbol + ( this.start + number ) ]
            if (value) article = value.v
            else article = ""

            number++
        }while(article)

        return number - 1
    }

    // одна запись
    async getOne(number) { // number - номер строки
        
        let object, string

        object = await this.print(number)
        
        if (object.article) {
            string = `${number}. Товар с артикулом ${object.article} стоит ${object.price}.`
            console.log('\x1b[34m%s\x1b[0m', string)
        }else {
            string = `${number}. ${object}`
            console.log('\x1b[33m%s\x1b[0m', string)
        }

        return object
        // return string
    }

    // часть записей
    async getPart(number, party) { // number - номер начальной строки, party - количество строк
        
        let array = [], object, string, response = ""

        for(let i = Number(number); i < Number(number) + Number(party); i++) {

            object = await this.print(i)
        
            if (object.article) {
                string = `${i}. Товар с артикулом ${object.article} стоит ${object.price}.`
                // console.log('\x1b[34m%s\x1b[0m', string)
            }else {
                string = `${i}. ${object}`
                // console.log('\x1b[33m%s\x1b[0m', string)
            }

            response += string + "<br />"
            array.push(object)
        }

        return array
    }

    // все записи
    async getAll() { 
        return await this.getPart(1, await this.getLength())
    }
    
    // вывод данных
    async print(number) {

        let article = this.worksheet[ this.articleSymbol + ( this.start + Number(number) - 1 ) ]
        let price = this.worksheet[ this.priceSymbol + ( this.start + Number(number) - 1 ) ]
        let category = this.worksheet[ this.categorySymbol + ( this.start + Number(number) - 1 ) ]
        let group = this.worksheet[ this.groupSymbol + ( this.start + Number(number) - 1 ) ]
        let model = this.worksheet[ this.modelSymbol + ( this.start + Number(number) - 1 ) ]

        if ( ! article || ! price || ! category || ! group || ! model ) return "Ошибка, не найдены записи."

        return { 
            article: article.v,
            price: price.v,
            category: category.v,
            group: group.v,
            model: model.v,
        }
    }


    async changePrice(number) {

        let print = await this.print(number)
        if (print.article === undefined) return { article: undefined, update: "warning" }

        let { article, price, category, group, model } = print
        let response

        const product = await Product.findOne({
            where: { article }
        })
        if (product) {
            if (Number(price) === Number(product.price)) {
                return { article, update: "no" }
                return `Артикул: ${article}. Цена не изменилась.`
            }
            // response = await 
            Product.update({ price }, {
                where: { id: product.id }
            })
            // response = true
            
            // if (response) {
                return { article, update: "yes" }
                return `Артикул: ${article}. Старая цена: ${product.price}. Новая цена: ${price}`
            // }else {
            //     return { article, update: "error" }
            //     return `Артикул: ${article}. Не смог внести новую цену: ${price}`
            // }
        }else {
            return { article, category, group, model, price, update: "unknown" }
            return `Артикул: ${article}. Такого товара нет.`
        }
        
    }


    async changePriceAll() {

        let length, array = [], string = ""

        length = await this.getLength()

        for (let number = 1; number <= length; number++) {
            string = await this.changePrice(number)
            array.push(string)
        }

        let urlChange, urlUnknown, urlError

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

        let text = "Категория;Группа;Артикул;Модель;Цена;Ссылка\r\n" + array.map(i => {
            if (i.update === "unknown") {
                return `"${i.category.replace(/\"/g, "&quot;")}";"${i.group.replace(/\"/g, "&quot;")}";"${i.article}";"${i.model.replace(/\"/g, "&quot;")}";"${i.price}";\r\n`
            }
            return null
        }).filter(j => j !== null).join("")

        // try {
        //     fs.writeFileSync( unknown, encoding.convert(text, 'WINDOWS-1251', 'UTF-8') )
        //     urlUnknown = `<a href="${process.env.URL}/info/milwaukee/${folderName}/unknown.csv" >unknown.csv</a><br />`
        // }catch(e) {
        //     urlUnknown = `Создать файл unknown.csv не удалось.<br />`
        // }
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

        // let error = path.resolve(__dirname, '..', '..', '..', 'static', 'info', 'milwaukee', folderName, 'error.json')
        // try {
        //     fs.writeFileSync(error, "[" + array.map(i => {
        //         if (i.update === "error" || i.update === "warning") {
        //             return "\n    " + JSON.stringify(i)
        //         }
        //         return null
        //     }).filter(j => j !== null) + "]")
        //     urlError = `<a href="${process.env.URL}/info/milwaukee/${folderName}/error.json" >error.json</a>`
        // }catch(e) {
        //     urlError = `Создать файл error.json не удалось.`
        // }

        // return array
        // return urlChange + urlUnknown + urlError
        return urlChange + urlUnknown
    }


}