
const Boxberry = require("../../service/delivery/boxberry/Boxberry")


class BoxberryController {

    async deliveryCosts(req, res) {
        return res.json(await Boxberry.deliveryCosts(req.query))
    }

    async listCities(req, res) {
        let { CountryCode, Name, Region } = req.query
        let response = await Boxberry.listCities({CountryCode})
        if (response.error === undefined) {
            // if (Name) return res.json(response.filter(i => i.Name.includes(Name))) 
            if (Name) return res.json(response.filter(i => i.Name.toLowerCase().startsWith(Name.toLowerCase()))) 
            // if (Region) return res.json(response.filter(i => i.Region.includes(Region)))
            if (Region) return res.json(response.filter(i => i.Region.toLowerCase().startsWith(Region.toLowerCase())))
        }
        return res.json(response)
    }

    async listCitiesFull(req, res) {
        return res.json(await Boxberry.listCitiesFull(req.query))
    }

    async listPoints(req, res) {
        return res.json(await Boxberry.listPoints(req.query))
    }

    async listZips(req, res) { // Список почтовых индексов для КД (Курьерская Доставка)
        let { City, Region } = req.query
        let response = await Boxberry.listZips()
        if (response.error === undefined) {
            if (City) return res.json(response.filter(i => i.City.includes(City)))
            if (Region) return res.json(response.filter(i => i.Region.includes(Region)))
        }
        return res.json(response)
    }

    async zipCheck(req, res) { // Проверка почтового индекса для КД (Курьерская Доставка)
        let response = await Boxberry.zipCheck(req.query)
        if (response.err !== undefined) response = {error: response.err}
        return res.json(response)
    }
}

module.exports = new BoxberryController()