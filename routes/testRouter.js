
const Router = require('express')
const router = new Router()
const path = require('path')
const fs = require('fs')
const axios = require('axios')

// const testController = require('../controllers/testController')
const ApiError = require('../error/apiError')



const testPost = async (req, res, next) => {
    try {
        const {name} = req.body
        let response = {
            "test":"post",
            "name":name
        }

        return res.json(response) // return array
    }catch(e) {
        return next(ApiError.badRequest('Ошибка метода testPost!'));
    }
}

const testGet = async (req, res, next) => {
    try {
        // const {name} = req.body
        let obj = { 
            ok: true,
            result: {
                id: 42,
                first_name: "her",
                username: "o"
            }
        }
        obj = { ...obj, result: { article: "t142", url: "http://her.com", price: 42} }
        return res.json(obj) // return object
        // return res.json([{"test":"get"}]) // return array
    }catch(e) {
        return next(ApiError.badRequest('Ошибка метода testGet!'));
    }
}

const testTorGet = async (req, res, next) => {
    try {
        // Tor
        let url = "https://eme54.ru/partners-im/partners.xml"
        let { data } = await axios.get(url)

        fs.rename(path.resolve(__dirname, '..', 'static', 'temp', 'test.xml'), path.resolve(__dirname, '..', 'tmp', 'test.xml'), (err) => {
            if (err) console.error("error")
        })

        return res.json(data)
    }catch(e) {
        return next(ApiError.badRequest('Ошибка метода testTmkGet!'));
    }
}
 
router.post('/', testPost)

router.get('/', testGet)

router.get('/tor', testTorGet)

// router.delete('/:id', brandController.delete)
// router.put('/:id', brandController.edit)



module.exports = router