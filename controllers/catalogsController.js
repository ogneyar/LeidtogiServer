
const addedCatalog = require("../service/catalogs/addedCatalog");
const deleteCatalog = require("../service/catalogs/deleteCatalog");
const getAllCatalogs = require("../service/catalogs/getAllCatalogs")


class CatalogsController {
    
    async getAll(req, res, next) {
        try {
            let response = getAllCatalogs()

            // return res.json(["LeidTogi.pdf","CleanVac.pdf"]) // return array
            return res.json(response) // return array
        }catch(e) {
            return next({ error: 'Ошибка метода getAll! ' + e })
        }
    }
    
    async addOne(req, res, next) {
        try {
            let response = false
            let catalog = req.files && req.files.catalog || undefined

            if (catalog) response = await addedCatalog(catalog)

            return res.json(response) // return boolean
        }catch(e) {
            return next({ error: 'Ошибка метода addOne! ' + e })
        }
    }
    
    async delOne(req, res, next) {
        try {
            let response = false
            const { name } = req.params

            if (name) response = deleteCatalog(name)

            return res.json(response) // return boolean
        }catch(e) {
            return next({ error: 'Ошибка метода delOne! ' + e })
        }
    }
}

module.exports = new CatalogsController()
