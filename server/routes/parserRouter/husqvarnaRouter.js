const Router = require('express')
const router = new Router()
const husqvarnaController = require('../../controllers/parser/husqvarnaController')
const checkRole = require('../../middleware/checkRoleMiddleware')


router.get('/', husqvarnaController.husqvarna) // 
// router.get('/', checkRole("ADMIN"), husqvarnaController.husqvarna) // 

router.get('/get_image', husqvarnaController.getImage) // получение изображения товара
router.get('/get_charcteristics', husqvarnaController.getCharcteristics) // получение характеристик товара
router.get('/get_description', husqvarnaController.getDescription) // получение описания товара



module.exports = router