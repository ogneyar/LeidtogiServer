
const fs = require('fs')
const path = require('path')
const http = require('https')
const https = require('https')
const uuid = require('uuid')
const Math = require('mathjs')

let sharp = require('sharp')

const { Brand, Category, Product } = require('../../../models/models')

const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')

const parseXlsx = require('../../xlsx/parseXlsx')
const ProductDto = require('../../../dtos/productDto')
// const getImages = require('./getImages')
const saveInfoInFile = require('../../saveInfoInFile')


module.exports = class Krause {
    
    static product = []
    static price = []
    static price1 = []
    static price2 = []
    static price3 = []
    static price4 = []

    
    constructor() {
    }

    async run(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kedr', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Наименование",
                "IE_PREVIEW_TEXT",
                "IE_DETAIL_PICTURE",
                "Описание детальное ",
                "Напряжение",
                "Диаметр проволоки",
                "Артикул поставщика",
                "Ссылка на видео",
                "Функция горячий старт",
                "Максимально допустимый ток",
                "Функция VRD",	
                "Функция Антизалипание",	
                "Продуктовый сегмент",	
                "Функция Lift TIG",	
                "Длина в упаковке",	
                "Ширина в упак",	
                "Высота в упак",	
                "Габариты",	
                "Вес брутто, кг.",	
                "ПВ %",	
                "Напряжение холостого хода",	
                "Диаметр электрода",	
                "Максимальный ток",	
                "Наличие ячеек памяти",	
                "Вес нетто, кг.",	
                "Толщина реза",	
                "Диапозон сварочного -тока",	
                "Напряжение3",	
                "Бренд",	
                "Группа товара 1",	
                "Группа товара 2",	
                "Группа товара 3",	
                "Цена",	
                "Валюта",

            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        name: i["Наименование"],
                        preview: i["IE_PREVIEW_TEXT"],
                        image: i["IE_DETAIL_PICTURE"],
                        description: i["Описание детальное "],
                        voltage: i["Напряжение"],
                        diameter: i["Диаметр проволоки"],
                        article: i["Артикул поставщика"],
                        url_video: i["Ссылка на видео"],
                        hot_start: i["Функция горячий старт"],
                        maximum_allowable_current: i["Максимально допустимый ток"],
                        vrd: i["Функция VRD"],
                        anti_salting: i["Функция Антизалипание"],
                        segment: i["Продуктовый сегмент"],
                        tig: i["Функция Lift TIG"],
                        length: i["Длина в упаковке"],
                        width: i["Ширина в упак"],
                        height: i["Высота в упак"],
                        dimensions: i["Габариты"],
                        weight_brutto: i["Вес брутто, кг."],
                        pv: i["ПВ %"],
                        idling: i["Напряжение холостого хода"],
                        diameter_electrode: i["Диаметр электрода"],
                        maximum_current: i["Максимальный ток"],
                        memory_cells: i["Наличие ячеек памяти"],
                        weight_netto: i["Вес нетто, кг."],
                        cutting_thickness: i["Толщина реза"],
                        welding_current_range: i["Диапозон сварочного -тока"],
                        voltage3: i["Напряжение3"],
                        brand: i["Бренд"],
                        group1: i["Группа товара 1"],
                        group2: i["Группа товара 2"],
                        group3: i["Группа товара 3"],
                        price: i["Цена"],
                        currency: i["Валюта"],
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

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'kedr', feed.name)
            await feed.mv(fullPath)

            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "КОД ДЛЯ ЗАКАЗА",
                    "НАИМЕНОВАНИЕ",
                    "РОЗНИЧНАЯ ЦЕНА, РУБ.",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price1 = response.map(i => {
                        return {
                            article: i["КОД ДЛЯ ЗАКАЗА"],
                            name: i["НАИМЕНОВАНИЕ"],
                            price: i["РОЗНИЧНАЯ ЦЕНА, РУБ."],
                        }
                    })
                    return true
                }
    
            }else {
                throw `Файл ${fullPath} отсутствует или пуст!`
            }

        }else { // берём четыре прайса с сервера

            fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kedr', 'price1.xlsx') // газосварочное оборудование

            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "КОД ДЛЯ ЗАКАЗА",
                    "НАИМЕНОВАНИЕ",
                    "РОЗНИЧНАЯ ЦЕНА, в руб. с НДС",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price1 = response.map(i => {
                        return {
                            article: i["КОД ДЛЯ ЗАКАЗА"],
                            name: i["НАИМЕНОВАНИЕ"],
                            price: i["РОЗНИЧНАЯ ЦЕНА, в руб. с НДС"],
                        }
                    })
                }
    
            }else {
                //throw `Файл ${fullPath} отсутствует или пуст!`
            }
    
            fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kedr', 'price2.xlsx') // оборудование КЕДР
            
            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "КОД ДЛЯ ЗАКАЗА",
                    "НАИМЕНОВАНИЕ",
                    "ХАРАКТЕРИСТИКИ",
                    "РОЗНИЧНАЯ ЦЕНА, РУБ.",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price2 = response.map(i => {
                        return {
                            article: i["КОД ДЛЯ ЗАКАЗА"],
                            name: i["НАИМЕНОВАНИЕ"],
                            characteristics: i["ХАРАКТЕРИСТИКИ"],
                            price: i["РОЗНИЧНАЯ ЦЕНА, РУБ."],
                        }
                    })
                }
    
            }else {
                //throw `Файл ${fullPath} отсутствует или пуст!`
            }

            fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kedr', 'price3.xlsx') // расходные материалы КЕДР
            
            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "КОД ДЛЯ ЗАКАЗА",
                    "НАИМЕНОВАНИЕ",
                    "РОЗНИЧНАЯ ЦЕНА, РУБ.",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price3 = response.map(i => {
                        return {
                            article: i["КОД ДЛЯ ЗАКАЗА"],
                            name: i["НАИМЕНОВАНИЕ"],
                            price: i["РОЗНИЧНАЯ ЦЕНА, РУБ."],
                        }
                    })
                }
    
            }else {
                //throw `Файл ${fullPath} отсутствует или пуст!`
            }

            fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kedr', 'price4.xlsx') // СИМЗ (выпрямители и реостаты)

            if (fs.existsSync(fullPath)) { 
            
                response = await parseXlsx(fullPath, [
                    "Артикулы",
                    "Наименование",
                    "Характеристики",
                    "РРЦ, руб",
                ])
                
                if (response && Array.isArray(response)) {
                    this.price4 = response.map(i => {
                        return {
                            article: i["Артикулы"],
                            name: i["Наименование"],
                            characteristics: i["Характеристики"],
                            price: i["РРЦ, руб"],
                        }
                    })
                }
    
            }else {
                //throw `Файл ${fullPath} отсутствует или пуст!`
            }


            return true
        }
        
        return false
    }

    // количество записей в feed.xlsx
    async getLength() {
        return this.product.length
    }

    // количество записей в price.xlsx
    async getLengthPrice() {
        return this.price1.length + this.price2.length + this.price3.length + this.price4.length
        
    }

    // 
    async createCategories() {

        let group = []

        let group1 = []
        let group2 = []
        let group3 = []
        this.product.forEach(iter => {
            if (iter.group1 === "Газосварочное оборудование") {
            // if (iter.group1 === "Сварочные горелки/ резаки") {
            // if (iter.group1 === "Средства защиты") {
            // if (iter.group1 === "Дополнительное оборудование") {
            // if (iter.group1 === "Сварочные аппараты") {
            // if (iter.group1 === "Расходные материалы") {
                let response =
                    iter.group1//.replace(/\//g, "|")
                    + " && " + 
                    iter.group2//.replace(/\//g, "|")
                if (iter.group3) 
                    response += " && " + 
                        iter.group3//.replace(/\//g, "|")
                group.push(response)
            }
            group1.push(iter.group1)
            group2.push(iter.group2)
            group3.push(iter.group3)
        })

        return [ ...new Set([ ...group ]) ]

        // return [ ...group1, ...group2, ...group3 ]

        let set1 = new Set(group1)
        let set2 = new Set(group2)
        let set3 = new Set(group3)
        
        return [ ...set1 ]

        return [ ...set1, ...set2, ...set3 ]

        // return new Set([ ...group1, ...group2, ...group3 ])

        // 1 "Газосварочное оборудование","Сварочные горелки/ резаки","Средства защиты","Дополнительное оборудование","Сварочные аппараты","Расходные материалы"
        // 2 "Комплектующие","Плазмотроны CUT","Краги / Перчатки","Маски сварщика","Комплектующие к маскам","Инструменты","Прутки присадочные","Серия КЕДР Pro","Серия КЕДР Prime","Клеммы и электрододержатели","Прочее","Термопеналы и электропечи","Редукторы","Регуляторы","Манометры","Проволка сварочная","Электроды для ручной сварки","Электроды вольфрамовые","Горелки","Горелки для MIG/MAG","Резаки газовые","Блоки жидкостного охлаждения","Педали / Пульты ДУ","Тележки сварочные","Горелки для TIG","","Очки защитные"
        // 3 "Предохранительные затворы","Комплектующие к плазмотронам CUT","","Прочее","Комплектующие к горелкам SAW","Прутки алюминиевые","Прутки из нержавеющей стали","CUT","Мундштуки","Обратные клапаны","Проволока омедненная","Прутки омедненные","Проволока из нержавеющей стали","Проволока аллюминиевая","Проволока порошковая","Комплектующие к горелкам MIG","Комплектующие к горелкам TIG","TIG","MIG/ MAG","MMA / ARC","SAW","MIG / MAG","Кабели и шланг- пакеты","Прутки латунные","Прутки медные"
    }

    // вывод данных на экран
    async print(number) {

        this.price = [
            ...this.price1,
            ...this.price2,
            ...this.price3,
            ...this.price4
        ]

        let one = this.product[number - 1]
        let one_price

        // return this.price

        let article = one.article
        let price
        this.price.forEach(i => {
            if (i.article === article) {
                price = i.price 
                one_price = i
            }
        })

        if ( ! price ) return { error: "Не найдена цена товара." }

        if (price === "по запросу") price = 0


        // group1
        // group2
        // group3

        // let category = await Category.findOne({ where: { url: one.category} })
        // let categoryId = category.id

        // if (!categoryId || categoryId === 0) return { error: "Не найдена категория товара." }

        let brand = await Brand.findOne({ where: { name: "Kedr" } })
        
        if (brand.id === undefined) return { error: "Не найден бренд товара." }
        
        let image = one.image // ссылка типа /upload/iblock/561/henp5wtozlxtrdjk6dydhf6zpsoa476v.jpeg
        // let images = await getImages(article) // достаём с сайта https://www.krause-systems.ru

        article = "kdr" + article

        let name = one.name
        let url = translit(name) + "_" + article

        let product = await Product.findOne({ where: { url } })
        if (product && product.id !== undefined) return { error: "Такой товар уже есть." }

        // let country = one.country
        
        
        let files = `[`

        // createFoldersAndDeleteOldFiles("kedr", article)

        // for (let i = 0; i < images.length; i++) {
            
        //     let imageName = i + 1 +'.jpg'
        //     let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'kedr', article, 'big', imageName))
        //     let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'kedr', article, 'small', imageName))

        //     https.get(images[i], (res) => {
        //         res.pipe(imageBig)
        //         res.pipe(sharp().resize(100)).pipe(imageSmall)
        //     })
			
		// 	if (files !== `[`) files += `,`
        //     files += `{"big":"kedr/${article}/big/${imageName}","small":"kedr/${article}/small/${imageName}"}`
        // }

        files += `]`

        // description
        // voltage
        // diameter
        // url_video
        // hot_start
        // maximum_allowable_current
        // vrd
        // anti_salting
        // segment
        // tig

        // length
        // width
        // height

        // dimensions
        // pv
        // idling
        // diameter_electrode
        // maximum_current
        // memory_cells
        // weight_netto
        // cutting_thickness
        // welding_current_range
        // voltage3


        if (isNaN(one.weight_brutto)) {
            one = {...one, weight_brutto:""}
        }
        let weight
        if (one.weight_brutto) weight = one.weight_brutto


        let info = []
        // if (one.description) {
        //     let description
        //     if (one.description.includes("<p>")) description = one.description
        //     else description = "<p>" + one.description + "</p>"
        //     description = description.replace(/\r\n/g, "")
        //     info.push( { title: "description", body: description } )
        // }
        // let characteristics = ""
        // if (one.name_char) { // если есть массив данных
        //     for (let i = 0; i < one.name_char.length; i++) {
        //         if (one.name_char[i]) { // если есть запись в массиве
        //             if (characteristics) characteristics += ";"
        //             characteristics += one.name_char[i]
        //             if (one.measure_char[i]) characteristics += ", " + one.measure_char[i]
        //             characteristics += ";" + one.value_char[i]
        //         }
        //     }
        //     info.push( { title: "characteristics",body: characteristics } )
        // }
        let size = {}
        // if (characteristics) {
        //     one.name_char.forEach((char, idx) => {
        //         if (char.toLowerCase().trim() === "транспортные габариты") {
        //             let split
        //             if (one.value_char[idx].includes("x")) split = one.value_char[idx].split("x")      // ангийский x прописной
        //             else if (one.value_char[idx].includes("X")) split = one.value_char[idx].split("X") // ангийский X заглавный
        //             else if (one.value_char[idx].includes("х")) split = one.value_char[idx].split("х") // русская х прописная
        //             else split = one.value_char[idx].split("Х")                                        // русская Х заглавная
        //             if (split.length > 1) {
        //                 let length = split[0].trim()
        //                 let width = split[1].trim()
        //                 let height = split[2].trim()
        //                 let volume = (length*width*height).toFixed(4)
        //                 size = { 
        //                     ...size,
        //                     width: width * 1000,  // переводим метры в миллиметры
        //                     height: height * 1000, 
        //                     length: length * 1000, 
        //                     volume 
        //                 }
        //             }
        //         }else if (char.toLowerCase().trim() === "вес") {
        //             let weight = one.value_char[idx].trim()
        //             size = { 
        //                 ...size,
        //                 weight
        //             }
        //         }
        //     })
        // }
        
        return {
            one,
            one_price
        }
        
        return { 
            // categoryId,
            brandId: brand.id, 
            article, 
            name,
            url,
            have: 1, 
            promo: "",
            country: "Китай",
            files,
            price,
            size,
            info,
            filter: undefined
        }
    }

    // добавление товара в БД
    async add(number, quantity) {

        // if (quantity) {
        //     let array = []
        //     for(let i = number; i < number+quantity; i++) {
        //         try {
        //             let print = await this.print(i)
        //             if (print.error !== undefined) {
        //                 array.push(`{${i}: ${print.error}}`)
        //                 continue
        //             }
        //             let proDto = new ProductDto(print)
        //             // создание записи
        //             let response = await createProduct(proDto)
        //             array.push(`{${i}: ${response.url} - ${response.price}}р.`)
        //         }catch(e) {
        //             array.push(`{${i}: ${e}}`)
        //         }
        //     }
            
        //     return array

        // }else {
        //     try {
        //         let print = await this.print(number)
        //         if (print.error !== undefined) return `{${number}: ${print.error}}`
        //         let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
        //         // создание записи
        //         let response = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)

        //         return `{${number}: ${response.url} - ${response.price}р.}`
        //     }catch(e) {
        //         return `{${number}: ${e}}`
        //     }
        // }
    }

    // смена цен
    async changePrice() {
        let response = `{<br />`
        
        let brand = await Brand.findOne({ where: { name: "Kedr" } })
        if (brand.id === undefined) return { error: "Не найден бренд товара." }

        let products = await Product.findAll({ where: { brandId: brand.id } })

        this.price.forEach(newProduct => {
            if (response !== `{<br />`) response += ",<br />"
            let yes = false
            products.forEach(oldProduct => {
                if (oldProduct.article === `kdr${newProduct.article}`) {
                    let newPrice = newProduct.price
                    newPrice = Math.round(newPrice * 100) / 100
                    if (newPrice != oldProduct.price) {
                        response += `"kdr${newProduct.article}": "Старая цена = ${oldProduct.price}, новая цена = ${newPrice}.`
                        Product.update({ price: newPrice },
                            { where: { id: oldProduct.id } }
                        ).then(()=>{}).catch(()=>{})
                    }else {
                        response += `"kdr${newProduct.article}": "Цена осталась прежняя = ${oldProduct.price}."`
                    }
                    yes = true
                }
            })
            if ( ! yes) response += `"kdr${newProduct.article}": "Не найден артикул."`
        })
        response = response + `<br />}`

        saveInfoInFile(brand.name, "update_price", response)

        return response
    }


}
