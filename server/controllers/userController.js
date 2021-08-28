const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User, Cart} = require('../models/models')
const mailService = require('../service/mailService')

const generateJwt = (id, email, role, isActivated) => {
    return jwt.sign(
        {id, email, role, isActivated}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        try {
            const body = req.body
            const candidate = await User.findOne({where:{email:body.email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(body.password, 5)

            const user = await User.create({...body, password: hashPassword})

            mailService.sendActivationMail(user.email, user.activationLink)
                .then(data => console.log(data))
                .catch(err => console.log(err))
            
            // const cart = await Cart.create({userId: user.id}) 
            const token = generateJwt(user.id, user.email, user.role, user.isActivated)
            return res.json({token})

        } catch (e) {
            next(ApiError.badRequest('Ошибка регистрации нового пользователя!!!'));
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where:{email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role, user.isActivated)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest('Ошибка входа!!!'));
    }
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.isActivated)
        return res.json({token})
    }

    async info(req, res, next) {
        const user = await User.findOne({where:{email:req.user.email}})
        return res.json(user)
    }

    async update(req, res, next) {
        const {id} = req.params
        const body = req.body
        const response = await User.update(body, {
            where: { id }
        })
        return res.json(response) // return boolean
    }
}

module.exports = new UserController()