
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')


class TestController {

    async test(req, res) {

        let { type, mode, filename } = req.query
        let file = req.files && req.files[0] || undefined

        if (req.files) {
            await sendMessage("req.files", false)
            await sendMessage("req.files: " + JSON.stringify(req.files), false)
        }

        if (req.body && req.body !== {}) {
            await sendMessage("req.body", false)
            await sendMessage("req.body: " + JSON.stringify(req.body), false)
        }
        
        if (file && file.name !== undefined) {
            await sendMessage("file.name = " + filename)
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'advanta'))
            let fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', file.name)
            await file.mv(fullPath)
        }

        // sendMessage(JSON.stringify(req.query))

        if (type !== "catalog") return res.json("success")

        if (mode === "checkauth") {
            await sendMessage("checkauth", false)
            return res.send(`success\nkuka\n42`)
        }
            
        if (mode === "init") {
            await sendMessage("init", false)
            return res.send(`zip=yes\nfile_limit=500`)
        }
            
        if (mode === "file") {
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