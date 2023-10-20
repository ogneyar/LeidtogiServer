
const getAllCatalogs = require("../service/catalogs/getAllCatalogs")


class CatalogsController {

    async create(req, res, next) {
        return res.json("create")
    }
    
    async getAll(req, res, next) {
        try {
            let response = getAllCatalogs()

            // return res.json(["LeidTogi.pdf","CleanVac.pdf"]) // return array
            return res.json(response) // return array
        }catch(e) {
            return next({ error: 'Ошибка метода getAll! ' + e });
        }
    }
}

module.exports = new CatalogsController()
