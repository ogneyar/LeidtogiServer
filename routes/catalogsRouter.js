
const Router = require('express')
const router = new Router()
const catalogsController = require('../controllers/catalogsController')
// const checkRole = require('../middleware/checkRoleMiddleware')

// router.post('/', checkRole('ADMIN'), catalogsController.create) // создание новой записи
router.get('/', catalogsController.getAll) // получение всех записей

module.exports = router
