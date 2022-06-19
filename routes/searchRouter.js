const Router = require('express')
const router = new Router()
const searchController = require('../controllers/searchController')
const authMiddleware = require('../middleware/authMiddleware')

// router.post('/', authMiddleware, searchController.search)

router.get('/article', searchController.article) 
router.get('/name', searchController.name) 


module.exports = router
