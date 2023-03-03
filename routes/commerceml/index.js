const Router = require('express')
const router = new Router()

const testRouter = require('./testRouter')

router.use('/', testRouter)
router.use('/unf', testRouter)


module.exports = router
