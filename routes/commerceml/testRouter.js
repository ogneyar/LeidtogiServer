const Router = require('express')
const router = new Router()

const testController = require('../../controllers/commerceml/testController')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', testController.get)
}else {
    router.get('/', testController.test)
    router.post('/', testController.test)
}


module.exports = router
