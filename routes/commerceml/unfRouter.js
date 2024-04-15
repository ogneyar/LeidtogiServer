const Router = require('express')
const router = new Router()

const unfController = require('../../controllers/commerceml/unfController')


// if (process.env.URL === "http://localhost:5000") {
    router.get('/test', unfController.test)
// }else {
    router.get('/', unfController.run)
    router.post('/', unfController.run)
// }


module.exports = router
