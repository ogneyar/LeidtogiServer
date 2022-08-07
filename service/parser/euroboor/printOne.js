
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
const getCharacteristics = require('./vseInstrumenti/getCharacteristics')
const getEquipment = require('./vseInstrumenti/getEquipment')
const getSizes = require('./vseInstrumenti/getSizes')


module.exports = async (one, kursEuro) => {
    
    let article = one["Артикул"]
    let name = one["Наименование"] + "(" + article + ")"
    let url = translit(name) //+ "_" + article.replace("/", "_")
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

    let info = []
    let description, characteristics, equipment

    try {
        description = await getDescription(html)
    }catch(e) { }
    
    try {
        characteristics = await getCharacteristics(html)
    }catch(e) { }
    
    try {
        equipment = await getEquipment(html)
    }catch(e) { }
    
    
    if (description) info.push( { title: "description", body: description } )
    if (characteristics) info.push( { title: "characteristics", body: characteristics } )
    if (equipment) info.push( { title: "equipment", body: equipment } )
    
    let size = await getSizes(html)
    
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