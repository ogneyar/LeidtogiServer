const Router = require('express')
const router = new Router()

const milwaukeeRouter = require('./milwaukeeRouter')
const rgkRouter = require('./rgkRouter')
const husqvarnaRouter = require('./husqvarnaRouter')
const parseRouter = require('./parseRouter')


router.use('/milwaukee', milwaukeeRouter) // Milwaukee
router.use('/rgk', rgkRouter) // РусГеоКом
router.use('/husqvarna', husqvarnaRouter) // Husqvarna

router.use('/parse', parseRouter) // Парсер mail.ru, ya.ru и т.п.


module.exports = router
