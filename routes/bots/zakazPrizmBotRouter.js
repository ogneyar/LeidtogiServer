//
const Router = require('express')
const router = new Router()

const sendBot = require('../../service/telegram/prizmMarketBots/sendBot')


const webHook = async (req, res, next) => {
    let chat_id = ""
    let type = ""
    if (req.body && req.body.message && req.body.message.chat) {
        chat_id = req.body.message.chat.id
        type = req.body.message.chat.type
    }
    if (type == "private") sendBot({bot: "zakaz_prizm_bot", chat_id, text: "Бот на ремонте"})
    
    res.status(200).send('ok')
}

// if (process.env.URL === "http://localhost:5000") router.get('/', webHook)
router.get('/', webHook)
router.post('/', webHook)



module.exports = router