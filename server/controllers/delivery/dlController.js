
const Dl = require("../../service/delivery/dl/Dl")


class DlController {

    async auth(req, res) { // авторизация
        return res.json(await Dl.auth())
    }

    // Калькулятор стоимости и сроков заказа
    async calculator(req, res) { 
        try {
            return res.json(await Dl.calculator(req.query))
        }catch(error) {
            return res.json(error)
        }
    }

    async microCalc(req, res) { // Калькулятор ориентировочной стоимости и сроков заказа
        return res.json(await Dl.microCalc(req.query))
    }

    async kladr(req, res) { // Поиск населённых пунктов
        return res.json(await Dl.kladr(req.query))
    }

    async terminals(req, res) { // Справочник терминалов
        return res.json(await Dl.terminals())
    }

    async terminalsCatalog(req, res) { // Справочник терминалов
        return res.json(await Dl.terminalsCatalog(req.query))
    }

    // Поиск терминалов
    async searchTerminals(req, res) { 
        return res.json(await Dl.searchTerminals(req.query))
    }

    // Ограничения по параметрам заказа
    async requestConditions(req, res) { 
        try {
            return res.json(await Dl.requestConditions(req.query))
        }catch(error) {
            return res.json(error)
        }
    }

    // этот метод находится и используется в testerController
    async places(req, res) { // Справочник населённых пунктов
        try {
            return res.json(await Dl.places())
        }catch(error) {
            return res.json(error)
        }
    }
    // 
    async getPlaces(req, res) { // Справочник населённых пунктов
        try {
            return res.json(await Dl.getPlaces(req.query))
        }catch(error) {
            return res.json(error)
        }
    }

    // Справочник улиц
    async streets(req, res) {
        try {
            return res.json(await Dl.streets())
        }catch(error) {
            return res.json(error)
        }
    }

    //  Справочник видов загрузки
    async loadTypes(req, res) {
        try {
            return res.json(await Dl.loadTypes())
        }catch(error) {
            return res.json(error)
        }
    }

    // Справочник специальных требований к транспорту
    async servises(req, res) {
        try {
            return res.json(await Dl.servises())
        }catch(error) {
            return res.json(error)
        }
    }

}

module.exports = new DlController()