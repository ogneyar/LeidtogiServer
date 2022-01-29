const Router = require('express')
const router = new Router()
const milwaukeeController = require('../../controllers/parser/milwaukeeController')
const checkRole = require('../../middleware/checkRoleMiddleware')


router.post('/add_new_product', checkRole('ADMIN'), milwaukeeController.addNewProduct) // добавление новых товаров из милуоки фида xlsx

router.get('/get_all', checkRole('ADMIN'), milwaukeeController.getAll) // получение всех данных о товаре

// router.get('/', milwaukeeController.milwaukee) // обновление цен
router.post('/', checkRole('ADMIN'), milwaukeeController.milwaukee) // обновление цен

// router.get('/add_urls', milwaukeeController.mlkAddUrls) // добавления ссылок в файл
router.get('/add_urls', checkRole('ADMIN'), milwaukeeController.addUrls) // добавления ссылок в файл




module.exports = router