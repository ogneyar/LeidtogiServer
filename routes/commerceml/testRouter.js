const Router = require('express')
const router = new Router()

const testController = require('../../controllers/commerceml/testController')


router.get('/', testController.test)


module.exports = router
