
const Router = require('express')
const router = new Router()
const cleanvacController = require('../../controllers/parser/cleanvacController')
const checkRole = require('../../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', cleanvacController.cleanvac) // добавление нового товара или обновление цен
}
router.post('/', checkRole("ADMIN"), cleanvacController.cleanvac) // добавление нового товара или обновление цен



module.exports = router
