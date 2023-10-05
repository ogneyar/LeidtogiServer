
const { Certificate, Order } = require('../models/models')
const ApiError = require('../error/apiError')
const codeGenerator = require('../service/certificate/codeGenerator')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
// const tar = require('tar')
const zipDir = require('../service/zipDir')


class CertificateController {

    async create(req, res, next) {
        try {
            let body = req.body // { code, before, state }
            if ( ! body.code ) body = req.query
            const oldCertificate = await Certificate.findOne({                
                where: { code: body.code }
            })
            if (oldCertificate) return next(res.json({ error: `Такой код сертификата уже существует!` }))

            let name = body.code
            if (body.name) name = body.name

            const file = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'certificates','!blank.jpg'))
            const img = sharp(file)
            const textSVG = Buffer.from(`<svg height="846" width="1200">
                    <text x="50%" y="600" font-size="80" text-anchor="middle" font-width="bold" fill="#000" font-family="sans-serif">
                        ${body.code}
                    </text>
                </svg>`)
            const result = await img.composite([{ input: textSVG }]).toBuffer()
            fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'certificates',`${name}.jpg`), result)

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
            if ( ! Array.isArray(array) ) return next(res.json({ error: `Передан array, но он не массив!` }))
            
            let now = new Date()
            let year = now.getFullYear()
            let month = now.getMonth() + 1
            let day = now.getDate()
            let hour = now.getHours()
            let min = now.getMinutes()
            let sec = now.getSeconds()
            if (month < 10) month = `0${month}`
            if (day < 10) day = `0${day}`
            if (hour < 10) hour = `0${hour}`
            if (min < 10) min = `0${min}`
            if (sec < 10) sec = `0${sec}`
            
            let nameFolder = `${year}.${month}.${day}_${hour}.${min}.${sec}`
            
            if (!fs.existsSync(path.resolve(__dirname, '..', 'static', 'certificates', nameFolder))){
                try {
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', 'certificates', nameFolder))
                }catch(e) {
                    return next(res.json({ error: `Создать папку ${nameFolder} не удалось.` }))
                }
            }

            let item = 0
            while(item < array.length) {
                let oldCert
                let code = null
                do {
                    code = codeGenerator()
                    oldCert = await Certificate.findOne({ where: { code } })
                    if (oldCert) code = null
                }while(code == null)

                let name = array[item].name.trim()
                const certificate = await Certificate.create({
                    code,
                    state: "assigned",
                    name,
                    url: array[item].url,
                    before: body.before
                })
                
                const file = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'certificates', '!blank.jpg'))
                const img = sharp(file)
                const textSVG = Buffer.from(`<svg height="846" width="1200">
                        <text x="50%" y="600" font-size="80" text-anchor="middle" font-width="bold" fill="#000" font-family="sans-serif">
                            ${code}
                        </text>
                    </svg>`)
                const result = await img.composite([{ input: textSVG }]).toBuffer()
                fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'certificates', nameFolder, `${name}.jpg`), result)

                if (certificate) {
                    // console.log(certificate);
                    response.push({
                        id: array[item].id,
                        name: array[item].name,
                        url: array[item].url,
                        code, 
                        before: certificate.before
                    })
                }
                item++
            }
            
            let urlZip = await zipDir(`certificates/${nameFolder}`, `certificates/${nameFolder}.7z`) // в папке static

            return res.json({ array: response, url: urlZip })
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
            // body = req.query
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