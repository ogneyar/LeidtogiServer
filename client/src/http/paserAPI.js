import axios from 'axios'


export const fetchParser = async () => {
    let response, Html, lengthHtml, serchString, lengthSerchString, number

    await axios.get('https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077')
        .then(res => Html = res.data)

    lengthHtml = Html.length
    serchString = `<div class="image">`
    lengthSerchString = serchString.length
    number = Html.indexOf(serchString)
    Html = Html.substring(number, lengthHtml)

    lengthHtml = Html.length
    serchString = `href="`
    lengthSerchString = serchString.length
    number = Html.indexOf(serchString)
    Html = Html.substring(number + lengthSerchString, lengthHtml)

    serchString = `"`
    number = Html.indexOf(serchString)
    Html = Html.substring(0, number)

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

    // response = JSON.parse(Html)
    response = Html

    return response
}
