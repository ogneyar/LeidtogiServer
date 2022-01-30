//class="text-uppercase">Характеристики

function getCharcteristics(string, startSearch = undefined, secondSearch = undefined, finishSearch = undefined) {

    let lengthString, searchString, lengthSearchString, number
    
    if (startSearch) {
        lengthString = string.length
        searchString = startSearch
        number = string.indexOf(searchString)
        if (number === -1) throw `Не найден '${searchString}'! (getCharcteristics)`
        string = string.substring(number, lengthString)
        
        if (!string) throw `Не сработал substring после найденого '${searchString}'! (getCharcteristics)`
    }

    lengthString = string.length
    searchString = secondSearch || `<ul class="prps_all">`
    lengthSearchString = searchString.length
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getCharcteristics)`
    string = string.substring(number + lengthSearchString, lengthString)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getCharcteristics)`
    
    lengthString = string.length
    searchString = finishSearch || `</ul>`
    number = string.indexOf(searchString)
    if (number === -1) throw `Не найден '${searchString}'! (getCharcteristics)`
    
    string = string.substring(0, number)
    
    if (!string) throw `Не сработал substring после найденого '${searchString}'! (getCharcteristics)`
    
    if ( ! startSearch ) {
        string = string
            .replace(/(<div class=\"clb\"><\/div>)/g,"")
            .replace(/(<li>)/g,"<tr>")
            .replace(/(<\/li>)/g,"</tr>")
            .replace(/(<strong>)/g,"<td>")
            .replace(/(<\/strong>)/g,"</td>")
            .replace(/(<span>)/g,"<td>")
            .replace(/(<\/span>)/g,"</td>")
    }

    return "<tbody>" + string.replace(/\r|\n|\t/g,"") + "</tbody>"
}
    
module.exports = getCharcteristics