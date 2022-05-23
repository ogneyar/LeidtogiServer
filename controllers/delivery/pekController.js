const axios  = require("axios")
const qs = require('qs')
const btoa = require('btoa') // перевод строки в Base64


class PekController {

    async calculate(req, res) {

        let {from_location, to_location, packages} = req.body

        let body = {
            from_location,
            to_location,
            packages
        }

        return res.json("await Sdek.calcByTariff(body)")
    }

    async test(req, res) {
        var bin = "Hello, 世界";
        var b64 = btoa(bin);
       
        console.log(b64);

        return res.json(b64)
    }

}


module.exports = new PekController()