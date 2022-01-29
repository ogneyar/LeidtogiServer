const axios = require('axios')

const Husqvarna = require('../../service/parser/husqvarna/Husqvarna')
const getLink = require('../../service/parser/husqvarna/getLink')

const getImg = require('../../service/parser/husqvarna/getImage')
const getChar = require('../../service/parser/husqvarna/getCharcteristics')
const getDesc = require('../../service/parser/husqvarna/getDescription')


class husqvarnaController {

    async husqvarna(req, res, next) {
        try {            
            let { change, number, all } = req.query
            let feed = req.files && req.files.feed || undefined

            // if (!feed) return res.json(false)
            
            let response

            let husqvarna = new Husqvarna()
            response = await husqvarna.run(feed)

            if(response && response.error === undefined) {
                // смена цен (позже реализую)
                if (change) return res.json(await husqvarna.changePrice())
                // вывод одной записи
                if (number) return res.json(await husqvarna.getOne(number))
                // вывод всех записей
                if (all) return res.json(await husqvarna.getAll())
                // вывод информации о  количестве записей
                return res.json(await husqvarna.getLength())
            }

            if (response.error !== undefined) return res.json(response.error)
        
            return res.json(false)
        }catch(e) {
            return next(res.json({error: 'Ошибка метода husqvarna!'}))
        }
    }

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
            return next(res.json({error: 'Ошибка метода getImage!'}))
        }
    }

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
            return next(res.json({error: 'Ошибка метода getCharcteristic!'}))
        }
    }


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
            return next(res.json({error: 'Ошибка метода getDescription!'}))
        }
    }




}

module.exports = new husqvarnaController()