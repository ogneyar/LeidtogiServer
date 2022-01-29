
function getCharcteristics(string) {

    let lengthString, serchString, lengthSerchString, number
    
    lengthString = string.length
    serchString = `<ul class="prps_all">`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`'Не найден '${serchString}'`,string}
    string = string.substring(number + lengthSerchString, lengthString)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    lengthString = string.length
    serchString = `</ul>`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найден '${serchString}'`,string}
    
    string = string.substring(0, number)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    string = string
        .replace(/(<div class=\"clb\"><\/div>)/g,"")
        .replace(/(<li>)/g,"<tr>")
        .replace(/(<\/li>)/g,"</tr>")
        .replace(/(<strong>)/g,"<td>")
        .replace(/(<\/strong>)/g,"</td>")
        .replace(/(<span>)/g,"<td>")
        .replace(/(<\/span>)/g,"</td>")

    return "<tbody>" + string + "</tbody>"
}
    
module.exports = getCharcteristics