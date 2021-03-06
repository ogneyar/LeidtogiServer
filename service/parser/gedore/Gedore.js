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
const getDataGedoreTool = require('./gedoreTool/getDataGedoreTool')
const getImagesGedoreTool = require('./gedoreTool/getImagesGedoreTool')
const getDescriptionGedoreTool = require('./gedoreTool/getDescriptionGedoreTool')
const getNameGedoreTool = require('./gedoreTool/getNameGedoreTool')
const getSizesGedoreCom = require('./gedoreCom/getSizesGedoreCom')
const getDataGedoreCom = require('./gedoreCom/getDataGedoreCom')
const getImagesGedoreCom = require('./gedoreCom/getImagesGedoreCom')
const getDescriptionGedoreCom = require('./gedoreCom/getDescriptionGedoreCom')
const getNameGedoreCom = require('./gedoreCom/getNameGedoreCom')
const ProductDto = require('../../../dtos/productDto')



module.exports = class Gedore {
    
    static product = []
    
    constructor() {}

    async run(feed = {}) {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'gedore', 'feed.xlsx')

        if (feed && feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'gedore', feed.name)
            await feed.mv(fullPath)
        }
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [ 
                "Code",
                "??????",
                "?????? ?? ?????? ??????????????",
                "??????????????????",
            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        article: i["Code"],
                        name: i["??????"],
                        price: i["?????? ?? ?????? ??????????????"],
                        category: i["??????????????????"],
                    }
                })
                return true
            }

        }else {
            throw `???????? ${fullPath} ?????????????????????? ?????? ????????!`
        }

        return false
    }


    // ???????????????????? ?????????????? ?? feed.xlsx
    async getLength() {
        return this.product.length
    }


    // ?????????? ???????????? ???? ??????????
    async print(number) {

        let one = this.product[number - 1]

        let article = one.article
        let name = one.name
        // if (name === "#??/??" || name === "42") throw "???? ?????????????? ????????????????????????!"
        let price = one.price
        let category = one.category
        
        let categoryId = 0

        if (category) { 

            let cat = await Category.findAll()
            cat.forEach(i => {
                if (i.url === category) {
                    categoryId = i.id
                }
            })
            
            if (categoryId === 0) throw "???? ???????????? ?????????? ??????????????????!"

        }else {
            categoryId = 157 // category = "ruchnoy-instrument_drugoe"
        }

        // let brand = await Brand.findOne({ where: { name: "Gedore" } })
        let brandId = 3 // brand.id
        if ( ! brandId ) throw "???? ???????????? ?????????? ????????????!"
        
        let product = await findProductByArticle("ged" + article)
        
        if (product && product.id !== undefined && product.name != 42) throw "?????????? ?????????? ?????? ????????."
        
        let country = "????????????????"
        let info = []
        let size, image, description

        size = await getSizesGedoreCom(article)

        try {
            let dataGedoreTool = await getDataGedoreTool(article)
            image = getImagesGedoreTool(dataGedoreTool)
            description = getDescriptionGedoreTool(dataGedoreTool)
            if (name === "42") name = getNameGedoreTool(dataGedoreTool)
        }catch(e) {
            console.log("err: ",e)
            let dataGedoreCom = await getDataGedoreCom(article)
            image = getImagesGedoreCom(dataGedoreCom)
            description = getDescriptionGedoreCom(dataGedoreCom)
            if (name === "42") name = getNameGedoreCom(dataGedoreCom)
        }
        
        let url = translit(name) + "_" + article
        
        if (description) info.push( { title: "description", body: description } )
        
        article = "ged" + article

        let imageName = uuid.v4()  + '.jpg'

        createFoldersAndDeleteOldFiles("gedore", article)

        let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'big', imageName))
        let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'gedore', article, 'small', imageName))

        if (image.includes("https")) {
            https.get(image, (res) => {
                res.pipe(imageBig)
                if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
                else res.pipe(imageSmall)
            })
        }else {
            http.get(image, (res) => {
                res.pipe(imageBig)
                if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(imageSmall)
                else res.pipe(imageSmall)
            })
        }
        

        let files = `[`

        files += `{"big":"gedore/${article}/big/${imageName}","small":"gedore/${article}/small/${imageName}"}`
        
        files += `]`

        return { 
            categoryId,
            brandId,
            article, 
            name,
            url,
            have: 1,
            promo: "",
            country,
            files,
            price,
            size,
            info,
            filter: undefined,
            image
        }
    }

    // ???????????????????? ???????????? ?? ????
    async add(number) {
        try {
            let print = await this.print(number)

            // let { name, url, price, have, article, promo, country, brandId, categoryId, files, info, size, filter, request } = print

            let proDto = new ProductDto(print)
        
            let product = await createProduct(proDto)
            
            let response = `{${number}: ${product.url} - ${product.price}??. (${product.article})}`
            console.log('\x1b[34m%s\x1b[0m', response)

            return response
        }catch(e) {
            let response = `{${number}: ${e.replace("<","&lt;").replace(">","&gt;")}}`
            console.log('\x1b[33m%s\x1b[0m', response)
            return response
        }
    }

    
    // ???????????????????? ???????????? ???????????? ?? ????
    async addParty(number, quantity) {

        if (quantity === 1) return await this.add(number)
        
        let array = []

        for(let i = number; i < number+quantity; i++) {
            let response = await this.add(i)
            array.push(response)
        }
        
        return array
    }


    // ?????????? ??????
    async changePrice() {
        let response = `[`
        
        let brand = await Brand.findOne({ where: { name: "Gedore" } })
        if (brand.id === undefined) return { error: "???? ???????????? ?????????? ????????????." }

        let old = await Product.findAll({ where: { brandId: brand.id } })

        if (this.product !== undefined) this.product.forEach(newProduct => {
            if (response !== `[`) response += ",<br />"
            let yes = false
            old.forEach(oldProduct => {
                if (oldProduct.article === `ged${newProduct.article}`) {
                    let newPrice = newProduct.price
                    newPrice = Math.round(newPrice * 100) / 100
                    if (newPrice != oldProduct.price) {
                       response += `{${oldProduct.article} - ???????????? ????????: ${oldProduct.price}, ?????????? ????????: ${newPrice}}`
                        Product.update({ price: newPrice },
                            { where: { id: oldProduct.id } }
                        ).then(()=>{}).catch(()=>{})
                    }else {
                        response += `{${oldProduct.article} - ???????? ???????????????? ??????????????: ${oldProduct.price}}`
                    }
                    yes = true
                }
            })
            if ( ! yes) response += `{???? ???????????? ??????????????: ged${newProduct.article}}`
        })

        response = response + `]`

        return response
    }


}