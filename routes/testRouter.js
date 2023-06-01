
const Router = require('express')
const router = new Router()
// const path = require('path')
// const fs = require('fs')
// const axios = require('axios')

const testController = require('../controllers/testController')


if (process.env.URL === "http://localhost:5000") {
    
    router.post('/', testController.testPost)
    
    router.get('/', testController.testGet)
    
    router.get('/tor', testController.testTorGet)

    router.get('/kvt', testController.testKvt)
    
}

// router.delete('/:id', testController.delete)
// router.put('/:id', testController.edit)



module.exports = router