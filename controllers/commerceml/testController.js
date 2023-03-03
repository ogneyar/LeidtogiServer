
const axios  = require("axios")


class TestController {

    async test(req, res) {

        // let {from_location, to_location, packages} = req.body

        // let body = {
        //     from_location,
        //     to_location,
        //     packages
        // }

        return res.json("await")
    }

}


module.exports = new TestController()