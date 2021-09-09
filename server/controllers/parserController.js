const ApiError = require('../error/apiError')
const axios = require('axios')
const XLSX = require('xlsx')

const getUrlVseinstrumenti = require('../service/parser/getUrlVseinstrumenti.js')
const getArrayImages = require('../service/parser/getArrayImages.js')
const getSizes = require('../service/parser/getSizes.js')
const getPrice = require('../service/parser/getPrice.js')
const getUrlMlkShop = require('../service/parser/getUrlMlkShop.js')
const getDescription = require('../service/parser/getDescription.js')
const getCharacteristics = require('../service/parser/getCharacteristics.js')
const getEquipment = require('../service/parser/getEquipment.js')
const getAllData = require('../service/parser/getAllData.js')


class parserController {

    async getImages(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response, Html

        // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
        await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
            what: article
        }}).then(res => Html = res.data)
        
        Html = getUrlVseinstrumenti(Html, article)

        if (!Html) return res.send(null)
        
        // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
        response = "https://rostov.vseinstrumenti.ru" + Html

        await axios.get(response)
            .then(res => Html = res.data)
        
        response = getArrayImages(brand, article, Html)

        return res.json(response) // return array 
    }

    
    async getSizes(req, res) {
        let { article } = req.query  // milwaukee, 4933471077
        let response, Html

        // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
        await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
            what: article
        }}).then(res => Html = res.data)
        
        Html = getUrlVseinstrumenti(Html, article)

        if (!Html) return res.send(null)
        
        // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
        response = "https://rostov.vseinstrumenti.ru" + Html

        await axios.get(response)
            .then(res => Html = res.data)
        
        response = getSizes(Html)
        
        return res.json(response) // return array 
    }
    

    async getPrice(req, res) {
        let { article } = req.query  // milwaukee, 4933451439
        let string

        // https://mlk-shop.ru/search?search=4933451439
        await axios.get('https://mlk-shop.ru/search', {params: {
            search: article
        }}).then(res => string = res.data)
        
        if (!string) return {error:'Не сработал axios.get(https://mlk-shop.ru/search)',string}

        string = getPrice(string)
                
        return res.json(string) 
    }
    

    async getDescription(req, res) {
        let { article } = req.query  // milwaukee, 4933451439
        let string

        // https://mlk-shop.ru/search?search=4933451439
        await axios.get('https://mlk-shop.ru/search', {params: {
            search: article
        }}).then(res => string = res.data)
        
        if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

        string = getUrlMlkShop(string)

        if (string.error !== undefined) return res.send(string)

        // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
        await axios.get(string.message).then(res => string = res.data)

        if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
        
        string = getDescription(string)

        return res.send(string)                
    }

    async getCharacteristics(req, res) {
        let { article } = req.query  // milwaukee, 4933451439
        let string

        // https://mlk-shop.ru/search?search=4933451439
        await axios.get('https://mlk-shop.ru/search', {params: {
            search: article
        }}).then(res => string = res.data)
        
        if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

        string = getUrlMlkShop(string)

        if (string.error !== undefined) return res.send(string)

        // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
        await axios.get(string.message).then(res => string = res.data)

        if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
        
        string = getCharacteristics(string)

        return res.send(string)                
    }
    

    async getEquipment(req, res) {
        let { article } = req.query  // milwaukee, 4933451439
        let string

        // https://mlk-shop.ru/search?search=4933451439
        await axios.get('https://mlk-shop.ru/search', {params: {
            search: article
        }}).then(res => string = res.data)
        
        if (!string) return res.send({error:"Не сработал axios.get(https://mlk-shop.ru/search)"})

        string = getUrlMlkShop(string)

        if (string.error !== undefined) return res.send(string)

        // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
        await axios.get(string.message).then(res => string = res.data)

        if (!string) return res.send({error:"Не сработал axios.get(string.message), не найден string.message"})
        
        string = getEquipment(string)

        return res.send(string)                
    }


    async getAll(req, res) {
        let { brand, article } = req.query  // milwaukee, 4933471077
        let response

        try{
            response = await getAllData(brand, article)

            return res.json(response) // return array 

        }catch(e) {
            return res.json({error:e})
        }
    }


    async testXLSX(req, res) {
        // let { brand } = req.query

        let brand = "MILWAUKEE".toLowerCase()

        // console.log(req.headers.host);
        
        let workbook = XLSX.readFile('newMILWAUKEE.xlsx')

        var first_sheet_name = workbook.SheetNames[0];

        var address_of_article = 'J11';
        var address_of_name = 'K11';
        var address_of_category = 'P11';

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        /* Find desired cell */
        var desired_article = worksheet[address_of_article];
        var desired_name = worksheet[address_of_name];
        var desired_category = worksheet[address_of_category];

        /* Get the value */
        var article = (desired_article ? desired_article.v : undefined);
        var name = (desired_name ? desired_name.v : undefined);
        var category = (desired_category ? desired_category.v : undefined);


        let response = await getAllData(brand, article)

        if (response.error) return res.json(response)
        
        return res.json({article,name,category,...response})
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