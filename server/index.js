require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3000
const CORS_URL = process.env.CORS_URL || "https://leidtogi.ru"
const CORS_URL_SECURE = process.env.CORS_URL_SECURE || "https://leidtogi.ru"

let whitelist = [CORS_URL, CORS_URL_SECURE, 'http://192.168.0.244:3000']
let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions) 
}

const app = express()
// app.use(cors({ origin: CORS_URL }))
app.use(cors(corsOptionsDelegate))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.get('/', (req, res) => {
    if (CORS_URL === "http://localhost:3000") {
        res.send("MERN server - приветствует тебя!")
    }else {
        res.redirect(CORS_URL)
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
