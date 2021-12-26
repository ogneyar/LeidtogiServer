
const Dl = require("../../service/delivery/dl/Dl")


class DlController {

    async auth(req, res) { // авторизация
        return res.json(await Dl.auth())
    }

    async calculator(req, res) { // Калькулятор стоимости и сроков заказа
        return res.json(await Dl.calculator(req.query))
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

    async searchTerminals(req, res) { // Поиск терминалов
        return res.json(await Dl.searchTerminals(req.query))
    }

}

module.exports = new DlController()