
const KVT = require('../../service/parser/kvt/KVT')


class kvtController {

    async kvt(req, res, next) {
        try {
            let { number, add, change } = req.query
            let feed = req.files && req.files.feed || undefined
            let price = req.files && req.files.price || undefined

            let response, kvt
            // создание экземпляра класса KVT
            kvt = new KVT()
            if ( ! change ) { // если НЕ смена цен
                // обработка данных файла feed.xlsx
                response = await kvt.run(feed)
                if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки
            }
            // обработка данных файла price.xlsx
            response = await kvt.run_price(price)
            if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки

            // добавление нового товара
            if (add !== undefined && number) {
                return res.json(await kvt.add(Number(number), Number(add)))
            }

            // смена цен
            if (change !== undefined) {
                return res.send(await kvt.changePrice())
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