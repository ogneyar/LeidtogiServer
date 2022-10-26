
// const Category = require("../models/Category")


module.exports = class FeedDto {
    article
    name
    price
    description
    characteristics
    size
    image
    country
    category
    url

    constructor(model) {
        this.article = model.article
        this.name = model.name
        this.price = model.price
        this.description = model.info.filter(i => i.title === "description")[0].body || ""
        this.characteristics = model.info.filter(i => i.title === "characteristics")[0].body || ""
        // this.size = model.size[0]
        this.size = { 
            weight: model.size[0].weight, 
            width: model.size[0].width, 
            height: model.size[0].height, 
            length: model.size[0].length, 
            volume: model.size[0].volume
        }
        this.image = process.env.URL + "/" + (typeof(model.img) === "string" ? JSON.parse(model.img) : model.img)[0].big || null
        this.country = model.country
        this.category = { name: model.category.name, uri: model.category.url, url: process.env.CORS_URL + "/" + model.category.url }
        this.url = process.env.CORS_URL + "/leidtogi/" + model.url
    }
}

