const Router = require('express')
const router = new Router()

const sdekRouter = require('./sdekRouter')
const boxberryRouter = require('./boxberryRouter')
const dlRouter = require('./dlRouter')
// const pekRouter = require('./pekRouter')
// const prRouter = require('./prRouter')

router.use('/sdek', sdekRouter) // СДЭК
router.use('/boxberry', boxberryRouter) // БоксБери
router.use('/dl', dlRouter) // Деловые Линии
// router.use('/pek', pekRouter) // ПЭК
// router.use('/pr', prRouter) // Почта России

module.exports = router
