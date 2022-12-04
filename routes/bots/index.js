
const Router = require('express')
const router = new Router()


const prizmMarketBotRouter = require('./prizmMarketBotRouter')
const zakazPrizmBotRouter = require('./zakazPrizmBotRouter')
const zakazLotBotRouter = require('./zakazLotBotRouter')


router.use('/prizm_market_bot', prizmMarketBotRouter)
router.use('/zakaz_prizm_bot', zakazPrizmBotRouter)
router.use('/zakazLOTbot', zakazLotBotRouter)


module.exports = router