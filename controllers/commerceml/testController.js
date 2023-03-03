
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')


class TestController {

    async test(req, res) {

        let { type, mode, filename } = req.query
        let file = req.files && req.files[`${filename}`] || undefined
        
        if (file && file.name !== undefined) {
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'advanta'))
            let fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', file.name)
            await file.mv(fullPath)
        }

        // sendMessage(JSON.stringify(req.query))

        if (type !== "catalog")
            return res.json("success")

        if (mode === "checkauth") 
            return res.send(`
                success\n
                kuka\n
                42
            `)
            
        if (mode === "init") 
            return res.send(`
                zip=no\n
                file_limit=50
            `)
            
        if (mode === "file")   
            return res.send(`
                success
            `)


        return res.send("success")
    }

}


module.exports = new TestController()