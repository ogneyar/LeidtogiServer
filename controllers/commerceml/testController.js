
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')
const getDateInName = require("../../service/getDateInName")
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

            let dateInName = getDateInName()

            fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', dateInName + "_" + filename) 
            try 
            {
                let decoder = new StringDecoder('utf8')
                fs.writeFileSync(fullPath, decoder.write(body))
            } 
            catch (err) 
            {
                await sendMessage(`Записать данные в файл не удалось. Имя файла: ${filename}`, false)
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