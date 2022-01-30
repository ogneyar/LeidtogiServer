//>Фильтры</strong>

function getFilters(string) {

    let lengthString, searchString, lengthSearchString, number
    
    lengthString = string.length
    searchString = `>Фильтры</strong>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getFilter)`
    string = string.substring(number, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getFilter)`

    lengthString = string.length
    searchString = `<tbody>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getFilter)`
    string = string.substring(number, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getFilter)`
    
    lengthString = string.length
    searchString = `</tbody>`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getFilter)`
    
    string = string.substring(0, number + lengthSearchString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getFilter)`
    
    
    return string.replace(/\r|\n|\t/g,"")

}
    
module.exports = getFilters