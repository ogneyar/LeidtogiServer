
const fs = require('fs')
const convert = require('xml-js')
const parseHtml = require('../html/parseHtml')


async function parseXml(file) {

    let xml, response, data = {}

    if (fs.existsSync(file)) {
        xml = fs.readFileSync(file, {encoding:'utf8', flag:'r'})
        // workbook = await fs.open(file, 'r')
    }else {
        return { error: `Файл ${file} отсутствует или пуст!` }
    }

    xml = xml.replace(/\r/g,"").replace(/\n/g,"")
    xml = xml.replace(/\r/g,"").replace(/\n/g,"")
    
    
    var result1 = convert.xml2json(xml, {compact: true, spaces: 0})
    // console.log(result1)

    return JSON.parse(result1)
    // return JSON.parse(result1).shop["Разделы"]["Раздел"][07]


    //----------------------------------------------------------------------
    // дальше только тесты
    //----------------------------------------------------------------------

    try {
        response = parseHtml(xml,{
            // entry: `<?xml`,
            start: `<?xml `,
            end: `?>`,
            inclusive: false,
            return: true
        })
    }catch(e) {
        throw "Не найден заголовок xml файла!"
    }

    let split = response.search.split(" ")
    let version, encoding
    try {
        version = parseHtml(split[0],{
            start: `version="`,
            end: `"`,
            inclusive: false
        })
    }catch(e) {
        console.log(e)
    }
    try {
        encoding = parseHtml(split[1],{
            start: `encoding="`,
            end: `"`,
            inclusive: false
        })
    }catch(e) {
        console.log(e)
    }
    
    data = reSearch(response.rest.replace(/"/g,"'"))

    return {version, encoding, data}

}

// рекурсивная функция
const reSearch = (string) => {
    
    // return string

    if (string) string = string.trim()
    if ( ! string || string === " " ) return ""

    let party, response, result = "", array = [], object = {}

    do {

        try {
            party = parseHtml(string,{
                start: `<`,
                end: `>`,
                inclusive: false
            })
            console.log("party: ",party)
        }catch(e) {
            console.log(e)
            // console.log("string: ",string)
            return string
        }
        
        try {
            response = parseHtml(string,{
                start: `<${party}>`,
                end: `</${party}>`,
                inclusive: false, 
                return: true
            })
        }catch(e) {
            console.log(e)
            response = {search:""}
        }

        // return party
        // return response.rest

        if (response && response.rest && response.rest !== "" && response.rest !== " ") { // значит массив

            // if (party === "shop" || party === "Разделы" || party === "offers") {
            //     string = response.rest
            //     result = "[" + result
            // } else string = ""

            string = response.rest
            result = "[" + result

        }else { // значит объект

            string = ""

        }

        response = reSearch(response.search)

        // if (party === "Разделы" || party === "offers") result += `{"${party}":"ghghgfh"}`
        // else result += `{"${party}":${response}}`

        try {
            result += `{"${party}":${JSON.parse(response)}}`
        }catch(e) {
            result += `{"${party}":"${response}"}`
        }
        // result += `{"${party}":"${response}"}`
        if (string) result += ","

        // response = response.rest

    }while(string && string !== "" && string !== " ")

    if (result[0]==="[") result += "]"

    return result
    // return JSON.parse(result)
    // return "{" +result +"}"
}

module.exports = parseXml



// Example
// <?xml version="1.0" encoding="utf-8"?>
// shop
    // Разделы
        // Раздел parentId="10307"
            // Название
            // Код
            // КодРодителя
            // ОписаниеРаздела

    // offers
        // ДетальнаяЗапись
            // ID
            // Наименование
            // Кодраздела
            // Названиераздела
            // DETAIL_PAGE_URL
            // Артикул
            // Основноеизображение
            // ПодробноеОписание
            // ДополнительноеОписаниеНоменклатуры
            // Производитель
            // ПроизводительКод
            // ТорговаяМарка
            // Цена
            // Валюта
            // Вес
            // Длина
            // Высота
            // Ширина
            // ЕдиницаИзмерения
            // Доступноеколичество
            // Склады
                // Склад
                    // Название
                    // Остаток
                    // ЕдиницаХраненияОстатков
            // Дополнительныеизображения
                // Изображение
                    // URL
            // Характеристики
                // Характеристика
                    // Название
                    // Значение

