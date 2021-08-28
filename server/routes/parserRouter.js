const Router = require('express')
const router = new Router()
const parserController = require('../controllers/parserController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/images', checkRole('ADMIN'), parserController.getImages)
router.get('/sizes', checkRole('ADMIN'), parserController.getSizes)
router.get('/all', checkRole('ADMIN'), parserController.getAll)
router.get('/mail.ru', parserController.mailRu)
router.get('/ya.ru', parserController.yaRu)
router.get('/xlsx', parserController.testXLSX)

module.exports = router