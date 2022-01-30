
function getImage(string, startSearch = undefined, secondSearch = undefined) {

    let lengthString, searchString, lengthSearchString, number

    lengthString = string.length
    searchString = startSearch || `<div class="image_slider">`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getImage)`
    string = string.substring(number, lengthString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getImage)`

    lengthString = string.length
    searchString = secondSearch || `href="`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getImage)`

    string = string.substring(number + lengthSearchString, lengthString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getImage)`

    searchString = `"`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getImage)`

    string = string.substring(0, number)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getImage)`


    if ( ! startSearch ) return "http://shop.plus-kpd.ru" + string

    return string

}

module.exports = getImage