
const fs = require('fs')
const convert = require('xml-js')
const iconv = require('iconv-lite')


async function parseXml(file, encoding = 'utf8') {

    let xml, response, data = {}

    if (fs.existsSync(file)) {
        let options = {
            flag: 'r'
        }
        if (encoding == 'utf8') options = { ...options, encoding }

        xml = fs.readFileSync(file, options)

        if (encoding == 'win1251')
            xml = iconv.decode(Buffer.from(xml), encoding)
    }else {
        return { error: `Файл ${file} отсутствует или пуст!` }
    }

    xml = xml.replace(/\r|\n/g,"")
    
    
    let result = convert.xml2json(xml, {compact: true, spaces: 0})

    return JSON.parse(result)

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

