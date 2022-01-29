function getLink(string) {

    let lengthString, serchString, lengthSerchString, number

    lengthString = string.length
    serchString = `<div class="over_item">`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`'Не найден '${serchString}'`,string}
    string = string.substring(number, lengthString)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    lengthString = string.length
    serchString = `<a href="`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найден '${serchString}'`,string}
    
    string = string.substring(number + lengthSerchString, lengthString)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}

    serchString = `"`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найден '${serchString}'`,string}
    
    string = string.substring(0, number)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}


    return "http://shop.plus-kpd.ru" + string.replace(/\r|\n|\t/g,"")
}

module.exports = getLink