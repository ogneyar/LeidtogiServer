
const Cleanvac = require('../../service/parser/cleanvac/Cleanvac')


class cleanvacController {

    async cleanvac(req, res, next) {
        try {
            let { number, add, change, lprice } = req.query
            let feed = req.files && req.files.feed || undefined
            let price = req.files && req.files.price || undefined

            let response, cleanvac
            // создание экземпляра класса Cleanvac
            cleanvac = new Cleanvac()
            if ( ! change ) { // если НЕ смена цен
                // обработка данных файла feed.xlsx
                response = await cleanvac.run(feed)
                if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки
            }

            // обработка данных файла price.xlsx
            // response = await cleanvac.run_price(price)
            // if ( ! response ) return res.json({error: 'Ошибка! ParseXlsx не вернул данные!'}) // вывод ошибки

            // добавление нового товара
            if (add !== undefined && number) {
                return res.json(await cleanvac.add(Number(number), Number(add)))
            }

            // смена цен
            if (change !== undefined) {
                return res.send(await cleanvac.changePrice())
            }

            // вывод информации о товаре на экран
            if (number) {
                return res.json(await cleanvac.print(Number(number)))
            }

            if (lprice) {
                return res.json(await cleanvac.getLengthPrice()) 
            }

            // вывод на экран общего количества товаров (например: 372)
            return res.json(await cleanvac.getLength()) 

        }catch(e) {
            return next(res.json({error: 'Ошибка метода cleanvac! ' + e}))
        }
    }

}

module.exports = new cleanvacController()