const Router = require('express')
const router = new Router()
const kvtController = require('../../controllers/parser/kvtController')
const checkRole = require('../../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', kvtController.kvt) // добавление нового товара или обновление цен
}
router.post('/', checkRole("ADMIN"), kvtController.kvt) // добавление нового товара или обновление цен



module.exports = router