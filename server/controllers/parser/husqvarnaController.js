const axios = require('axios')
const http = require('http')

const Husqvarna = require('../../service/parser/husqvarna/Husqvarna')
const getLink = require('../../service/parser/husqvarna/getLink')

const getImg = require('../../service/parser/husqvarna/getImage')
const getChar = require('../../service/parser/husqvarna/getCharcteristics')
const getDesc = require('../../service/parser/husqvarna/getDescription')
const getName = require('../../service/parser/husqvarna/getName')
const getFilters = require('../../service/parser/husqvarna/getFilters')
const getSizes = require('../../service/parser/husqvarna/getSizes')


class husqvarnaController {

    async husqvarna(req, res, next) {
        try {
            let { add, change, number, all } = req.query
            let feed = req.files && req.files.feed || undefined

            // if (!feed) return res.json(false)
            
            let response

            let husqvarna = new Husqvarna()
            response = await husqvarna.run(feed) 

            if(response) {
                // добавление товара в БД
                if (add) {
                    if (number) {
                        return res.json(await husqvarna.addProduct(number))
                    }else if (all) {
                        return res.json(await husqvarna.addAllProduct())
                    }else throw 'Ошибка, не задан number при заданном add!'
                }
                // смена цен (позже реализую)
                if (change) return res.json(await husqvarna.changePrice())
                // вывод одной записи
                if (number) return res.json(await husqvarna.getOne(number))
                // вывод всех записей
                if (all) return res.json(await husqvarna.getAll())
                // вывод информации о  количестве записей
                return res.json(await husqvarna.getLength())
            }
        
            return res.json({ error: "Нет ответа от метода run класса Husqvarna!" })
        }catch(error) {
            return res.json({ error })
            // return res.json({ error: `${e} (метод husqvarna)` })
        }
    }

    async test(req,res) {
        // https://husq.ru/search?search=9679339-02
        try {
            let { article } = req.query // 9678968-01
            // if ( ! article ) throw "Отсутствует article в запросе!"
            if ( ! article ) article = "9678968-01"
            let url = "http://husq.ru/search"
            let response
            await axios.get(url, { params: { search: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            if (response.error !== undefined) return res.json(response.error)
            // return res.json(response)
            // <div class="product-preview">
            let link = getLink(response, `<div class="product-preview">`)

            let image = getImg(response, `<div class="product-preview">`, `<img src="`)

            await axios.get(link)
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            if (response.error !== undefined) return res.json(response.error)

            // getName()
            let name = getName(response)

            let description = getDesc(response, `class="text-uppercase">Описание`, `<ul>`, `</ul>`)

            let characteristics = getChar(response, `class="text-uppercase">Характеристики`, `<tbody>`, `</tbody>`)

            let filters = getFilters(response)
            
            let sizes = getSizes(response)

            return res.json({ image, name, article, description, characteristics, filters, sizes })
        }catch(error) {
            return res.json({ error })
        }
    }

    // в этом методе уже нет необходимости
    async getImage(req, res, next) {
        try {
            let { article } = req.query // 9678968-01
            let response
            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})
            
            if (response.error !== undefined) return res.json(response.error)
            
            response = getLink(response)

            if (response.error !== undefined) return res.json(response.error)

            await axios.get(response)
                .then(res => response = res.data)
                .catch(err => response = err)
            
            if (response.error !== undefined) return res.json(response.error)

            response = getImg(response)

            if (response.error !== undefined) return res.json(response.error)
            
            return res.json(response)
        }catch(e) {
            return res.json({error: 'Ошибка метода getImage!'})
        }
    }

    // в этом методе уже нет необходимости
    async getCharcteristics(req, res, next) {
        try {
            let { article } = req.query // 9678968-01
            let response
            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})

            if (response.error !== undefined) return res.json(response.error)
            
            response = getLink(response)

            if (response.error !== undefined) return res.json(response.error)

            await axios.get(response)
                .then(res => response = res.data)
                .catch(err => response = err)
            
            if (response.error !== undefined) return res.json(response.error)

            response = getChar(response)

            // console.log("response",response)

            if (response.error !== undefined) return res.json(response.error)

            return res.json(response)
        }catch(e) {
            return res.json({error: 'Ошибка метода getCharcteristic!'})
        }
    }

    // в этом методе уже нет необходимости
    async getDescription(req, res, next) {
        try {
            let { article } = req.query // 9678968-01
            let response
            await axios.get("http://shop.plus-kpd.ru/search/index.php", { params: { q: article } })
                .then(res => response = res.data)
                .catch(err => response = {error:err})

            if (response.error !== undefined) return res.json(response.error)
            
            response = getLink(response)

            if (response.error !== undefined) return res.json(response.error)

            await axios.get(response)
                .then(res => response = res.data)
                .catch(err => response = err)
            
            if (response.error !== undefined) return res.json(response.error)

            response = getDesc(response)

            if (response.error !== undefined) return res.json(response.error)

            return res.json(response)
        }catch(e) {
            return res.json({error: 'Ошибка метода getDescription!'})
        }
    }


}

module.exports = new husqvarnaController()