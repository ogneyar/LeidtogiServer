
const fs = require('fs') 
const path = require('path')

const parseXlsx = require('../../xlsx/parseXlsx')

const { Brand, Product } = require('../../../models/models')


module.exports = class EditStock {
    
    static stock = [] 
    
    constructor() {}

    async run() {
        let fullPath, response

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

                let brand = await Brand.findOne({ where: { name: "KVT" } })

                let products = await Product.findAll({ where: { brandId: brand.id } })

                products.forEach(async(product) => {
                    if ( ! product.have ) {
                        let stock = this.stock.filter(item => ("kvt"+item.article) === product.article)[0]
                        if (stock && stock.name !== undefined) {
                            // console.log("stock: ",stock)
                            if ( ! stock.name.includes("****") ) {
                                await Product.update({ have: 1, stock: 0 },
                                    { where: { article: "kvt"+stock.article } }
                                )
                            }
                        }
                    }
                })

                return true
            }

        }else {
            throw `Файл ${fullPath} отсутствует или пуст!`
        }

        return false
    }
}