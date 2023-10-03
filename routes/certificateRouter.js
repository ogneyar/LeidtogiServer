const Router = require('express')
const router = new Router()
const certificateController = require('../controllers/certificateController')
const checkRole = require('../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', certificateController.create) // создание новой записи
}

router.post('/', checkRole('ADMIN'), certificateController.create) // создание новой записи
router.post('/from_a_file', checkRole('ADMIN'), certificateController.creatingFromAFile) // создание сертификатов из файла
router.get('/get_all', certificateController.getAll) // получение всех записей
router.get('/get_by_code', certificateController.getOneByCode) // получение записи по коду
router.get('/get_by_order_id', certificateController.getOneByOrderId) // получение записи по ордеру
router.delete('/:id', checkRole('ADMIN'), certificateController.delete) // удаление записи
router.put('/:id', checkRole('ADMIN'), certificateController.edit) // редактирование записей



module.exports = router