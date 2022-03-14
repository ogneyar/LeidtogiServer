const parseHtml = require("../../html/parseHtml")

// 
function getUrlMinimaks(string) {
    
    if (!string) throw `Не найдена строка string`

    return parseHtml(string, {
        entry: `image-list-item-wrapper`,
        start: `href="`,
        end: `"`,
    })

}

module.exports = getUrlMinimaks