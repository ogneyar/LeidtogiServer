
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')
const StringDecoder = require('string_decoder').StringDecoder


class TestController {

    async test(req, res) {

        let { type, mode, filename } = req.query

        let fullPath = ""
        if (req.body && JSON.stringify(req.body) !== "{}") 
        {
            let body = req.body
            await sendMessage("req.body.type === 'Buffer'", false)
            
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            }
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'commerceml'))
            }
            
            let now = new Date()
            if (process.env.URL === "http://server.hutor.site") await sendMessage("now: " + now, false)
            let year = now.getFullYear()
            let month = now.getMonth() + 1
            let day = now.getDate()
            let hour = now.getHours()
            let min = now.getMinutes()
            let sec = now.getSeconds()
            if (month < 10) month = `0${month}`
            if (day < 10) day = `0${day}`
            if (hour < 10) hour = `0${hour}`
            if (min < 10) min = `0${min}`
            if (sec < 10) sec = `0${sec}`

            let dateInName = `${year}.${month}.${day}_${hour}.${min}.${sec}`

            fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', dateInName + "_" + filename) 
            try 
            {
                let decoder = new StringDecoder('utf8')
                fs.writeFileSync(fullPath, decoder.write(body))
            } 
            catch (err) 
            {
                await sendMessage(`Записать данные в файл не удалось.`, false)
            }
        }

        if (type !== "catalog") return res.json("success")

        if (mode === "checkauth") {
            await sendMessage("checkauth", false)
            return res.send(`success\nkuka\n42`)
        }
            
        if (mode === "init") {
            await sendMessage("init", false)
            return res.send(`zip=no\nfile_limit=52428800`) // 52 428 800 байт = 50 Мб
        }
            
        if (mode === "file") {
            if ( ! fullPath )
                await sendMessage("mode: " + mode + " filename: " + filename, false)
            return res.send(`success`)
        }
            
        if (mode === "import") {
            await sendMessage("mode: " + mode + " filename: " + filename, false)
            return res.send(`success`)
        }


        return res.send("success")
    }

}


module.exports = new TestController()