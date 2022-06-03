const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const uuid = require('uuid')
let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')
const { Brand, Category, Product } = require('../../../models/models')
const findProductByArticle = require('../../product/findProductByArticle')
const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
const parseXlsx = require('../../xlsx/parseXlsx')
const createCategory = require('../../category/createCategory')
const getUrl = require('./getUrl')
const ProductDto = require('../../../dtos/productDto')



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
                this.products = keys.map(i => response.products[`${i}`]).filter(i => 
                    i.category_id !== null 
                    // && i.pictures[0] !== undefined
                    )

                return true
            }

        }else {
            // необходимо от сюда взять и сохранить в файл feed.json
            // process.env.TMK_FEED_URL
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

                let url = getUrl(j.id, j.title)
                // if ( ! url ) translit(j.title)

                return `${offset}"${j.title}{${j.id}}" - (${url})${arr[0] !== undefined ? ": {<br/>" + arr + `${offset}}<br/>` : "<br/>"}`
            }).join("")
        }

        return getCategoryList(this.categories)
    }


    // вывод всех данных на экран
    async printAll() {
        let length = await this.getLength()
        // console.log(length)
        let response = []
        let i
        for (i = 1; i <= length; i++) {
            response.push(await this.print(i))
        }
        if (i > length) return response
        // return this.products.map(i => {}) 
    }


    // вывод данных на экран
    async print(number) {

        let one = this.products[number - 1]

        // return one

        let article = one.code
        let ean = one.ean
        let name = one.title
        let price = one.price
        
        let tmkCategoryId = one.category_id

        let urlCategory = getUrl(tmkCategoryId)

        if ( ! urlCategory ) {
            let title = ""
            this.categories.forEach(i => {
                if (i.id === tmkCategoryId) {
                    title = i.title
                }
            })
            urlCategory = translit(title)
        }


        let categoryId

        let cat = await Category.findAll()
        cat.forEach(i => {
            if (i.url === urlCategory) {
                categoryId = i.id
            }
        })
        
        if (categoryId === 0) throw "Не найден номер категории!"


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
            tmkCategoryId,
            urlCategory,
            categoryId,
            // brandId,
            article, 
            ean, 
            name,
            // url,
            // have: 1,
            // promo: "",
            // country,
            // files,
            price,
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

        //     // let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter } = print
        
        //     let proDto = new ProductDto(print)
        //     let product = await createProduct(proDto)
            
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
