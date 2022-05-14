const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')
const { Brand, Category, Product } = require('../../../models/models')
// const findProductByUrl = require('../../product/findProductByUrl')
const findProductByArticle = require('../../product/findProductByArticle')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
const parseXlsx = require('../../xlsx/parseXlsx')
const createCategory = require('../../category/createCategory')

// const getDataGedoreTool = require('./gedoreTool/getDataGedoreTool')
// const getImagesGedoreTool = require('./gedoreTool/getImagesGedoreTool')
// const getDescriptionGedoreTool = require('./gedoreTool/getDescriptionGedoreTool')
// const getNameGedoreTool = require('./gedoreTool/getNameGedoreTool')
// const getSizesGedoreCom = require('./gedoreCom/getSizesGedoreCom')
// const getDataGedoreCom = require('./gedoreCom/getDataGedoreCom')
// const getImagesGedoreCom = require('./gedoreCom/getImagesGedoreCom')
// const getDescriptionGedoreCom = require('./gedoreCom/getDescriptionGedoreCom')
// const getNameGedoreCom = require('./gedoreCom/getNameGedoreCom')



module.exports = class Tmk {
    
    static categories = []
    static products = []
    
    constructor() {}

    async run() {
        let feed, response

        feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'tmk', 'feed.json')
            
        if (fs.existsSync(feed)) { 
            
            try {
                response = fs.readFileSync(feed)
            }catch(e) {
                throw `Не смог прочесть файл ${feed}!`
            }

            if (response) {
                response = JSON.parse(response.toString())

                this.categories = response.categories

                let keys = Object.keys(response.products)
                this.products = keys.map(i => response.products[`${i}`])

                return true
            }

        }else {
            // необходимо от сюда взять и сохранить в файл feed.json
            // https://b2b.tmknn.ru/json/catalog/products/own/52473/fa5de0c62dce29585cd9eee499210789
            throw `Файл ${feed} отсутствует или пуст!`
        }

        return false
    }

    // количество записей в feed.json
    async getLength() {
        return this.products.length
    }


    // список всех категорий
    async getAllCategories() {

        const getCategory = (cat = this.categories, number = null) => {
            return cat.filter(i => i.parent_id === number).map(j => {
                let arr = getCategory(cat, j.id)
                return { id: j.id, title: j.title, parent_id: j.parent_id, value: arr }
            })
        }

        let category = getCategory()

        const addCategories = async (cat = category, sub_id = 0) => {
            await cat.forEach(async i => {
                let isProduct = 0
                if (Array.isArray(i.value) && i.value[0] === undefined) isProduct = 1
                let response = await createCategory(i.title, translit(i.title), isProduct, sub_id)
                if (response) {
                    if (Array.isArray(i.value) && i.value[0] !== undefined) {
                        await addCategories(i.value, response.id)
                    }
                }
            })
            
        }

        // добавление новых категорий
        // await addCategories()

        // вывод всех категорий в удобочитаемом виде
        const getCategoryList = (cat = this.categories, number = null, offset = "") => {
            return cat.filter(i => i.parent_id === number).map(j => {
                let arr = getCategoryList(cat, j.id, offset + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                let url

                switch(j.title) {
                    // Электроинструмент
                    case 'Пилы отрезные (монтажные)': url = "otreznye-mashiny"; break
                    case 'Аккумуляторные дрели': url = "akkumulyatornyy-instrument_dreli"; break
                    case 'Аккумуляторные шуруповерты': 
                    case 'Шуруповерты для зимней рыбалки': 
                    case 'Угловые аккумуляторные шуруповерты': 
                    case 'Дрели-шуруповерты для гипсокартона': 
                    case 'Дрели-шуруповерты ленточные': 
                    case 'Дрели-шуруповерты угловые': 
                    case 'Дрели-шуруповерты ударные': url = "shurupoverty"; break
                    case 'Аккумуляторные отвертки': url = "otvertki"; break
                    case 'Аккумуляторные гайковерты': url = "gaykoverty"; break
                    case 'Пневматические гайковерты': url = "pnevmoinstrument_gaykoverty"; break
                    case 'Ударные гайковерты': 
                    case 'Угловые гайковерты': url = "setevoy-instrument_gaykoverty"; break
                    case 'Аккумуляторные дисковые пилы': url = "cirkulyarnye-pily"; break
                    case 'Алмазные дисковые пилы': 
                    case 'Дисковые пилы для дома': 
                    case 'Дисковые пилы по металлу': 
                    case 'Дисковые пилы со стационарным креплением': 
                    case 'Погружные дисковые пилы': 
                    case 'Профессиональные дисковые пилы': url = "setevoy-instrument_cirkulyarnye-pily"; break
                    case 'Дрели алмазного сверления': url = "dreli"; break
                    case 'Аккумуляторные лобзики': url = "lobziki"; break
                    case 'Лобзики для дома': 
                    case 'Лобзики с лазером': 
                    case 'Сетевые лобзики': url = "setevoy-instrument_lobziki"; break
                    case 'Ножницы по металлу': url = "ruchnoy-instrument_nozhnicy"; break
                    case 'Отбойные молотки': url = "setevoy-instrument_otboynye-molotki"; break
                    case 'Перфораторы SDSmax': 
                    case 'Перфораторы SDSplus': url = "setevoy-instrument_perforatory"; break
                    case 'Рубанки': url = "setevoy-instrument_rubanki"; break
                    case 'Сабельные пилы (электроножовки)': url = "setevoy-instrument_sabelnye-pily"; break
                    case 'Безударные дрели': url = "dreli"; break
                    case 'Сетевые шуруповерты': url = "setevoy-instrument_shurupoverty"; break
                    case 'Строительные миксеры (дрели-миксеры)': url = "setevoy-instrument_miksery"; break
                    case 'Ударные дрели': 
                    case 'Сетевые угловые дрели': url = "dreli"; break
                    case 'Фены строительные': url = "setevoy-instrument_feny"; break
                    case 'Кромочные фрезеры': 
                    case 'Ламельные фрезеры': 
                    case 'Универсальные фрезеры': url = "frezery"; break
                    case 'Ленточные': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Машины шлифовальные угловые': url = "setevoy-instrument_ugloshlifovalnye-mashiny"; break
                    case 'Реноваторы': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Плоскошлифовальные': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Полировальные': url = "setevoy-instrument_polirovalnye-mashiny"; break
                    case 'Прямошлифовальные': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Шлифовальные машины по бетону': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Эксцентриковые': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Граверы': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Щеточные': url = "setevoy-instrument_pryamoshlifovalnye-mashiny"; break
                    case 'Электрические краскопульты': url = "kraskopulty"; break
                    case 'Нейлеры, заклепочники, пистолеты для вязки арматуры': url = "setevoy-instrument_drugoe"; break
                    case 'Заклепочники': url = "setevoy-instrument_zaklepochniki"; break
                    case 'Степлеры электрические (Нейлеры)': url = "setevoy-instrument_steplery"; break
                    case 'Пистолеты для герметика': 
                    case 'Пистолеты клеевые (термопистолеты)': url = "setevoy-instrument_kleevye-pistolety"; break
                    case 'Прочий монтажный инструмент': url = "setevoy-instrument_drugoe"; break
                    // Измерительная техника
                    case 'Рейки и штативы': url = "drugaya-izmeritelnaya-tehnika"; break
                    case 'Ротационные нивелиры': url = "rotacionnye-urovni"; break
                    case 'Угломеры': url = "uglomery-i-uklonomery"; break
                    // Малая строительная техника
                    case 'Для грязной воды': url = "motopompy"; break
                    case 'Для чистой воды': url = "motopompy"; break
                    case 'Бензорезы': url = "benzoinstrument_otreznye-mashiny"; break
                    case 'Электрические резчики': url = "setevoy-instrument_otreznye-mashiny"; break
                    case 'Штроборезы (бороздоделы)': url = "stenoreznye-mashiny"; break
                    // Пневмоинструмент
                    case 'Дрели пневматические': url = "pnevmoinstrument_dreli"; break
                    case 'Заклепочники': url = "pnevmoinstrument_zaklepochniki"; break
                    case 'Гвоздезабиватели (нейлеры), степлеры': url = "gvozdezabivateli-steplery"; break
                    case 'Машины шлифовальные пневматические': url = "pnevmoinstrument_pryamoshlifovalnye-mashiny"; break
                    case 'Отбойные молотки пневматические': url = "pnevmoinstrument_otboynye-molotki"; break
                    case 'Пневматические гвоздезабивные пистолеты (нейлеры)': url = "gvozdezabivateli-steplery"; break
                    case 'Пневматические краскопульты': url = "pnevmoinstrument_kraskopulty"; break
                    case 'Степлеры пневматические': url = "gvozdezabivateli-steplery"; break
                    case 'Шуруповерты пневматические': url = "pnevmoinstrument_shurupoverty"; break
                    case 'Пневматические гайковерты': url = "pnevmoinstrument_gaykoverty"; break
                    // Расходные материалы и оснастка



                    default: url = translit(j.title)
                }

                return `${offset}"${j.title}" - (${url})${arr[0] !== undefined ? ": {<br/>" + arr + `${offset}}<br/>` : "<br/>"}`
            }).join("")
        }

        return getCategoryList(this.categories)
    }




    // вывод данных на экран
    async print(number) {

        let one = this.products[number - 1]

        // return one

        let article = one.code
        let ean = one.ean
        // let name = one.name
        // // if (name === "#Н/Д" || name === "42") throw "Не найдено наименование!"
        // let price = one.price
        
        let categoryId = one.category_id
        let category, subCategory

        this.categories.forEach(i => {
            if (i.id === categoryId) {
                category = i.title
                subCategory = i.parent_id
                if (subCategory) {
                    this.categories.forEach(j => {
                        if (j.id === subCategory) {
                            category = j.title + "/" + category
                            subCategory = j.parent_id
                            if (subCategory) {
                                this.categories.forEach(k => {
                                    if (k.id === subCategory) {
                                        category = k.title + "/" + category
                                        subCategory = k.parent_id
                                        if (subCategory) {
                                            this.categories.forEach(m => {
                                                if (m.id === subCategory) {
                                                    category = m.title + "/" + category
                                                    subCategory = m.parent_id
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

        // if (category) { 

        //     let cat = await Category.findAll()
        //     cat.forEach(i => {
        //         if (i.url === category) {
        //             categoryId = i.id
        //         }
        //     })
            
        //     if (categoryId === 0) throw "Не найден номер категории!"

        // }else {
        //     categoryId = 157 // category = "ruchnoy-instrument_drugoe"
        // }

        // // let brand = await Brand.findOne({ where: { name: "Gedore" } })
        // let brandId = 3 // brand.id
        // if ( ! brandId ) throw "Не найден бренд товара!"
        
        // let product = await findProductByArticle("ged" + article)
        
        // if (product && product.id !== undefined && product.name != 42) throw "Такой товар уже есть."
        
        // let country = "Германия"
        // let info = []
        // let size, image, description

        // size = await getSizesGedoreCom(article)

        // try {
        //     let dataGedoreTool = await getDataGedoreTool(article)
        //     image = getImagesGedoreTool(dataGedoreTool)
        //     description = getDescriptionGedoreTool(dataGedoreTool)
        //     if (name === "42") name = getNameGedoreTool(dataGedoreTool)
        // }catch(e) {
        //     console.log("err: ",e)
        //     let dataGedoreCom = await getDataGedoreCom(article)
        //     image = getImagesGedoreCom(dataGedoreCom)
        //     description = getDescriptionGedoreCom(dataGedoreCom)
        //     if (name === "42") name = getNameGedoreCom(dataGedoreCom)
        // }
        
        // let url = translit(name) + "_" + article
        
        // if (description) info.push( { title: "description", body: description } )
        
        // article = "ged" + article

        // let imageName = uuid.v4()  + '.jpg'

        // createFoldersAndDeleteOldFiles("gedore", article)

        // let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'big', imageName))
        // let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'small', imageName))

        // if (image.includes("https")) {
        //     https.get(image, (res) => {
        //         res.pipe(imageBig)
        //         if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
        //         else res.pipe(imageSmall)
        //     })
        // }else {
        //     http.get(image, (res) => {
        //         res.pipe(imageBig)
        //         if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
        //         else res.pipe(imageSmall)
        //     })
        // }
        

        // let files = `[`

        // files += `{"big":"gedore/${article}/big/${imageName}","small":"gedore/${article}/small/${imageName}"}`
        
        // files += `]`

        return { 
            categoryId,
            category,
            subCategory,
            // brandId,
            article, 
            ean, 
            // name,
            // url,
            // have: 1,
            // promo: "",
            // country,
            // files,
            // price,
            // size,
            // info,
            // filter: undefined,
            // image
        }
    }

    // добавление товара в БД
    async add(number) {
        // try {
        //     let print = await this.print(number)

        //     let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
        
        //     let product = await createProduct(name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter)
            
        //     let response = `{${number}: ${product.url} - ${product.price}р. (${product.article})}`
        //     console.log('\x1b[34m%s\x1b[0m', response)

        //     return response
        // }catch(e) {
        //     let response = `{${number}: ${e.replace("<","&lt;").replace(">","&gt;")}}`
        //     console.log('\x1b[33m%s\x1b[0m', response)
        //     return response
        // }
    }

    
    // добавление партии товара в БД
    async addParty(number, quantity) {

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
        let response = `[`
        
        // let brand = await Brand.findOne({ where: { name: "Gedore" } })
        // if (brand.id === undefined) return { error: "Не найден бренд товара." }

        // let old = await Product.findAll({ where: { brandId: brand.id } })

        // if (this.product !== undefined) this.product.forEach(newProduct => {
        //     if (response !== `[`) response += ",<br />"
        //     let yes = false
        //     old.forEach(oldProduct => {
        //         if (oldProduct.article === `ged${newProduct.article}`) {
        //             let newPrice = newProduct.price
        //             newPrice = Math.round(newPrice * 100) / 100
        //             if (newPrice != oldProduct.price) {
        //                response += `{${oldProduct.article} - Старая цена: ${oldProduct.price}, Новая цена: ${newPrice}}`
        //                 Product.update({ price: newPrice },
        //                     { where: { id: oldProduct.id } }
        //                 ).then(()=>{}).catch(()=>{})
        //             }else {
        //                 response += `{${oldProduct.article} - Цена осталась прежняя: ${oldProduct.price}}`
        //             }
        //             yes = true
        //         }
        //     })
        //     if ( ! yes) response += `{Не найден артикул: ged${newProduct.article}}`
        // })

        response = response + `]`

        return response
    }


}
