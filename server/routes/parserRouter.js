const Router = require('express')
const router = new Router()
const parserController = require('../controllers/parserController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.get('/images', checkRole('ADMIN'), parserController.getImages) // парсер изображений с http://vseinstrumenti.ru
router.get('/sizes', checkRole('ADMIN'), parserController.getSizes) // парсер габаритов с http://vseinstrumenti.ru
router.get('/price', checkRole('ADMIN'), parserController.getPrice) // парсер цены с http://mlk-shop.ru
router.get('/description', checkRole('ADMIN'), parserController.getDescription) // парсер описания с http://mlk-shop.ru
router.get('/characteristics', checkRole('ADMIN'), parserController.getCharacteristics) // парсер характеристик с http://mlk-shop.ru
router.get('/equipment', checkRole('ADMIN'), parserController.getEquipment) // парсер комплектации с http://mlk-shop.ru
router.get('/all', checkRole('ADMIN'), parserController.getAll)


router.get('/mail.ru', parserController.mailRu)
router.get('/ya.ru', parserController.yaRu)


router.get('/husqvarna_get_image', parserController.husqvarnaGetImage) // парсер хузкварна
router.get('/husqvarna_get_charcteristic', parserController.husqvarnaGetCharcteristic)


// router.get('/rgk', parserController.rgk) // парсер RGK
router.get('/rgk', checkRole('ADMIN'), parserController.rgk) // парсер RGK

// router.get('/rgkTemp', parserController.rgkTemp) // временный роут RGK
router.get('/rgkTemp', checkRole('ADMIN'), parserController.rgkTemp) // временный роут RGK


// router.get('/milwaukee', parserController.milwaukee) // парсер милуоки файла xlsx для обновления цен
router.post('/milwaukee', checkRole('ADMIN'), parserController.milwaukee) // парсер милуоки файла xlsx для обновления цен

// router.get('/mlk_add_urls', parserController.mlkAddUrls) // роут Milwaukee для добавления ссылок в файл
router.get('/mlk_add_urls', checkRole('ADMIN'), parserController.mlkAddUrls) // роут Milwaukee для добавления ссылок в файл

router.post('/mlk_xlsx_feed', checkRole('ADMIN'), parserController.mlkXlsxFeed) // парсер милуоки файла xlsx



module.exports = router