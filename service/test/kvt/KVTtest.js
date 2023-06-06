// KVTtest
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

const { Product } = require('../../../models/models')

const parseXlsx = require('../../xlsx/parseXlsx')


module.exports = class KVTtest {
    
    static product = []
    static stock = [] 

    
    constructor() {
    }

    async run() {
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kvt', 'feed.xlsx')

        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "раздел",
                "подраздел",
                "группа товара",
                "код товара (SKU)",
                "назначение, применение",
                "страна происхождения",
                "единица измерения",
                "кратность",
                "вес нетто",
                "длина ед.товара (см)",
                "ширина ед.товара (см)",
                "высота ед.товара (см)",      
                "гарантийный срок эксплуатации (лет)",                
                "технические характеристики",
                "сертификация",
                "паспорт изделия, инструкция",
                "основное изображение",
                "чертеж",
                "размерные характеристики (мм)",
            ])
            
            if (response && Array.isArray(response)) {
                this.product = response.map(i => {
                    return {
                        category_1: i["раздел"],
                        category_2: i["подраздел"],
                        category_3: i["группа товара"],
                        article: i["код товара (SKU)"],
                        description: i["назначение, применение"],
                        country: i["страна происхождения"],
                        measure_unit: i["единица измерения"],
                        multiple: i["кратность"],
                        weight: i["вес нетто"],
                        length: i["длина ед.товара (см)"],
                        width: i["ширина ед.товара (см)"],
                        height: i["высота ед.товара (см)"],
                        warranty: i["гарантийный срок эксплуатации (лет)"],
                        characteristics: i["технические характеристики"],
                        certificate: i["сертификация"],
                        passport: i["паспорт изделия, инструкция"],
                        image: i["основное изображение"],
                        plan: i["чертеж"],
                        plan_characteristics: i["размерные характеристики (мм)"],
                    }
                })
                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }

    async run_stock() {
        let fullPath, response

        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kvt', 'stock.xls')
        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'kvt', 'stock.xlsx')
            
        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Название",
                "Артикул",
                "Остаток Калуга",
                "Остаток СПБ",
                "Цена",
            ])
            
            if (response && Array.isArray(response)) {
                this.stock = response.map(i => {
                    return {
                        name: i["Название"].replace(/    /g, " ").replace(/   /g, " ").replace(/  /g, " "),
                        article: i["Артикул"],
                        stock: Number(i["Остаток Калуга"]) + Number(i["Остаток СПБ"]),
                        price: Number(i["Цена"]),
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
    async getLength(stock) {
        if (stock) return this.stock.length
        return this.product.length
    }


    // вывод данных на экран
    async print(number) {

        let our_products = await Product.findAll()

        let data = []

        this.product.forEach(async(prod) => {
            let yes = false
            let stk
            for(let i = 0; i < this.stock.length; i++) {
                if (prod.article == this.stock[i].article) {
                    yes = true
                    stk = this.stock[i]
                    break
                }
            }
            if (yes) {
                let url = "-"
                for(let i = 0; i < our_products.length; i++) {
                    if (our_products[i].article == "kvt" + stk.article) {
                        url = "https://leidtogi.ru/kvt/" + our_products[i].url 
                        break
                    }
                }
                let price = Number(stk.price)
                let our_price = price - price * process.env.KVT_OUR_PROCENT // наша цена
                let volume
                if (prod.length && prod.width && prod.height)
                    volume = Number(((prod.length * prod.width * prod.height) / 1000000000).toFixed(10))
                let outdated = 0 // устаревшая (позиция)
                if (stk.name.includes("****")) {
                    outdated = 1
                    stk.name = stk.name.replace(/\*\*\*\*/g, "")
                }
                data.push({
                    "раздел": prod.category_1,
                    "подраздел": prod.category_2,
                    "группа товара": prod.category_3,
                    "артикул": prod.article,
                    "наименование": stk.name,
                    "цена с ндс": price,
                    "цена закупки": `${our_price.toFixed(2)}`.replace(".",","),
                    "общий остаток": stk.stock,
                    "описание": prod.description,
                    "страна происхождения": prod.country,
                    "единица измерения": prod.measure_unit,
                    "кратность": prod.multiple,
                    "вес нетто": prod.weight,
	                "длина ед.товара (см)": prod.length,
	                "ширина ед.товара (см)": prod.width,
                    "высота ед.товара (см)": prod.height,
                    "объём ед.": volume || "",
                    "гарантийный срок эксплуатации (лет)": prod.warranty,
                    "технические характеристики": prod.characteristics,
                    "онлайн-карточка товара": url,
                    "сертификация": prod.certificate,
                    "паспорт изделия, инструкция": prod.passport,
                    "основное изображение": prod.image,
                    "чертеж": prod.plan,
                    "чертёжные характеристики": prod.plan_characteristics,
                    "устаревшая позиция": outdated,
                })
            }
        })
    
        const wb = XLSX.utils.book_new()            // create workbook
        const ws = XLSX.utils.json_to_sheet(data)   // convert data to sheet
        XLSX.utils.book_append_sheet(wb, ws, 'kvt') // add sheet to workbook
    
        const filename = path.resolve(__dirname, '..', '..', '..', 'static', 'test', 'KVT', 'test.xlsx')
        const wb_opts = {bookType: 'xlsx', type: 'binary'} // workbook options
        XLSX.writeFile(wb, filename, wb_opts)              // write workbook file
    
        return this.product[number - 1]
    }

}