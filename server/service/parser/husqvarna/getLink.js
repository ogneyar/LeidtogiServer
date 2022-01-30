
function getLink(string, startSearch = undefined) {

    let lengthString, searchString, lengthSearchString, number

    lengthString = string.length
    searchString = startSearch || `<div class="over_item">`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getLink)`
    string = string.substring(number, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getLink)`
    
    lengthString = string.length
    searchString = `<a href="`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getLink)`
    
    string = string.substring(number + lengthSearchString, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getLink)`

    searchString = `"`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getLink)`
    
    string = string.substring(0, number)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getLink)`


    if ( ! startSearch ) return "http://shop.plus-kpd.ru" + string

    return string
}

module.exports = getLink