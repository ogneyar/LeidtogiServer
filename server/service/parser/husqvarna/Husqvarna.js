const fs = require('fs')
const path = require('path')
const Math = require('mathjs')

// const { Product } = require('../../../models/models')
const parseXlsx = require('../../xlsx/parseXlsx')


// класс для получения данных из фида xlsx 
// и для обновления цен

module.exports = class Husqvarna {
    
    static brand // наименование бренда
    static array // все записи из файла

    
    constructor() {
        this.brand = "husqvarna"
    }

    async run(feed = {}) {
        // let feed
        let fullPath, response

        fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_CLP.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Accessories.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HU.xlsx')
        // fullPath = path.resolve(__dirname, '..', '..', '..', 'prices', 'husqvarna', 'Products_HCP.xlsx')

        if (feed.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv'))
            fullPath = path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'hqv', feed.name)
            await feed.mv(fullPath)
        }

        if (fs.existsSync(fullPath)) { 
            
            response = await parseXlsx(fullPath, [
                "Наименование",
                "Код изделия",
                "Цена без НДС",
                "Категория",
            ])
            
            if (response && Array.isArray(response)) {
                this.array = response.map(i => {
                    return {
                        name: i["Наименование"],
                        article: "hqv" + i["Код изделия"],
                        price: Math.round(Number(i["Цена без НДС"]) * 1.2),
                        category: i["Категория"]
                    }
                })
                return true
            }

        }else {
            return { error: `Файл ${fullPath} отсутствует или пуст!` }
        }

        return false
    }
    
    // количество записей
    async getLength() {
        return this.array.length
    }

    // смена цен (позже реализую)
    async changePrice() {
        return "Метод ещё не реализован!"
    }

    //  вывод одной записи
    async getOne(number) {
        return this.array[number]
    }

    //  вывод одной записи
    async getAll(number) {
        return this.array
    }

}
