const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer token_hdfgdfbdseef
            if (!token) {
                return next(ApiError.unauthorized('Не авторизован!'))
                // return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                // return res.status(403).json({message: 'Нет доступа'})
                return next(ApiError.forbidden('Нет доступа!'))
            }
            req.user = decoded
            next()
        }catch (e) {
            return next(ApiError.unauthorized('Не авторизован!!'))
            // return res.status(401).json({message: 'Не авторизован'})
        }
    }
}

