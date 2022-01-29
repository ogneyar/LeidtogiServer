
function getDescription(string) {

    let lengthString, serchString, lengthSerchString, number
    
    lengthString = string.length
    serchString = `<p class="prew_text">`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`'Не найден '${serchString}'`,string}
    string = string.substring(number + lengthSerchString, lengthString)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    lengthString = string.length
    serchString = `</p>`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найден '${serchString}'`,string}
    
    string = string.substring(0, number)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    
    return "<p>" + string.replace(/(<br>)/g,"") + "</p>"
}
    
module.exports = getDescription