const ApiError = require('../error/apiError')
const axios = require('axios')
const uuid = require('uuid')
const path = require('path')
var https = require('https')
var fs = require('fs')


function reSearch(string, brand) {
    if (!string) return null
    let saveString, lengthString, serchString, lengthSerchString, number

    lengthString = string.length
    serchString = `<div class="image">`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return null
    string = string.substring(number, lengthString)

    lengthString = string.length
    serchString = `href="`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return null
    string = string.substring(number + lengthSerchString, lengthString)

    saveString = string

    serchString = `"`
    number = string.indexOf(serchString)
    if (number === -1) return null
    string = string.substring(0, number)

    if (string.indexOf(brand) === -1) string = reSearch(saveString, brand)

    return string
}

class parserController {

    async getArrayImages(req, res) {
        let { brand, article } = req.body  // milwaukee, 4933471077
        let response, Html, lengthHtml, serchString, lengthSerchString, number

        // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
        await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
            what: article
        }}).then(res => Html = res.data)
        
        Html = reSearch(Html, brand)

        if (!Html) return res.send(null)
        
        response = "https://rostov.vseinstrumenti.ru" + Html

        await axios.get(response)
            .then(res => Html = res.data)
        
        lengthHtml = Html.length
        serchString = `<div class="product-photo">`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        Html = Html.substring(number, lengthHtml)
        
        lengthHtml = Html.length
        serchString = `data-context='`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        Html = Html.substring(number + lengthSerchString, lengthHtml)

        serchString = `}'>`
        number = Html.indexOf(serchString) + 1
        Html = Html.substring(0, number)
    
        response = JSON.parse(Html)

        let arrayImages = []

        response.carousel.productImages.forEach((i, index) => {

            if (index < 4) {
                let urlBig, urlSmall, fileName, filePathBig, filePathSmall, fileBig, fileSmall

                urlBig = i.big
                urlSmall = i.small
                
                fileName = uuid.v4() + '.jpg'
                
                filePathBig = brand + '/' + article + '/big/' + fileName
                filePathSmall = brand + '/' + article + '/small/' + fileName

                if (!fs.existsSync(path.resolve(__dirname, '..', 'static', brand))){
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand))
                }
                if (!fs.existsSync(path.resolve(__dirname, '..', 'static', brand, article))){
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article))
                }
                if (!fs.existsSync(path.resolve(__dirname, '..', 'static', brand, article, 'big'))){
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'big'))
                }
                if (!fs.existsSync(path.resolve(__dirname, '..', 'static', brand, article, 'small'))){
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'small'))
                }

                fileBig = fs.createWriteStream(path.resolve(__dirname, '..', 'static', brand, article, 'big', fileName));
        
                https.get(urlBig, function(response) {
                    response.pipe(fileBig)
                })
        
                fileSmall = fs.createWriteStream(path.resolve(__dirname, '..', 'static', brand, article, 'small', fileName));
        
                https.get(urlSmall, function(response) {
                    response.pipe(fileSmall)
                })

                arrayImages = [...arrayImages, {"big": filePathBig,"small": filePathSmall}]
            }
        })

        // return res.json(JSON.stringify(arrayImages)) // return array 
        // return res.send(JSON.stringify(arrayImages)) // return array 
        return res.json(arrayImages) // return array 
    }
}

module.exports = new parserController()