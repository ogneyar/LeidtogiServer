
const Router = require('express')
const router = new Router()

const sendBot = require('../../service/telegram/prizmMarketBots/sendBot')


const webHook = async (req, res, next) => {
    let chat_id = ""
    let type = ""
    let text = ""
    if (req.body && req.body.message && req.body.message.chat) {
        chat_id = req.body.message.chat.id
        type = req.body.message.chat.type
        text = req.body.message.text
        // if (text) text = text.toLowerCase()
    }

    if (text == "курс prizm" || text == "курс" || text == "rehc" || text == "цена") {  // Курс PRIZM
	
        let kursPrizm = 22 // getKursPrizm()
        
        // if (strpos(kurs_PZM, "Н")!==0) {
    
            // if ((chat_id == Макса_группа || chat_id == admin_group)) {
            //     курс_РКАЦ = _курс_РКАЦ();	
            //     reply = $курс_РКАЦ . $kurs_PZM;
            // }else {
            //     reply = $kurs_PZM;
            // }
            
        // }else {
            // reply = kurs_PZM;
        // }
        
        // КНОПКА Репост
        let InlineKeyboardMarkup  = { 
            inline_keyboard: [ 
                [ 
                    { 
                        text: "Репост", 
                        url: "http://prizmarket.ru" 
                        // switch_inline_query: "курс" 
                    } 
                ],
            ]
        }
        
        sendBot({
            bot: "prizm_market_bot", 
            chat_id: process.env.TELEGRAM_CHAT_ID_ADMIN, 
            text: "*Бот на ремонте!!!*",
            // reply_markup: InlineKeyboardMarkup
        })
    }else {
        if (type == "private") sendBot({bot: "prizm_market_bot", chat_id, text: "Бот на ремонте"})
    }

    // if (type == "private" && req.body) sendBot({bot: "prizm_market_bot", chat_id: process.env.TELEGRAM_CHAT_ID_ADMIN, text: JSON.stringify(req.body)})
    
    res.status(200).send('ok')
}

// if (process.env.URL === "http://localhost:5000") router.get('/', webHook)
router.get('/', webHook)
router.post('/', webHook)



module.exports = router