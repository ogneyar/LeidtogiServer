{
    "offer id",
    "available",
    "offer name",
    "offer full_name",
    "offer type",
    "offer vendor",
    "offer url",
    "offer price",
    "offer picture",
    "offer param",
    "offer description",
    "offer instructions",
    "offer certificates",
    "offer category"
}

function getProducts(string) {

    let lengthString, serchString, number, number2, lengthSerchString, arrayKey
    let products = []
    let object = {}

    lengthString = string.length

    serchString = `"offer id"`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`'Не найден '${serchString}'`,string}
    string = string.substring(number, lengthString)

    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    lengthString = string.length
        
    serchString = `\n`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найден '${serchString}'`,string}
    
    arrayKey = string.substring(0, number).replace(/\"/g, "").replace(/(\r)/g, "").split(";")
    
    string = string.substring(number + lengthSerchString, lengthString)
    
    if (!string) return {error:`Не сработал substring после найденого '${serchString}'`}
    
    let i = 0 // номер в массиве ключей
    let value, endValue
    while(string){
        lengthString = string.length

        if (string[0] === "\"") { // если есть кавычки
            serchString = `";` // ищем закрывающие кавычки
            number = string.indexOf(serchString)
            if (number === -1) return {error:`Не найден '${serchString}'`,string}
            value = string.substring(1, number)

            object[arrayKey[i]] = value

            string = string.substring(number + 2, lengthString)

            if (i + 1 < arrayKey.length) i++
            else {
                i = 0
                products.push(object)
                object = {}
            }
            continue
        }

        if (string[0] === ";") { // если нет контента, сразу следующий разделитель (;) в строке

            object[arrayKey[i]] = null

            string = string.substring(1, lengthString)

            if (i + 1 < arrayKey.length) i++
            else {
                i = 0
                products.push(object)
                object = {}
            }
            continue
        }

        serchString = `;` // ищем разделитель
        number = string.indexOf(serchString)
        if (number === -1) { // если конец файла
            serchString = `\r\n`
            number = string.indexOf(serchString)
            if (number === -1) return {error:`Не найден конец файла!`}

            value = string.substring(0, number) // удаляем перенос строки
            string = null

            object[arrayKey[i]] = value

            if (i + 1 < arrayKey.length) return {error:`Ошибка, после сохранения последнего элемента в Map, i+1 оказалось меньше длины массива ключей!!!`}
            else {
                i = 0
                products.push(object)
                object = {}
            }
            continue
        }

        value = string.substring(0, number)

        serchString = `\r\n` 
        number2 = value.indexOf(serchString)
        if (number2 !== -1) { // если в найденом значении есть перенос строки
            endValue = value.split("\r\n")

            if (endValue.length > 2) return {error:`Ошибка в строке '${value}', после split("\r\n") длина массива оказалась больше двух!`}

            object[arrayKey[i]] = endValue[0]
            
            if (i + 1 < arrayKey.length) return {error:`Ошибка, после сохранения последнего элемента в Map, i+1 оказалось меньше длины массива ключей.`}
            else {
                i = 0
                products.push(object)
                object = {}
            }

            object[arrayKey[i]] = endValue[1]

            string = string.substring(number + 1, lengthString)

            if (i + 1 < arrayKey.length) i++
            else return {error:`Ошибка, после сохранения первого элемента в Map, i+1 оказалось равным длине массива ключей!`}

            continue
        }

        object[arrayKey[i]] = value

        string = string.substring(number + 1, lengthString)

        if (i + 1 < arrayKey.length) i++
        else {
            i = 0
            products.push(object)
            object = {}
        }
    }
    
    return { message: products }
}
    
module.exports = getProducts