
// const path = require('path')
// const Math = require('mathjs')

// const { ProductSize, Product } = require('../../models/models')

const KVT = require('../../service/parser/kvt/KVT')

// const parseCsv = require('../../service/csv/parseCsv')
// const parseXlsx = require('../../service/xlsx/parseXlsx')



class kvtController {

    // РусГеоКом
    async kvt(req, res, next) {
        try {
            let { number, add } = req.query

            let response, kvt
            // создание экземпляра класса KVT
            kvt = new KVT()
            // обработка данных файла feed.xlsx
            response = await kvt.run()
            if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки
            // обработка данных файла feed.xlsx
            response = await kvt.run_price()
            if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки
            // добавление нового товара
            if (add && number) {
                return res.json(await kvt.add(Number(number)))
            }
            // вывод информации о товаре на экран
            if (number) {
                return res.json(await kvt.print(Number(number)))
            }
            // вывод на экран общего количества товаров (например: 372)
            return res.json(await kvt.getLength()) 

        }catch(e) {
            return next(res.json({error: 'Ошибка метода kvt! ' + e}))
        }
    }

}

module.exports = new kvtController()