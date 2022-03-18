const axios = require('axios')

// const getUrlVseinstrumenti = require('./old/getUrlVseinstrumenti.js')
// const getArrayImages = require('./old/getArrayImages.js')
// const getSizes = require('./old/getSizes.js')
const getUrlMilwrussia = require('./getUrlMilwrussia.js')
const getUrlMinimaks = require('./getUrlMinimaks.js')
const getImages = require('./getImages.js')
const getSizesMinimaks = require('./getSizesMinimaks.js')
const getPrice = require('./getPrice.js')
const getUrlMlkShop = require('./getUrlMlkShop.js')
const getDescription = require('./getDescription.js')
const getCharacteristics = require('./getCharacteristics.js')
const getEquipment = require('./getEquipment.js')
const parseHtml = require('../../html/parseHtml.js')


async function getAllData(article, price) {

    let Html, images, sizes, description, characteristics, equipment
    let urlMlkShop, string

    // получение изображений с сайта rostov.vseinstrumenti.ru
    // await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', { params: { what: article } })
    //    .then(res => Html = res.data)
    // Html = "https://rostov.vseinstrumenti.ru" + getUrlVseinstrumenti(Html, article)
    // await axios.get(Html)
    //    .then(res => Html = res.data)
    // images = getArrayImages(article, Html)
    // if (!images[0]) return {error:'Нет фотографий товара',string:images}
    

    // получение габаритов с сайта www.minimaks.ru
    await axios.get('https://www.minimaks.ru/catalog', { params: { q: article } })
        .then(res => Html = res.data)
    try {
        Html = "https://www.minimaks.ru" + getUrlMinimaks(Html) 
        await axios.get(Html).then(res => Html = res.data)
        sizes = getSizesMinimaks(Html)
    }catch(e) {
        sizes = null
    }

    // https://mlk-shop.ru/search?search=4933451439
    await axios.get('https://mlk-shop.ru/search', {params: {
        search: article
    }}).then(res => Html = res.data)

    if (!Html) return {error:'Не сработал axios.get(https://mlk-shop.ru/search)',string:Html}

    if ( ! price ) {
        price = getPrice(Html,article)
        if (price.error) return price
        else price = price.message
    }

    string = getUrlMlkShop(Html)

    if (string.error !== undefined) return string
    else urlMlkShop = string.message

    // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
    await axios.get(urlMlkShop).then(res => string = res.data)

    if (!string) return {error:`Не сработал axios.get(${urlMlkShop})`}

    description = getDescription(string)
    // if (description.error) return description
    if (description.error) description = ""
    else description = description.message

    characteristics = getCharacteristics(string)
    // if (characteristics.error) return characteristics
    if (characteristics.error) characteristics = ""
    else {
        characteristics = characteristics.message
        if (sizes === null) {
            try {
                let weight = parseHtml(characteristics, {
                    entry: `Вес, кг`,
                    entryOr: `Общий вес, кг`,
                    start: `<td>`,
                    end: `</td>`
                })
                sizes = { weight, width: 0, length: 0, height: 0, volume: 0 }
            }catch(e) {
                throw `${e} (article: ${article})`
            }
        }
    }

    equipment = getEquipment(string)
    // if (equipment.error) return equipment
    if (equipment.error) equipment = ""
    else equipment = equipment.message

    
    // получение изображений с сайта milwrussia.ru
    await axios.get('https://milwrussia.ru/search', { params: { search: article } })
        .then(res => Html = res.data)
    Html = getUrlMilwrussia(Html, article)
    await axios.get(Html).then(res => Html = res.data)
    images = getImages(article, Html)


    return {images, sizes, price, description, characteristics, equipment}
}


module.exports = getAllData