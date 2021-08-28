const ApiError = require('../error/apiError')
const axios = require('axios')
const XLSX = require('xlsx')

const reSearch = require('../service/reSearch.js')
const searchArrayImages = require('../service/searchArrayImages.js')
const searchSizes = require('../service/searchSizes.js')


class parserController {

    async getImages(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response, Html

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
        
        response = searchArrayImages(brand, article, Html)

        return res.json(response) // return array 
    }

    
    async getSizes(req, res) {
        let { article } = req.query  // milwaukee, 4933471077
        let response, Html

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
        
        response = searchSizes(Html)
        
        return res.json(response) // return array 
    }

    
    async getAll(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response, Html, images, sizes

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
                
        images = searchArrayImages(brand, article, Html)

        sizes = searchSizes(Html)
        
        return res.json({images, sizes}) // return array 
    }


    async testXLSX(req, res) {
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

    async mailRu(req, res) {
        let { email } = req.query
        let response
        // let config = {
        //     host: "e.mail.ru",
        //     headers: {
        //         "Cookie": "mrcu=615E6129F2B1975A5B53E64C3BB0",
        //         "Origin": "https://e.mail.ru"
        //     }
        //   }

        // await axios.post("https://e.mail.ru/api/v1/user/password/restore", { email }, config)
        await axios.post("https://e.mail.ru/api/v1/user/password/restore", { email })
            .then(res => response = res.data)
            .catch(err => response = err)
        
        return res.json(response)
    }

    async yaRu(req, res) {
        let { email } = req.query
        let response
        await axios.post("https://passport.yandex.ru/registration-validations/auth/multi_step/start", { login:email })
            .then(res => response = res.data)
            .catch(err => response = err)
        return res.json(response)
    }
}

module.exports = new parserController()