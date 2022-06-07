const Router = require('express')
const router = new Router()
const testerController = require('../controllers/testerController')
const checkRole = require('../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/set_feed', testerController.setFeed)
    router.get('/set_location_cities_sdek', testerController.setLocationCitiesSdek)
    router.get('/set_places_dl', testerController.setPlacesDl)
    router.get('/temp', testerController.temp)
}
router.post('/set_feed', checkRole("ADMIN"), testerController.setFeed)
router.get('/set_location_cities_sdek', checkRole("ADMIN"), testerController.setLocationCitiesSdek)
router.get('/set_places_dl', checkRole("ADMIN"), testerController.setPlacesDl)


module.exports = router