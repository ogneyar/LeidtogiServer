require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3000
const CORS_URL = process.env.CORS_URL || "https://leidtogi.ru"

const app = express()
app.use(cors({ origin: CORS_URL }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.get('/', (req, res) => {
    if (CORS_URL === "http://localhost:3000") {
        res.send("MERN server - приветствует тебя!")
    }else {
        res.redirect("https://leidtogi.ru")
    }    
})
app.get('/undefined', (req, res) => {
    res.status(200)
})

// Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() 
        app.listen(PORT, () => console.log(`Server run: http://localhost:${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()
