
const mailService = require('../service/mailService')


class mailController {
    
    async requestPrice(req, res, next) {
        try {
            let body = req.body
            if (!body || body === {} || body.name === undefined) body = req.query
            let response
            await mailService.sendRequestPrice(process.env.ADMIN_EMAIL, body) 
                .then(data => {
                    response = true
                    console.log(data)
                })
                .catch(err => {
                    response = false
                    console.log(err)
                })

            return res.json(response)
        }catch(e) {
            return next(res.json( { error: 'Ошибка метода requestPrice!' } ))
        }
    }
    
    
    async requestProduct(req, res, next) {
        try {
            let body = req.body
            if (!body || body === {} || body.name === undefined) body = req.query
            let response
            await mailService.sendRequestProduct(process.env.ADMIN_EMAIL, body) 
                .then(data => {
                    response = true
                    console.log(data)
                })
                .catch(err => {
                    response = false
                    console.log(err)
                })

            return res.json(response)
        }catch(e) {
            return next(res.json( { error: 'Ошибка метода requestProduct!' } ))
        }
    }
    

    async requestProducts_AST(req, res, next) {
        try {
            let body = req.body
            if (!body || body === {} || body.name === undefined) body = req.query
            let response
            await mailService.sendRequestProducts_AST(process.env.ADMIN_EMAIL_AST, body) 
                .then(data => {
                    response = true
                    console.log(data)
                })
                .catch(err => {
                    response = false
                    console.log(err)
                })

            return res.json(response)
        }catch(e) {
            return next(res.json( { error: 'Ошибка метода requestProducts_AST!' } ))
        }
    }


    async callback_AST(req, res, next) {
        try {
            let body = req.body
            if (!body || body === {} || body.name === undefined) body = req.query
            let response
            await mailService.sendCallBack_AST(process.env.ADMIN_EMAIL_AST, body) 
                .then(data => {
                    response = true
                    console.log(data)
                })
                .catch(err => {
                    response = false
                    console.log(err)
                })

            return res.json(response)
        }catch(e) {
            return next(res.json( { error: 'Ошибка метода callback_AST!' } ))
        }
    }

}

module.exports = new mailController()