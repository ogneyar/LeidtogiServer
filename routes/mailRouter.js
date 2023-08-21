const Router = require('express')
const router = new Router()

const mailController = require('../controllers/mailController')

if (process.env.URL === "http://localhost:5000") {
    router.get('/request_price', mailController.requestPrice) 
    router.get('/request_product', mailController.requestProduct) 
    router.get('/request_products_ast', mailController.requestProducts_AST) 
    router.get('/callback_ast', mailController.callback_AST) 
}

router.post('/request_price', mailController.requestPrice) 
router.post('/request_product', mailController.requestProduct) 
router.post('/request_products_ast', mailController.requestProducts_AST) 
router.post('/callback_ast', mailController.callback_AST) 

module.exports = router