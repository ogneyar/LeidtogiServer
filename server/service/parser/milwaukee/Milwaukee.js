const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const { Product } = require('../../../models/models')


module.exports = class Milwaukee {
    
    static brand // наименование бренда
    static workbook // рабочая книга
    static worksheet // рабочая вкладка
    static start // стартовая позиция (номер строки)
    static articleSymbol // имя столбца артикула (A, B, C,..)
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
                    if (value.includes("Артикул")) {
                        this.start = number + 1
                        this.articleSymbol = array[i]
                        continue
                    }
                    if (value.includes("Цена")) {
                        this.priceSymbol = array[i]
                        break
                    }
                }

            }
        }
        
        if ( ! this.articleSymbol || ! this.priceSymbol ) return false

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

        let article, price
        article = this.worksheet[ this.articleSymbol + ( this.start + Number(number) - 1 ) ]
        price = this.worksheet[ this.priceSymbol + ( this.start + Number(number) - 1 ) ]

        if ( ! article || ! price ) return "Ошибка, не найдены записи."

        return { 
            article: article.v,
            price: price.v,
        }
    }


    async changePrice(number) {

        let { article, price } = await this.print(number)
        let response

        const product = await Product.findOne({
            where: { article }
        })
        if (product) {
            if (Number(price) === Number(product.price)) return `Артикул: ${article}. Цена не изменилась.`
            // response = await Product.update({ price }, {
            //     where: { id: product.id }
            // })
            response = true
            
            if (response) return `Артикул: ${article}. Старая цена: ${product.price}. Новая цена: ${price}`
        }else {
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
        
        return array
    }


}