const Router = require('express')
const router = new Router()

const prRouter = require('./prRouter')
const sdekRouter = require('./sdekRouter')

router.use('/pr', prRouter) // Почта России
router.use('/sdek', sdekRouter) // СДЭК
// router.use('/dl', dlRouter) // Деловые Линии
// router.use('/pek', pekRouter) // ПЭК
// router.use('/bb', bbRouter) // БоксБери

module.exports = router
