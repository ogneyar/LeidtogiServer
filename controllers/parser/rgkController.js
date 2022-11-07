
const path = require('path')
const Math = require('mathjs')

const { ProductSize, Product } = require('../../models/models')

const RGK = require('../../service/parser/rgk/RGK')

// const parseCsv = require('../../service/csv/parseCsv')
const parseXlsx = require('../../service/xlsx/parseXlsx')
const saveInfoInFile = require('../../service/saveInfoInFile')



class rgkController {

    // РусГеоКом
    async rgk(req, res, next) {
        try {
            let { 
                update, // если передан параметр update (с любым значением), значит необходимо обновить файл feed.csv
                change, // если передан параметр change (с любым значением), значит необходимо обновить цену  - в этом случае параметр number обязателен 
                print,  // если передан параметр print=product, значит необходимо вывести на экран информацию о товарах
                        // если передан параметр print=category, значит необходимо вывести на экран информацию о категориях
                field,  // если передан параметр field, значит необходимо вывести информацию о заданном поле (например: field=article) - в этом случае параметр number обязателен 
                number,  // если передан параметр number без параметра field, значит необходимо добавить в БД товар по очереди под номером number
                save_info
            } = req.query

            let response, rgk
            // создание экземпляра класса RGK
            rgk = new RGK()

            // обновление файла feed.csv
            // if (update) await rgk.update()

            // обработка данных файла feed.csv
            response = await rgk.run(update)
            if (response.error !== undefined) return res.json(response) // вывод ошибки
            // обновление цен
            if (change) {
                if (number) return res.json(await rgk.changePrice(Number(number)))
                else return next(res.json({error: 'Ошибка, не задан number при заданном параметре change!'}))
            }
            // вывод информации на экран
            if (print) {
                if (print === "category") return res.json(await rgk.print("category")) // все категории
                if (print === "product") return res.json(await rgk.print("product")) // все товары
            }
            // вывод на экран конкретной записи (например: field = "article")
            if (field) {
                if (number) return res.json(await rgk.search(Number(number), field))
                else return next(res.json({error: 'Ошибка, не задан number при заданном field!'}))
            }
            // добавление нового товара
            if (number) {
                response = await rgk.add(Number(number))
                
                if (response && response.error === undefined) return res.json(number)
                else return next(res.json({error: `Не смог сохранить товар, ${number} по очереди!` + response.error ? " " + response.error : ""}))
            }
            // вывод на экран общего количества товаров (например: 372)
            return res.json(await rgk.getLengthProducts()) 

        }catch(e) {
            return next(res.json({error: 'Ошибка метода rgk!'}))
        }
    }


    // добавление габаритов РусГеоКом
    async addSizes(req, res, next) {
        let size, workbook, worksheet, response = [], xlsx
        size = path.resolve(__dirname, '..', 'static', 'temp', 'rgk', 'size.xlsx')

        xlsx = await parseXlsx(size, [ "Артикул", "гр.", "д (мм)", "ш (мм)", "в (мм)" ])

        let desired, article, weight, length, width, height, volume
        for(let number = 2; number <= 317; number++) {
            article = "rgk" + xlsx[number-2]["Артикул"]
            weight = Math.round((Number(xlsx[number-2]["гр."]) / 1000), 2)
            length = xlsx[number-2]["д (мм)"]
            width = xlsx[number-2]["ш (мм)"]
            height = xlsx[number-2]["в (мм)"]
            volume = Math.round(((Number(length) /1000) * (Number(width) /1000) * (Number(height) /1000)), 4)
            
            let product = await Product.findOne({
                where: { article }
            })
            let have = false 
            if (product && product.id !== undefined) {
                have = true
                let product_size = await ProductSize.findOne({
                    where: { productId: product.id }
                })
                if ( ! product_size ) {
                    weight = weight.toString().replace(',', '.')
                    volume = volume.toString().replace(',', '.')
                    width = width.toString().replace(',', '.')
                    height = height.toString().replace(',', '.')
                    length = length.toString().replace(',', '.')
                    ProductSize.create({
                        weight,
                        volume,
                        width,
                        height,
                        length,
                        productId: product.id 
                    })
                }
            }

            response.push({ article, weight, length, width, height, volume, have })
        }

        return res.json(response)
    }

    
    async saveInfo(req, res, next) {
        
        if (!req.body || ! req.body.text) return res.json("нет данных")

        let text = req.body.text

        saveInfoInFile("RGK", "update_price", text)

        return res.json("ok")
    }

}

module.exports = new rgkController()