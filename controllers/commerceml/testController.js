
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')
const getDateInName = require("../../service/getDateInName")
const StringDecoder = require('string_decoder').StringDecoder


class TestController {

    async test(req, res) {

        /*
        type:
            catalog - товары (1с присылает данные о товарах)
            sale - заказы (1с запрашивает данные о заказах)

        */
        let { type, mode, filename } = req.query

        let fullPath = ""
        if (req.body && JSON.stringify(req.body) !== "{}") 
        {
            let body = req.body
            await sendMessage("req.body.type === 'Buffer'", false)
            
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))
            }
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))
            }

            let dateInName = getDateInName()

            if (filename.includes("import_files")) {
                
                if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'import_files'))) 
                {
                    fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'import_files'))
                }

                let idx = filename.indexOf("/")
                filename = filename.substring(idx+1, filename.length)
                idx = filename.indexOf("/")
                let folderName = filename.substring(0, idx)

                if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName))) 
                {
                    fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName))
                }

                filename = filename.substring(idx+1, filename.length)
                fullPath = path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName, filename) 
                try 
                {
                    fs.writeFileSync(fullPath, Buffer.from(body, "base64"))
                    await sendMessage(`Записал данные в файл. Имя файла: ${filename}`, false)
                } 
                catch (err) 
                {
                    await sendMessage(`Записать данные в файл не удалось. Имя файла: ${filename}`, false)
                }
            }else {
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

        }

        // if (type !== "catalog") {
        //     await sendMessage("type: " + type + ", mode: " + mode, false)
        //     return res.json("success")
        // }

        if (mode === "checkauth") 
        {
            await sendMessage("checkauth", false)
            return res.send(`success\nkuka\n42`)
        }
        else if (mode === "init") 
        {
            await sendMessage("init", false)
            return res.send(`zip=no\nfile_limit=52428800`) // 52 428 800 байт = 50 Мб
        }
        else if (mode === "file") 
        {
            if ( ! fullPath ) await sendMessage("mode: " + mode + " filename: " + filename, false)
        }
        else if (mode === "import") 
        {
            await sendMessage("mode: " + mode + " filename: " + filename, false)
        }
        else if (mode) 
        {            
            await sendMessage("mode: " + mode, false)
        }

        return res.send("success")
    }

}


module.exports = new TestController()