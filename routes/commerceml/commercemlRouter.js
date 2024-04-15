
const Router = require('express')
const router = new Router()

const commercemlController = require('../../controllers/commerceml/commercemlController')


router.get('/', commercemlController.run)


module.exports = router
