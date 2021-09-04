function getDescription(string) {

    let saveString, lengthString, serchString, lengthSerchString, number, numberStart, numberEnd

    lengthString = string.length
    serchString = `<div itemprop="description">`
    number = string.indexOf(serchString)
    if (number === -1) return {error:'Не найден `<div itemprop="description">`',string}
    string = string.substring(number, lengthString)
    
    if (!string) return {error:'Не сработал substring после найденого `<div itemprop="description">`'}
    
    serchString = `</div>`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:"Не найден `</div>`",string}
    
    string = string.substring(0, number)
    
    if (!string) return {error:'Не сработал substring после найденого `</div>`'}

    saveString = string

    lengthString = string.length
    serchString = `<ul>`
    number = string.indexOf(serchString)
    if (number === -1) return {error:"Не найден `<ul>`",string}
    string = string.substring(number, lengthString)
    
    if (!string) return {error:'Не сработал substring после найденого `<ul>`'}

    serchString = `</ul>`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:"Не найден `</ul>`",string}
    string = string.substring(0, number + lengthSerchString)

    if (!string) return {error:"Не сработал substring после найденого `</ul>`"}

    lengthString = saveString.length
    serchString = `<strong>`
    numberStart = saveString.indexOf(serchString)
    if (numberStart !== -1) {
        serchString = `</strong>`
        lengthSerchString = serchString.length
        numberEnd = saveString.indexOf(serchString)
        if (numberEnd !== -1) {
            saveString = saveString.substring(numberStart, numberEnd + lengthSerchString)
            string = string + saveString
        }
    }

    return {message:string}
}

module.exports = getDescription