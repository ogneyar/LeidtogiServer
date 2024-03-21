
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
let sharp = require('sharp')

const { Brand, Category, Product } = require('../../../models/models')

const createFoldersAndDeleteOldFiles = require('../../createFoldersAndDeleteOldFiles.js')
const findProductByArticle = require('../../product/findProductByArticle.js')
const createProduct = require('../../product/createProduct.js')
const translit = require('../../translit.js')
const ProductDto = require('../../../dtos/productDto')
const parseXml = require('../../xml/parseXml')
const parseHtml = require('../../html/parseHtml')
const saveInfoInFile = require('../../saveInfoInFile')



module.exports = class Stalex {
    
    static url
    static category = []
    static product = []

    
    constructor() {
        this.url = process.env.STALEX_FEED_URL
    }

    async run(update = false) { // по умолчанию файл feed.xml не обновляется
        let feed

        if (update) await this.update()

        feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'stalex', 'feed.xml') 
        
        if (! fs.existsSync(feed)) {
            return { error: "Файл stalex/feed.xml отсутствует или пуст!" }
        }
        
        let { yml_catalog } = await parseXml(feed, 'win1251')

        let shop = yml_catalog.shop

        if (shop && shop.offers && Array.isArray(shop.offers.offer)) {
            this.product = shop.offers.offer.map(item => {
                let article, price, name, id, images, description, bitrix_characteristics, 
                    weight, characteristics, categoryId, available, currencyId, pictures,
                    gabarites, length, height, width, volume, size

                id = item._attributes.id
                available = item._attributes.available
                name = item.name._text
                categoryId = item.categoryId._text
                price = item.price._text
                currencyId = item.currencyId._text
                
                description = item.description._text
                if (description) {
                    description = description.trim()
                    description = description.replace(/\t/g, " ")
                    description = description.replace(/     /g, " ")
                    description = description.replace(/    /g, " ")
                    description = description.replace(/   /g, " ")
                    description = description.replace(/  /g, " ")
                }
                // удаление ссылок в описаннии если таковые имеются
                while(true) {
                    let urlDelete
                    try{
                        urlDelete = parseHtml(description, {
                            start: `<a href="`,
                            end: `">`, 
                            inclusive: true
                        })
                        description = description.replace(urlDelete, "").replace("</a>", "")
                    }catch(e) {
                        break
                    }
                }       

                bitrix_characteristics = item.characteristics

                characteristics = ""

                if (item.param && Array.isArray(item.param)) {
                    item.param.forEach(it => {
                        if (it._text) {
                            if (it._attributes.name == "Номер по номенклатуре") article = it._text
                            if (it._attributes.name == "Масса нетто/ брутто, кг") weight = it._text
                            if (it._attributes.name == "Габариты, мм") gabarites = it._text
                            if (it._attributes.name != "Наличие" && it._attributes.name != "Видео") {
                                if (it._attributes.name == "Фотогалерея") {
                                    pictures = it._text
                                }else{
                                    if (characteristics != "") characteristics += ";"
                                    characteristics += it._attributes.name + ";" + it._text
                                }
                            }
                        }
                    })
                }

                if (weight) {
                    let split = weight.split("/")
                    if (split[1]) weight = split[1].trim()
                }

                images = []
                if (pictures) {
                    let split = pictures.split(",")
                    split.forEach((it, idx) => {
                        if (idx < 4) images.push(it?.trim())
                    })
                }else if (item.picture) images.push(item.picture._text)

                if (gabarites) {
                    gabarites = gabarites.replace(/х/g, "x").replace(/Х/g, "x").replace(/X/g, "x")
                    let split = gabarites.split("x")
                    length = split[0]?.trim()
                    width = split[1]?.trim()
                    height = split[2]?.trim()
                }

                if (length && width && height) {
                    volume = ((length*width*height) / 1e9).toFixed(4)
                    if (volume == 0.0000) volume = 0.0001
                }
                
                size = { 
                    weight,
                    width,
                    height, 
                    length, 
                    volume
                }

                return {
                    id,
                    available,
                    name,
                    categoryId,
                    price,
                    description,
                    characteristics,
                    weight,
                    length,
                    width,
                    height,
                    volume,
                    article,
                    images,
                    bitrix_characteristics,
                    currencyId,
                    pictures,
                    size
                }
            })
        }

        if (shop && shop.categories && Array.isArray(shop.categories.category)) {
            this.category = shop.categories.category.map(item => {
                let name = item._text
                let parentId = item._attributes?.parentId
                if (name == "Заточные станки" && parentId) name = "Станки заточные"
                if (name == "Фаскосниматели") parentId = null
                if (name == "Аксессуары ") name = "Аксессуары для обработки труб"
                if (name == "Прессы гидравлические") name = "Гидравлические прессы"

                return { 
                    id: item._attributes.id,
                    parentId,
                    name
                }
            })
        }
        
        return true
    }

    // обновление файла feed.xml
    async update() { 
        let feed = path.resolve(__dirname, '..', '..', '..', 'prices', 'stalex', 'feed.xml')
        
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
        let hour = now.getHours()
        let min = now.getMinutes()
        let sec = now.getSeconds()
        if (month < 10) month = `0${month}`
        if (day < 10) day = `0${day}`
        if (hour < 10) hour = `0${hour}`
        if (min < 10) min = `0${min}`
        if (sec < 10) sec = `0${sec}`
        
        let dateInNameFile = `feed_${year}.${month}.${day}_${hour}.${min}.${sec}.xml`

        fs.rename(feed, path.resolve(__dirname, '..', '..', '..', 'prices', 'stalex', 'oldFeeds', dateInNameFile), (err) => {
            if (err) 
            {
                let responseError = `Переместить файл feed.xml не удалось.`
                console.error(responseError)
                // throw responseError
            }
        })
        
        return await new Promise((resolve, reject) => {
            try {
                https.get(this.url, res => {
                    res.pipe(fs.createWriteStream(feed))
                    res.on("end", () => {
                        console.log("Записал данные в файл feed.xml")
                        resolve(true)
                    })
                })
            }catch(e) {
                console.log("Не смог записать данные в файл feed.xml")
                reject(`Не смог записать данные в файл feed.xml. Ошибка: ${e}`)
            }
        })
    }

    // вывод данных
    async print(action = "product") {
        if (action === "product") {

            return this.product.filter(prod => prod.currencyId == "RUB")

        }else if (action === "category") {

            let response = []

            for (const cat of this.category) {
                let category = await Category.findOne({   
                    where: { name: cat.name }
                })
                if (category) response.push({...cat, categoryId: category.id, url: category.url})
                // else response.push(cat)
              }

            return response

        }else if (typeof(action) === "number") {

            let one = this.product[action - 1]

            if ( ! one ) throw "Не найден товар!"

            // их категория
            let category = this.category.find(cat => cat.id == one.categoryId)
            // наша категория
            let ourCategory = await Category.findOne({                
                where: { name: category?.name }
            })
            let categoryId = ourCategory?.id

            let brand = await Brand.findOne({ where: { name: "Stalex" } })
            let brandId = brand.id
            if ( ! brandId ) throw "Не найден бренд товара!"
            let article = one.article

            let product = await findProductByArticle("stl" + article)        
            if (product && product.id !== undefined) throw `Такой товар уже есть (stl${article}).`

            let name = one.name

            let url = translit(name) + "_" + article
            
            article = "stl" + article
            
            let price = one.price
            let size = { 
                weight: one?.weight,
                length: one?.length,
                width: one?.width,
                height: one?.height
            }
            if (one?.length && one?.width && one?.height) size.volume = ((one.length * one.width * one.height) / 1e9).toFixed(4)

            let info = []
            if (one.description) info.push( { title: "description", body: one.description} )
            if (one.characteristics && one.characteristics.length < 4095) info.push( { title: "characteristics", body: one.characteristics} )

            let files = `[`
            
            if (one.images[0] != undefined) {
                
                createFoldersAndDeleteOldFiles("stalex", article)
    
                let first = true
    
                one.images.forEach((image, idx) => {
                    if (idx < 4) {
                        if (first) first = false
                        else files += `,`
    
                        let imageName = (idx + 1)  + '.jpg' 
    
                        let imageBig = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'stalex', article, 'big', imageName))
                        let imageSmall = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'static', 'stalex', article, 'small', imageName))
    
                        if (image.includes("https")) {
                            https.get(image, (res) => {
                                // console.log('\x1b[33m%s\x1b[0m', res.statusCode)
                                if (res.statusCode >= 200 && res.statusCode < 300) {
                                    res.pipe(imageBig)
                                    res.pipe(sharp().resize(100)).pipe(imageSmall)
                                }
                            })
                        }else {
                            http.get(image, (res) => {
                                // console.log('\x1b[33m%s\x1b[0m', res.statusCode)
                                if (res.statusCode >= 200 && res.statusCode < 300) {
                                    res.pipe(imageBig)
                                    res.pipe(sharp().resize(100)).pipe(imageSmall)
                                }
                            })
                        }
    
                        files += `{"big":"stalex/${article}/big/${imageName}","small":"stalex/${article}/small/${imageName}"}`
                    }
                })
            }else {
                files += `{}`
            }
    
            files += `]`

            if (files === '[]') files = '[{}]'

            let country = "Китай" // one.country
            let have = one.available ? 1 : 0
    

            return { 
                categoryId,
                brandId,
                article, 
                name,
                url,
                have,
                promo: "",
                country,
                img: files,
                price,
                size,
                info
            }
        }
        return null
    }

    // вывод суммы общего количества товара
    async getLengthProducts() {
        return this.product.length
    }


    // добавление товара в БД
    async add(number) {
        let response = ""
        try {
            let obj = await this.print(number)
        
            let proDto = new ProductDto(obj) // Dto отсекает лишнее

            // console.log('\x1b[33m%s\x1b[0m', proDto)          
            let product = await createProduct(proDto)

            response = `{${number}: ${product.url} - ${product.price}р. (${product.article})}`
            console.log('\x1b[34m%s\x1b[0m', response)
        }catch(e) {
            try {    
                response = `{${number}: ${e.replace("<","&lt;").replace(">","&gt;")}}`  
                console.log('\x1b[33m%s\x1b[0m', response)          
            }catch(ex) {
                response = `{!${number}: ${e}}`
                console.log('\x1b[33m%s\x1b[0m', response) 
            }
        }

        return response
    }

    
    // добавление партии товара в БД
    async addParty(number, quantity) {

        if (quantity === 1) return await this.add(number)
        
        let array = []

        for(let i = number; i < number+quantity; i++) {
            let response = await this.add(i)
            array.push(response)
        }
        
        return array
    }


    // смена цены
    async changePrice() {        
        let response = ``
        
        let brand = await Brand.findOne({ where: { name: "Stalex" } })
        if (brand.id === undefined) return { error: "Не найден бренд товара." }

        let old = await Product.findAll({ where: { brandId: brand.id } })

        let quantityNewPrice = 0

        if (this.product !== undefined) this.product.forEach(newProduct => {
            if (response !== ``) response += ",<br />"
            let yes = false
            old.forEach(oldProduct => {
                if (oldProduct.article === `stl${newProduct.article}`) { 
                    if (Number(newProduct.price) !== Number(oldProduct.price)) {
                        quantityNewPrice++
                        response += `"${oldProduct.article}": "Старая цена = ${oldProduct.price}, новая цена = ${newProduct.price}"`
                        Product.update({ price: newProduct.price },
                            { where: { id: oldProduct.id } }
                        ).then(()=>{}).catch(()=>{})
                    }else {
                        response += `"${oldProduct.article}": "Цена осталась прежняя = ${oldProduct.price}"`
                    }
                    yes = true
                }
            })
            if ( ! yes) response += `"stl${newProduct.code}": "Не найден артикул."` 
            
        })

        response = `{<br />"Позиции сменили цену": "` + quantityNewPrice + ` шт.",<br /><br />` + response + `<br />}`
        
        saveInfoInFile(brand.name, "update_price", response) 

        return response 

    }


    async createCategories() 
    {
        let response = "No response"
        // const transaction = await sequelize.transaction()
        try {
            let array = this.category.filter(i => i.parentId == 0 || i.parentId == undefined)
            // response = await this.reFuncCreateCategories(array, transaction)
            response = await this.reFuncCreateCategories(array)
            if (response.error) throw response.error

            // await transaction.commit()
        } catch (error) {
            // await transaction.rollback()
            return error
        }
        return response
    }


    async reFuncCreateCategories(array, transaction = null) 
    {
        let response = []
        let throwable = null

        try {
            // array.forEach(async category => {
            for (const category of array) {

                let is_product = false
                this.product.forEach(i => { if (i.categoryId == category.id) is_product = true })

                if ( ! is_product ) {
                    let parent = false
                    this.category.forEach(i => { if (i.parentId == category.id) parent = true })
                    if ( ! parent ) is_product = true
                }

                let sub_category_id = 7 // 7 | Станки | stanki
                if (category.parentId) {
                    let element = this.category.find(item => item.id == category.parentId)
                    if (element) {
                        let ourCategory = await Category.findOne({                
                            where: { name: element.name }
                        })
                        if (ourCategory) sub_category_id = ourCategory.id
                        else throwable = "Не нашёл категорию! (reFuncCreateCategories)" 
                    }
                }

                let ourCategory = await Category.findOne({                
                    where: { name: category.name }
                })
                // if (ourCategory) throwable = `Категория "${category.name}" уже существует! (reFuncCreateCategories)`

                let newCategory

                if ( ! throwable && ! ourCategory ) {
                    newCategory = await Category.create({
                        name: category.name,
                        url: translit(category.name),
                        is_product,
                        sub_category_id
                    })//, { transaction }) 
    
                    response.push(newCategory) 
    
                    let newArray = this.category.filter(i => i.parentId == category.id)
                    if (newArray && newArray[0] != undefined) await this.reFuncCreateCategories(newArray, transaction)
                }

            }
            // })

            if (throwable) {
                console.log(throwable)
                throw throwable
            }

        } catch (error) {
            return { error }
        }

        return response

    }


}