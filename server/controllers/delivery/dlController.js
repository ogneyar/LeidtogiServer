
const Dl = require("../../service/delivery/dl/Dl")


class DlController {

    async auth(req, res) { // авторизация
        return res.json(await Dl.auth())
    }

    // Калькулятор стоимости и сроков заказа
    async calculator(req, res) { 
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

    // Поиск терминалов
    async searchTerminals(req, res) { 
        return res.json(await Dl.searchTerminals(req.query))
    }

    // Ограничения по параметрам заказа
    async requestConditions(req, res) { 
        return res.json(await Dl.requestConditions(req.query))
    }

    // этот метод находится в testerController
    // async places(req, res) { // Справочник населённых пунктов
    //     return res.json(await Dl.places())
    // }

    // этот метод пока не используется
    async streets(req, res) { // Справочник улиц
        return res.json(await Dl.streets())
    }

    // этот метод пока не используется
    async loadTypes(req, res) { // Справочник видов загрузки
        return res.json(await Dl.loadTypes())
    }

    // этот метод пока не используется
    async servises(req, res) { // Справочник специальных требований к транспорту
        return res.json(await Dl.servises())
    }

}

module.exports = new DlController()