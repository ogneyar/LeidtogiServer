// поиск наименования товара после функции getLink()

function getName(string, startSearch = undefined, secondSearch = undefined) {

    let lengthString, searchString, lengthSearchString, number

    lengthString = string.length
    searchString = startSearch || `<h1 itemprop="name">`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getName)`
    string = string.substring(number+ lengthSearchString, lengthString)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getName)`

    lengthString = string.length
    searchString = secondSearch || `</h1>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getName)`

    string = string.substring(0, number)

    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getName)`

    return string

}

module.exports = getName