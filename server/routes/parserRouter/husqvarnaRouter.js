const Router = require('express')
const router = new Router()
const husqvarnaController = require('../../controllers/parser/husqvarnaController')
const checkRole = require('../../middleware/checkRoleMiddleware')


// router.get('/', husqvarnaController.husqvarna) // добавление нового товара или обновление цен
router.post('/', checkRole("ADMIN"), husqvarnaController.husqvarna) // добавление нового товара или обновление цен

router.get('/get_image', husqvarnaController.getImage) // получение изображения товара
router.get('/get_charcteristics', husqvarnaController.getCharcteristics) // получение характеристик товара
router.get('/get_description', husqvarnaController.getDescription) // получение описания товара

router.get('/test', husqvarnaController.test) // тест


module.exports = router