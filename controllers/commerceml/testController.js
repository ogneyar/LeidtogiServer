
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')
const StringDecoder = require('string_decoder').StringDecoder


class TestController {

    async test(req, res) {

        let { type, mode, filename } = req.query
        // let file = req.files && req.files[0] || undefined

        if (req.headers) {
            // await sendMessage("req.headers: " + JSON.stringify(req.headers), false)
        }

        if (req.files) {
            await sendMessage("req.files", false)
            // await sendMessage("req.files: " + JSON.stringify(req.files), false)
        }

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
            fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', filename) 
            if ( ! fs.existsSync(fullPath)) 
            {
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
        }

        if (type !== "catalog") return res.json("success")

        if (mode === "checkauth") {
            await sendMessage("checkauth", false)
            return res.send(`success\nkuka\n42`)
        }
            
        if (mode === "init") {
            await sendMessage("init", false)
            return res.send(`zip=no\nfile_limit=50000`)
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