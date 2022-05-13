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
                this.products = keys.map(i => {
                    return response.products[`${i}`]
                })

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

        return getCategoryList(this.categories)

        // let obj = {}
        // let arr = this.categories.filter(i => i.parent_id === null)
        // // return arr

        // let arr2 = this.categories.filter(i => i.parent_id === arr[0].id)
        // // return arr2

        // let arr3 = this.categories.filter(i => i.parent_id === arr2[0].id)
        // // return arr3

        // let arr4 = this.categories.filter(i => i.parent_id === arr3[2].id)
        // // return arr3

        let arr = this.categories.filter(i => i.parent_id === null).map(n => {

            let arr = this.categories.filter(i => i.parent_id === n.id).map(t => {

                let arr = this.categories.filter(i => i.parent_id === t.id).map(s => {

                    let arr = this.categories.filter(i => i.parent_id === s.id).map(q => {
                        // this.categories.filter(i => i.parent_id === q.id)
            
                        // obj[`${n.title}`] = ""
                        return {title: q.title}
            
                    })
        
                    // obj[`${n.title}`] = ""
                    return {title: s.title, value: arr}
        
                })
    
                // obj[`${n.title}`] = ""
                return {title: t.title, value: arr}
    
            })

            // obj[`${n.title}`] = ""
            return {title: n.title, value: arr}

        })

        return JSON.stringify(arr) //.map(i => "<br />" + i)

        return "this.categories.filter(i => i.parent_id === arr4[2].id)"
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


const getCategoryList = (cat = this.categories, number = null, offset = "") => {
    return cat.filter(i => i.parent_id === number).map(j => {
        let arr = getCategoryList(cat, j.id, offset + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        return `${offset}"${j.title}"${arr[0] !== undefined ? ": {<br/>" + arr + `${offset}}<br/>` : "<br/>"}`
    }).join("")
}