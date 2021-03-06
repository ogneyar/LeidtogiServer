const Router = require('express')
const router = new Router()

const parseRouter = require('./parseRouter')
const milwaukeeRouter = require('./milwaukeeRouter')
const rgkRouter = require('./rgkRouter')
const husqvarnaRouter = require('./husqvarnaRouter')
const kvtRouter = require('./kvtRouter')
const gedoreRouter = require('./gedoreRouter')
const tmkRouter = require('./tmkRouter')
const leidtogiRouter = require('./leidtogiRouter')
const advantaRouter = require('./advantaRouter')
const euroboorRouter = require('./euroboorRouter')


router.use('/parse', parseRouter) // Парсер mail.ru, ya.ru и т.п.
router.use('/milwaukee', milwaukeeRouter) // Milwaukee
router.use('/rgk', rgkRouter) // РусГеоКом
router.use('/husqvarna', husqvarnaRouter) // Husqvarna
router.use('/kvt', kvtRouter) // КВТ
router.use('/gedore', gedoreRouter) // Gedore
router.use('/tmk', tmkRouter) // Tmk
router.use('/leidtogi', leidtogiRouter) // LeidTogi
router.use('/advanta', advantaRouter) // Advanta-M
router.use('/euroboor', euroboorRouter) // Euroboor



module.exports = router
