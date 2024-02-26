
const Router = require('express')
const router = new Router()
const ptkController = require('../../controllers/parser/ptkController')
const checkRole = require('../../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', ptkController.ptk) // добавление нового товара или обновление цен
}
router.post('/', checkRole("ADMIN"), ptkController.ptk) // добавление нового товара или обновление цен



module.exports = router
