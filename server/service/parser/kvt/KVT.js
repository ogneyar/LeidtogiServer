const fs = require('fs')
const path = require('path')
// const iconv = require('iconv-lite')
// const axios = require('axios')
// const http = require('http')
// const https = require('https')
// const uuid = require('uuid')

// const { Brand, Category, Product } = require('../../../models/models')

// const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
// const findProductByArticle = require('../../product/findProductByArticle.js')
// const createProduct = require('../../product/createProduct.js')
// const translit = require('../../translit.js')

// const getProducts = require('../../csv/parseCsv')
const parseXlsx = require('../../xlsx/parseXlsx')



module.exports = class KVT {
    
    static product = []
    static price = []

    
    constructor() {
    }

    async run(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kvt', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "раздел",
                "подраздел",
                "код товара (SKU)",
                "обозначение",
                "наименование",
                "назначение, применение",
                "цвет",
                "страна происхождения",
                "единица измерения",
                "формат потребительской упаковки",
                "количество в потребительской упаковке",
                "тип потребительской упаковки",
                "длина потребительской упаковки, см",
                "ширина потребительской упаковки, см",
                "высота потребительской упаковки, см", 
                "вес брутто потребительской упаковки, кг",
                "объём потребительской упаковки, куб.м",
                "гарантийный срок эксплуатации (лет)",
                "технические характеристики",
                "онлайн-карточка товара",
                "код ТНВЭД",
                "сертификация",
                "основное изображение",
                "изображение товарной позиции",
                "чертеж",
            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        category: i["раздел"],
                        sub_category: i["подраздел"],
                        article: i["код товара (SKU)"],
                        name: i["наименование"] + " " + i["обозначение"],
                        description: i["назначение, применение"],
                        color: i["цвет"],
                        country: i["страна происхождения"],
                        measure_unit: i["единица измерения"],
                        format_package: i["формат потребительской упаковки"],
                        quantity: i["количество в потребительской упаковке"],
                        type_package: i["тип потребительской упаковки"],
                        length: i["длина потребительской упаковки, см"],
                        width: i["ширина потребительской упаковки, см"],
                        height: i["высота потребительской упаковки, см"],
                        weight: i["вес брутто потребительской упаковки, кг"],
                        volume: i["объём потребительской упаковки, куб.м"],
                        warranty: i["гарантийный срок эксплуатации (лет)"],
                        characteristics: i["технические характеристики"],
                        link: i["онлайн-карточка товара"],
                        nomenclature: i["код ТНВЭД"],
                        certificate: i["сертификация"],
                        main_image: i["основное изображение"],
                        image: i["изображение товарной позиции"],
                        plan: i["чертеж"],
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }

    async run_price(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kvt', 'price.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kvt', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Код товара",
                "Наименование",
                "РРЦ",
            ])
            
            if (response && Array.isArray(response)) {
                this.price = response.map(i => {
                    return {
                        article: i["Код товара"],
                        name: i["Наименование"],
                        price: i["РРЦ"],
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }

    // количество записей
    async getLength() {
        // return this.product.length
        return this.price.length
    }

    // вывод данных на экран
    async print(number) {
        let one = this.product[number - 1]
        let article = one.article
        let one_price, name
        this.price.forEach(i => {
            if (i.article === article) {
                one_price = i.price
                name = i.name
            }
        })
        return { ...this.product[number - 1], price: one_price }
    }

    // добавление товара в БД
    async add(number) {
        return "number: " + number
    }


}