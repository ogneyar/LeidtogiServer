const axios  = require("axios")
const qs = require('qs')


class PrController {

    async calculate(req, res) {

        let {from_location, to_location, packages} = req.body

        let body = {
            from_location,
            to_location,
            packages
        }

        return res.json("await Sdek.calcByTariff(body)")
    }

}


module.exports = new PrController()