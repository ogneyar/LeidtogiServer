const Router = require('express')
const router = new Router()

const commercemlRouter = require('./commercemlRouter')
const unfRouter = require('./unfRouter')

router.use('/', commercemlRouter)
router.use('/unf', unfRouter)
router.use('/unf_demo', unfRouter)


module.exports = router
