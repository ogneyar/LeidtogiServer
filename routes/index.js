const Router = require('express')
const router = new Router()

const productRouter = require('./productRouter')
const productInfoRouter = require('./productInfoRouter')
const productSizeRouter = require('./productSizeRouter')
const cartRouter = require('./cartRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const ratingRouter = require('./ratingRouter')
const parserRouter = require('./parserRouter')
const testerRouter = require('./testerRouter')
const deliveryRouter = require('./deliveryRouter')
const orderRouter = require('./orderRouter')
const testRouter = require('./testRouter')
const telegramRouter = require('./telegramRouter')
const mailRouter = require('./mailRouter')
const searchRouter = require('./searchRouter')
const dealerRouter = require('./dealerRouter')
const sortProductRouter = require('./sortProductRouter')
const commerceml = require('./commerceml')
const certificateRouter = require('./certificateRouter')
const catalogsRouter = require('./catalogsRouter')


router.use('/user', userRouter)
router.use('/cart', cartRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/product_info', productInfoRouter)
router.use('/product_size', productSizeRouter)
router.use('/rating', ratingRouter)
router.use('/parser', parserRouter)
router.use('/tester', testerRouter)
router.use('/delivery', deliveryRouter)
router.use('/order', orderRouter)
router.use('/test', testRouter)
router.use('/telegram', telegramRouter)
router.use('/mail', mailRouter)
router.use('/search', searchRouter)
router.use('/dealer', dealerRouter)
router.use('/sort_product', sortProductRouter)
router.use('/commerceml', commerceml)
router.use('/certificate', certificateRouter)
router.use('/catalogs', catalogsRouter)


module.exports = router