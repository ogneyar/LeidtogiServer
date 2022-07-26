
const Math = require('mathjs')

const { Category } = require('../../../models/models')
const createCategory = require('../../category/createCategory')
const findProductByArticle = require('../../product/findProductByArticle')
const translit = require('../../translit.js')
const searchVI = require('./vseInstrumenti/search')
// const searchOrigin = require('./euroboorCom/search')
const getFiles = require('./vseInstrumenti/getFiles')
const getHtml = require('./vseInstrumenti/getHtml')
const getDescription = require('./vseInstrumenti/getDescription')


module.exports = async (one, kursEuro) => {
    
    let article = one["Артикул"]
    let name = one["Наименование"]
    let url = translit(name) + "_" + article.replace("/", "_")
    let priceEuro = one["Цена"]
    let price = Math.round( (priceEuro * kursEuro) * 100 ) /100
    let category = one["Категория"]
    let have = true
    
    let URI
    try {
        URI = await searchVI(article)
    }catch(e) {
        console.log(`\r\n${e}\r\n`)
        // URI = await searchOrigin(article)
        throw e
    }

    let country = "Нидерланды" || "Китай"

    // let brand = await Brand.findOne({ where: { name: "Euroboor" } })
    let brandId = 4 // brand.id
    if ( ! brandId ) throw "Не найден бренд товара!"
    
    article = "erb" + article.replace("/", "_")
    let product = await findProductByArticle(article)
    
    if (product && product.id !== undefined) throw "Такой товар уже есть."
    
    
    let html = await getHtml(URI)
// return html
    let description = await getDescription(html)
// return description

    let info = []
    
    let characteristics = ""
    
    if (description) info.push( { title: "description", body: description } )
    if (characteristics) info.push( { title: "characteristics", body: characteristics } )
    
    // let image = one["Картинка"]
    // let weight = one["Вес, кг"]
    // let length = one["Длина, м"]
    // let width = one["Ширина, м"]

    let size
    // if (weight || length || width) {
    //     size = {
    //         weight,
    //         length,
    //         width,
    //         height: "",
    //         volume: ""
    //     }
    // }

    
    
    let files = await getFiles(html, article)


    return {
        category,
        // categoryId,
        brandId,
        article, 
        name,
        url,
        URI,
        have,
        promo: "",
        country,
        files,
        price,
        size,
        info
    }

}