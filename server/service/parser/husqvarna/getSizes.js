//

function getSizes(string) {

    let lengthString, searchString, lengthSearchString, number

    lengthString = string.length
    searchString = `>Габариты и вес`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getSizes)`
    string = string.substring(number, lengthString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getSizes)`

    lengthString = string.length
    searchString = `<tbody>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getSizes)`

    string = string.substring(number, lengthString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getSizes)`
    
    searchString = `</tbody>`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getSizes)`

    string = string.substring(0, number + lengthSearchString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getSizes)`

    return string.replace(/\r|\n|\t/g,"")

}

module.exports = getSizes