const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken')

const tokenService = require('../service/tokenService')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized("Не авторизован"));
        }

        const token = req.headers.authorization.split(' ')[1] // Bearer token_hdfgdfbdseef
        if (!token) {
            return next(ApiError.unauthorized('Не авторизован!'))
            // return res.status(401).json({message: 'Не авторизован!'})
            // return res.json({message: 'Не авторизован!'})
        }
        // const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.unauthorized("Не авторизован!!"));
        }

        // req.user = decoded

        req.user = userData

        next()
    }catch (e) {
        return next(ApiError.unauthorized('Не авторизован!!!'))
        // return res.status(401).json({message: 'Не авторизован!!!'})
        // return res.json({message: 'Не авторизован!!!'})
    }
}