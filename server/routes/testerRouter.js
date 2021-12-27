const Router = require('express')
const router = new Router()
const testerController = require('../controllers/testerController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/feed', checkRole("ADMIN"), testerController.setFeed)
// router.get('/feed', testerController.getFeed)

// router.get('/locationCitiesSdek', checkRole("ADMIN"), testerController.locationCitiesSdek)
router.get('/locationCitiesSdek', testerController.locationCitiesSdek)


module.exports = router