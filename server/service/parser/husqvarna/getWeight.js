
// получение данных о весе товара после функции getCharacteristics()

function getWeight(string) {

    let lengthString, searchString, lengthSearchString, number
    
    lengthString = string.length
    searchString = `Вес`    
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getWeight)`
    string = string.substring(number, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getWeight)`
    
    lengthString = string.length
    searchString = `<td>`
    lengthSearchString = searchString.length
    number = string.indexOf(serchString)
    if (number === -1) throw `Не найден '${searchString}'! (getWeight)`
    
    string = string.substring(number + lengthSearchString, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getWeight)`
    
    lengthString = string.length
    searchString = `</td>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getWeight)`
    
    string = string.substring(0, number)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getWeight)`
 
    return string
}
    
module.exports = getWeight