const ApiError = require('../error/apiError')
const axios = require('axios')
const uuid = require('uuid')
const path = require('path')
const https = require('https')
const fs = require('fs')
const XLSX = require('xlsx')
const createFoldersAndDeleteOldFiles = require('../utils/createFoldersAndDeleteOldFiles.js')
const reSearch = require('../utils/reSearch.js')


class parserController {

    async getImages(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response, Html, lengthHtml, serchString, lengthSerchString, number

        // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
        await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
            what: article
        }}).then(res => Html = res.data)
        
        Html = reSearch(Html, article)

        if (!Html) return res.send(null)
        
        // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
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

        createFoldersAndDeleteOldFiles(brand, article)

        response.carousel.productImages.forEach((i, index) => {

            if (index < 4) {
                let urlBig, urlSmall, fileName, filePathBig, filePathSmall, fileBig, fileSmall

                urlBig = i.big
                urlSmall = i.small
                
                fileName = uuid.v4() + '.jpg'
                
                filePathBig = brand + '/' + article + '/big/' + fileName
                filePathSmall = brand + '/' + article + '/small/' + fileName

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

        return res.json(arrayImages) // return array 
    }

    
    async getSizes(req, res) {
        let { article } = req.query  // milwaukee, 4933471077
        let response, Html, lengthHtml, serchString, lengthSerchString, number, weight, length, width, height

        // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
        await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
            what: article
        }}).then(res => Html = res.data)
        
        Html = reSearch(Html, article)

        if (!Html) return res.send(null)
        
        // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
        response = "https://rostov.vseinstrumenti.ru" + Html

        await axios.get(response)
            .then(res => Html = res.data)
        
        lengthHtml = Html.length
        serchString = `Информация об упаковке`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        Html = Html.substring(number + lengthSerchString, lengthHtml)

        lengthHtml = Html.length
        serchString = `</ul>`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        Html = Html.substring(0, number + lengthSerchString)

        lengthHtml = Html.length

        serchString = `Вес, кг:`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        weight = Html.substring(number + lengthSerchString, lengthHtml)
        serchString = `</li>`
        number = weight.indexOf(serchString)
        weight = weight.substring(0, number).trim()

        serchString = `Длина, мм:`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        length = Html.substring(number + lengthSerchString, lengthHtml)
        serchString = `</li>`
        number = length.indexOf(serchString)
        length = length.substring(0, number).trim()

        serchString = `Ширина, мм:`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        width = Html.substring(number + lengthSerchString, lengthHtml)
        serchString = `</li>`
        number = width.indexOf(serchString)
        width = width.substring(0, number).trim()

        serchString = `Высота, мм:`
        lengthSerchString = serchString.length
        number = Html.indexOf(serchString)
        height = Html.substring(number + lengthSerchString, lengthHtml)
        serchString = `</li>`
        number = height.indexOf(serchString)
        height = height.substring(0, number).trim()
    

        response = {
            "weight": weight,
            "volume": ((length*width*height)/1e9).toFixed(3),
            "length": length,
            "width": width,
            "height": height
            }

        
        return res.json(response) // return array 
    }
    

    async test(req, res) {
        let { article } = req.query
        
        let workbook = XLSX.readFile('MILWAUKEE.xlsx')

        var first_sheet_name = workbook.SheetNames[0];
        var address_of_cell = 'J10';

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        /* Find desired cell */
        var desired_cell = worksheet[address_of_cell];

        /* Get the value */
        var desired_value = (desired_cell ? desired_cell.v : undefined);


        return res.json(desired_value)
    }
}

module.exports = new parserController()