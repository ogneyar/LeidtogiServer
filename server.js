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
const favicon = require('serve-favicon')

const PORT = process.env.PORT || 3000
const CORS_URL = process.env.CORS_URL || "http://leidtogi.ru"
const CORS_URL_SECURE = process.env.CORS_URL_SECURE || "https://leidtogi.ru"

let whitelist = [
    CORS_URL, CORS_URL_SECURE, 'http://192.168.143.38:3000',
    'http://web.pzmarket.ru', 'https://web.pzmarket.ru',
    'http://pzmarket.ru', 'https://pzmarket.ru',
    'http://leidtogi.site', 'https://leidtogi.site',
	'http://www.leidtogi.site', 'https://www.leidtogi.site',
    'http://www.leidtogi.ru', 'https://www.leidtogi.ru',
    'http://leidtogi.ru', 'https://leidtogi.ru',
]
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
app.use(favicon(path.join(__dirname,'static','favicon.ico')))
app.use(fileUpload({}))
app.use('/api', router)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'static','welcome.html'))
})
app.get('/undefined', (req, res) => {
    res.status(200)
})
app.get('/echo', (req, res) => {
    res.sendFile(path.join(__dirname,'static','echo.json'))
})

// for w80x_duino
app.get('/temp.json', (req, res) => {
    res.sendFile(path.join(__dirname,'static','temp.json'))
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
