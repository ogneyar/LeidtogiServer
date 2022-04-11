

const axios = require("axios")
const parseHtml = require("../../../html/parseHtml")


async function getSizesGedoreCom(article) {
    
    let Html
    let response
    let size = []

    await axios.get('http://www.gedore.com.ru/search/', { params: {

        q: article

    } }).then(res => Html = res.data)
        
    if (!Html) throw 'Не сработал axios.get(http://www.gedore.com.ru)'
    
    response = parseHtml(Html, {
        entry: `<form action="" method="get">`,
        start: `href="`,
        end: `"`,
        return: true
    })
    
    if (response.search.includes("catalog")) { // если url содержит "catalog"
        response = parseHtml(response.rest, { // то ищем далее
            start: `href="`,
            end: `"`
        })
    }else {
        response = response.search
    }
    
    await axios.get("http://www.gedore.com.ru" + response).then(res => Html = res.data)

    response = parseHtml(Html, {
        entry: `<div class="catalog-element">`,
        start: `<table`,
        end: `</table>`,
        return: true
    })

    response = parseHtml(response.rest, {
        start: `<table`,
        end: `</table>`
    })

    for(let i = 0; i < 6; i++) {
        response = parseHtml(response, {
            start: `<tr>`,
            end: `</tr>`,
            return: true
        })
        if (i > 1) {
            size.push(parseHtml(response.search, {
                start: `<b>`,
                end: ` `
            }))
        }
        response = response.rest
    }
    
    return { 
        weight: size[0],
        length: size[1],
        width: size[2],
        height: size[3],
        volume: (size[1] * size[2] * size[3] / 1e9).toFixed(4) // 1e9 = 10 ** 9 = 1 000 000 000 
    }
}

module.exports = getSizesGedoreCom