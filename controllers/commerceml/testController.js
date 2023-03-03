
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")



class TestController {

    async test(req, res) {

        // let {from_location, to_location, packages} = req.body

        sendMessage(JSON.stringify(req.query))

        return res.json(req.query)
        return res.json("success")
    }

}


module.exports = new TestController()