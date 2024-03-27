
const { Product, Brand } = require('../models/models')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
// const Math = require('mathjs')

const ApiError = require("../error/apiError")
const KVTtest = require('../service/test/kvt/KVTtest')
const EditStock = require('../service/test/kvt/EditStock')


class TestController {
    
    async testPost(req, res, next) {
        try {
            const {name} = req.body
            let response = {
                "test":"post",
                "name":name
            }

            return res.json(response) // return array
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода testPost!'));
        }
    }


    async testGet(req, res, next) {
        try {
            // const {name} = req.body
            let obj = { 
                ok: true,
                result: {
                    id: 42,
                    first_name: "her",
                    username: "o"
                }
            }
            obj = { ...obj, result: { article: "t142", url: "http://her.com", price: 42} }
            return res.json(obj) // return object
            // return res.json([{"test":"get"}]) // return array
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода testGet!'));
        }
    }


    async testTorGet(req, res, next) {
        try {
            // Tor
            let url = "https://eme54.ru/partners-im/partners.xml"
            let { data } = await axios.get(url)

            fs.rename(path.resolve(__dirname, '..', 'static', 'temp', 'test.xml'), path.resolve(__dirname, '..', 'tmp', 'test.xml'), (err) => {
                if (err) console.error("error")
            })

            return res.json(data)
        }catch(e) {
            return next(ApiError.badRequest('Ошибка метода testTmkGet!'));
        }
    }


    async testKvt(req, res, next) {
        try {
            let { number, stock } = req.query

            let response, kvt
            // создание экземпляра класса KVT
            kvt = new KVTtest()
            
            // обработка данных файла feed.xlsx
            response = await kvt.run()
            if ( ! response ) return res.json({error: 'Ошибка! Метод run() не вернул данные!'})
            // обработка данных файла stock.xlsx
            response = await kvt.run_stock()
            if ( ! response ) return res.json({error: 'Ошибка! Метод run_stock() не вернул данные!'})                

            // вывод информации о товаре на экран
            if (number) {
                return res.json(await kvt.print(Number(number)))
            }

            // вывод на экран общего количества товаров в файле stock.xlsx
            if (stock) {
                return res.json(await kvt.getLength(stock))
            }

            // вывод на экран общего количества товаров (например: 372)
            return res.json(await kvt.getLength()) 

        }catch(e) {
            return res.json({error: 'Ошибка метода testKvt! ' + e})
        }
    }

    
    async editStockKvt(req, res, next) {
        try {
            let stock
            // создание экземпляра класса EditStock
            stock = new EditStock()

            return res.json(await stock.run()) 

        }catch(e) {
            return res.json({error: 'Ошибка метода editStockKvt! ' + e})
        }
    }

    
    async editAllur(req, res, next) {
        try {

            let brand = await Brand.findOne({
                where: { name: "PTK" }
            })

            // let products = await Product.findAll({
            //     where: { brandId: brand.id }
            // })

            // products = products.filter(product => {
            //     if (product.name.toLowerCase().includes("аллюр")) {
            //         Product.update({have: 0}, {
            //             where: { id: product.id }
            //         })
            //         return true
            //     }
            //     return false
            // })

            // products.forEach(product => {
            //     Product.update({have: 0}, {
            //         where: { id: product.id }
            //     })
            // })

            let response = await Product.update({have: 0}, {
                where: { brandId: brand.id }
            })

            // return res.json(products.length) 
            return res.json(response) 

        }catch(e) {
            return res.json({error: 'Ошибка метода editAllur! ' + e})
        }
    }

}

module.exports = new TestController()