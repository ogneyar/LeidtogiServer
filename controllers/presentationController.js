
const addedPresentation = require("../service/presentation/addedPresentation");
const deletePresentation = require("../service/presentation/deletePresentation");
const getAllPresentations = require("../service/presentation/getAllPresentations")


class PresentationController {
    
    async getAll(req, res, next) {
        try {
            let response = getAllPresentations()

            return res.json(response) // return array
        }catch(e) {
            return next({ error: 'Ошибка метода getAll! ' + e })
        }
    }
    
    async addOne(req, res, next) {
        try {
            let response = false
            let presentation = req.files && req.files.catalog || undefined

            if (presentation) response = await addedPresentation(presentation)

            return res.json(response) // return boolean
        }catch(e) {
            return next({ error: 'Ошибка метода addOne! ' + e })
        }
    }
    
    async delOne(req, res, next) {
        try {
            let response = false
            const { name } = req.params

            if (name) response = deletePresentation(name)

            return res.json(response) // return boolean
        }catch(e) {
            return next({ error: 'Ошибка метода delOne! ' + e })
        }
    }
}

module.exports = new PresentationController()
