
const Dl = require("../../service/delivery/dl/Dl")


class DlController {

    async auth(req, res) {
        return res.json(await Dl.auth())
    }

    async calculator(req, res) {
        return res.json(await Dl.calculator(req.query))
    }

    async micro_calc(req, res) {
        return res.json(await Dl.micro_calc(req.query))
    }


}

module.exports = new DlController()