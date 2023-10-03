
const { Certificate, Order } = require('../models/models')
const ApiError = require('../error/apiError')
const codeGenerator = require('../service/certificate/codeGenerator')


class CertificateController {

    async create(req, res, next) {
        try {
            let body = req.body
            if ( ! body.code ) body = req.query
            const oldCertificate = await Certificate.findOne({                
                where: { code: body.code }
            })
            if (oldCertificate) return next(res.json({ error: `Такой код сертификата уже существует!` }))
            const certificate = await Certificate.create(body)
            return res.json(certificate)
        }catch(e) {
            return next(res.json({ error: `Ошибка метода create! (${e})` }))
        }
    }

    async creatingFromAFile(req, res, next) {
        try {
            let response = []
            let body = req.body
            if ( ! body.array ) body = req.query
            let array = body.array
            if ( ! Array.isArray(array) ) return next(res.json({ error: `Передан array не массив!` }))

            let item = 0
            while(item < array.length) {
                let oldCert
                let code = null
                do {
                    code = codeGenerator()
                    oldCert = await Certificate.findOne({ where: { code } })
                    if (oldCert) code = null
                }while(code == null)
                const certificate = await Certificate.create({
                    code,
                    state: "assigned",
                    name: array[item].name,
                    url: array[item].url,
                })
                if (certificate) {
                    response.push({
                        id: array[item].id,
                        name: array[item].name,
                        url: array[item].url,
                        code
                    })
                }
                item++
            }

            return res.json(response)
        }catch(e) {
            return next(res.json({ error: `Ошибка метода creatingFromAFile! (${e})` }))
        }
    }
    
    async getAll(req, res, next) {
        try {
            const certificates = await Certificate.findAll()
            return res.json(certificates) // return array
        }catch(e) {
            return next(res.json({ error: `Ошибка метода getAll! (${e})` }))
        }
    }
    
    async getOneByCode(req, res, next) {
        try {
            let body = req.query
            if ( ! body.code ) return next(res.json({ error: `Отсутствует обязательный параметр code.` }))
            const certificate = await Certificate.findOne({                
                where: { code: body.code }
            })
            return res.json(certificate)
        }catch(e) {
            return next(res.json({ error: `Ошибка метода getOneByCode! (${e})` }))
        }
    }
    
    async getOneByOrderId(req, res, next) {
        try {
            let body = req.query
            if ( ! body.order_id ) return next(res.json({ error: `Отсутствует обязательный параметр order_id.` }))
            const certificate = await Certificate.findOne({                
                where: { order_id: body.order_id }
            })
            return res.json(certificate)
        }catch(e) {
            return next(res.json({ error: `Ошибка метода getOneByOrderId! (${e})` }))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const certificate = await Certificate.destroy({
                where: { id }
            })
            return res.json(certificate) // return boolean
        }catch(e) {
            return next(res.json({ error: `Ошибка метода delete! (${e})` }))
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params
            let body = req.body
            if ( ! body.code && ! body.action && ! body.order_id ) body = req.query
            const certificate = await Certificate.update(body, {
                where: { id }
            })
            return res.json(certificate) // return boolean
        }catch(e) {
            return next(res.json({ error: `Ошибка метода edit! (${e})` }))
        }
    }

}

module.exports = new CertificateController()