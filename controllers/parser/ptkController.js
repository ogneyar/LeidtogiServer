
const Ptk = require('../../service/parser/ptk/Ptk')


class ptkController {

    async ptk(req, res, next) {
        try {
            let { 
                update,   // если передан параметр update (с любым значением), значит необходимо обновить файл feed.xml
                change,   // если передан параметр change (с любым значением), значит необходимо обновить цену
                add,      // если передан параметр add = 1, значит необходимо добавить в БД товар по очереди под номером number
                          // если параметр add > 1, то добавляется партия товара от number до add
                          //  - в этом случае параметр number обязателен
                print,    // если передан параметр print=product, значит необходимо вывести на экран информацию о товарах
                          // если передан параметр print=category, значит необходимо вывести на экран информацию о категориях
                number,   // если передан параметр number без доп. параметров, значит необходимо вывести на экран товар под номером number
                category,  // при заданном параметре выводится список категорий в удобочитаемом виде
                create_categories  // при заданном параметре создаются в БД категории взятые из feed.xml
            } = req.query

            let response, ptk
            // создание экземпляра класса Ptk
            ptk = new Ptk()

            // обработка данных файла feed.xml
            response = await ptk.run(update)
            if (response.error !== undefined) return res.json(response) // вывод ошибки

            if (category) {
                return res.json(await ptk.printCategory())
            }

            // обновление цен
            if (change) {
                return res.json(await ptk.changePrice())
            }

            // вывод информации на экран 
            if (print && ! number) {
                if (print === "category") return res.json(await ptk.print("category")) // все категории
                if (print === "product") return res.json(await ptk.print("product")) // все товары
            }

            // добавление нового товара
            if (add) {
                if ( ! number || number == 0 ) return res.json({error: 'Ошибка, не задан number при заданном параметре add!'})

                if (add > 1) return res.json(await ptk.addParty(Number(number), Number(add)))
                else 
                    response = await ptk.add(Number(number))
                
                if (! response || response.error !== undefined) 
                    res.json({error: `Не смог сохранить товар, ${number} по очереди!` + response.error ? " " + response.error : ""})

                return res.json(response)
            }

            if (number || print) {
                if (number) return res.json(await ptk.print(Number(number)))
                if (print) return res.json(await ptk.print(Number(print)))
            }

            if (create_categories) {
                return res.json(await ptk.createCategories())
            }

            // вывод на экран общего количества товаров (например: 372)
            return res.json(await ptk.getLengthProducts()) 

        }catch(e) {
            return res.json({error: `Ошибка метода ptk! ${e}`})
        }
    }

}

module.exports = new ptkController()