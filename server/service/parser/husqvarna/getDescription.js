//class="text-uppercase">Описание

function getDescription(string, startSearch = undefined, secondSearch = undefined, finishSearch = undefined) {

    let lengthString, searchString, lengthSearchString, number
    
    if (startSearch) {
        lengthString = string.length
        searchString = startSearch
        number = string.indexOf(searchString)
        if (number === -1) throw `Не найден '${searchString}'! (getDescription)`
        string = string.substring(number, lengthString)
        
        if (!string) throw `Не сработал substring после найденого '${searchString}'! (getDescription)`
    }

    lengthString = string.length
    searchString = secondSearch || `<p class="prew_text">`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getDescription)`
    string = string.substring(number + lengthSearchString, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getDescription)`
    
    lengthString = string.length
    searchString = finishSearch || `</p>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getDescription)`
    
    string = string.substring(0, number)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getDescription)`
    
    
    if ( ! startSearch ) return "<p>" + string.replace(/(<br>)/g,"") + "</p>"

    return "<ul>" + string.replace(/\r|\n|\t/g,"").replace(/(&nbsp;)/g," ") + "</ul>"

}
    
module.exports = getDescription