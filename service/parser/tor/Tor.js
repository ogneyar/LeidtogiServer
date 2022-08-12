//
const Math = require('mathjs')
const fs = require('fs')
const path = require('path')
const { Brand, Category, Product } = require('../../../models/models')
const createProduct = require('../../product/createProduct.js')
const parseXml = require('../../xml/parseXml')
const ProductDto = require('../../../dtos/productDto')
// const printOne = require('./printOne')



module.exports = class Tor {
    
    static product = []
    
    constructor() {}

    async run(args = {}) { 
        
        let { feed } = args

        let fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'tor', 'feed.xml')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'tor'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'tor'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'tor', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            // return "response"

            // let arrayColumnName = [ 
            //     "Артикул",
            //     "Наименование",
            //     "Цена",
            //     "Категория"
            // ]

            let response = await parseXml(fullPath)//, arrayColumnName)
            
            // if (response && Array.isArray(response)) {
            //     this.product = response.map(i => {
            //         let article, category, price, name
            //         article = i["Артикул"]
            //         name = i["Наименование"]
            //         price = i["Цена"]
            //         category = i["Категория"]
            //         return {
            //             article,
            //             name,
            //             price,
            //             category,
            //         }
            //     })
            //     return true
            // }
            this.product = response
            return true

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }


    // количество записей в feed.xml
    async getLength() {
        return this.product.length
    }


    // вывод данных на экран
    async print(number) {
        return this.product
         
        // let num = number - 1
        // let one = this.product[num]
        // // return one

        // let flag = true
        // do {
        //     if (one.name == "" || one.price == "") {
        //         num++
        //         one = this.product[num]
        //     }else flag = false
        // }while (flag && (num - number) <= 2)

        // if (flag)  return "Данные о товаре отсутствуют!" 

        // let response = await printOne(one, this.kursEuro)

        // return response 
        // return new ProductDto(response)

    }

    // добавление товара в БД
    async add(number) { 
        return "add"
        // try {
        //     let print = await this.print(number)

        //     let proDto = new ProductDto(print)
        
        //     let product = await createProduct(proDto)
            
        //     let response = `{${number}: ${product.url} - ${product.price}р. (${product.article})}`
        //     console.log('\x1b[34m%s\x1b[0m', response)

        //     return response
        // }catch(e) {
        //     let response = `{${number}: `
        //     if (typeof(e) === "string") response += `${e.replace("<","&lt;").replace(">","&gt;")}`
        //     else response += JSON.stringify(e)
        //     // response += ` (error)}`
        //     console.log('\x1b[33m%s\x1b[0m', response)
        //     return response
        // }
    }

    
    // добавление партии товара в БД
    async addParty(number, quantity) {
        return "addParty"
        // if (quantity === 1) return await this.add(number)
        
        // let array = []

        // for(let i = number; i < number+quantity; i++) {
        //     let response = await this.add(i)
        //     array.push(response)
        // }
        
        // return array
    }


    // смена цен
    async changePrice() {
        return "changePrice"
        // let response = `[`
        
        // let brand = await Brand.findOne({ where: { name: "Euroboor" } })
        // if (brand.id === undefined) return { error: "Не найден бренд товара." }

        // let old = await Product.findAll({ where: { brandId: brand.id } })

        // if (this.product !== undefined) {
            
        //     this.product.forEach(newProduct => {
          
        //         if (newProduct.name == "" || newProduct.price == "") { // если пустая строка
        //             // continue // пропусти
        //         }else {

        //         let myArticle = "erb" + newProduct.article.replace("/", "_").replace(" ", "_")

        //         let newPrice = Math.round( (newProduct.price * this.kursEuro) * 100 ) /100

        //         if (response !== `[`) response += ",<br />"
        //         let yes = false
        //         old.forEach(oldProduct => {
        //             if (oldProduct.article === myArticle) {
                        
        //                 if (newPrice != oldProduct.price) {
        //                     response += `{${oldProduct.article} - Старая цена: ${oldProduct.price}, Новая цена: ${newPrice}}`
        //                     Product.update({ price: newPrice },
        //                         { where: { id: oldProduct.id } }
        //                     ).then(()=>{}).catch(()=>{})
        //                 }else {
        //                     response += `{${oldProduct.article} - Цена осталась прежняя: ${oldProduct.price}}`
        //                 }
        //                 yes = true

        //             }
        //         })
        //         if ( ! yes) response += `{Не найден артикул: ${myArticle}}`
        //         }
        //     })
        // }

        // response = response + `]`

        // return response
    }


}

