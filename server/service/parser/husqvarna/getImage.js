function getImage(string) {

let saveString, lengthString, serchString, lengthSerchString, number, numberStart, numberEnd

lengthString = string.length
serchString = `<div class="image_slider">`
number = string.indexOf(serchString)
if (number === -1) return {error:`'Не найден '${serchString}'`,string}
string = string.substring(number, lengthString)

if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}

lengthString = string.length
serchString = `href="`
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


return {message:string.replace(/\r|\n|\t/g,"")}
}

module.exports = getImage