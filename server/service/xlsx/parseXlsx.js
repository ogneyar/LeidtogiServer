
const XLSX = require('xlsx')
const fs = require('fs')


async function parseXlsx(file, arraySearch) {

    let workbook, worksheet, response = []
    
    if (fs.existsSync(file)) {
        workbook = XLSX.readFile(file)
    }else {
        return { error: `Файл ${file} отсутствует или пуст!` }
    }

    let first_sheet_name = workbook.SheetNames[0] // наименование первой вкладки
    worksheet = workbook.Sheets[first_sheet_name] // рабочая вкладка

    let start, symbol = []
    
    let array = [
        "A",   "B",  "C",  "D",  "E",  "F",  "G",  "H",  "I",  "J",  "K",  "L",  "M",  "N",  "O",  "P",  "Q",  "R",  "S",  "T",  "U",  "V",  "W",  "X",  "Y",  "Z",
        "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
        "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ"
    ]
    for (let number = 1; number <= 20; number++) {

        if (symbol.length > 0 && symbol.length === arraySearch.length) break

        for (let i = 0; i < array.length; i++) {

            let address = array[i] + number // A1, B1, .., K1, A2, B2, ... 
            let desired = worksheet[address] // искомое
            let value = (desired ? desired.v : undefined)

            // поиск названий столбцов
            if (value && typeof(value) === "string") {

                for (let numberObject = 0; numberObject < arraySearch.length; numberObject++) {
                    // if (value.includes(arraySearch[numberObject])) {
                    if (value.trim() === arraySearch[numberObject]) {
                        if (!start) start = number + 1

                        symbol[numberObject] = array[i] 
                    }
                } 

            }

        }
    }
    let yes = true
    let i = 1
    while(yes) {
        let object = {}
        let end = 0
        for (let numberObject = 0; numberObject < arraySearch.length; numberObject++) {
            let text = worksheet[ symbol[numberObject] + ( start + Number(i) - 1 ) ]
            if (text) object[arraySearch[numberObject]] = text.v.toString().trim()
            else object[arraySearch[numberObject]] = ""
            if (object[arraySearch[numberObject]] === "") end++
            if (end === arraySearch.length) yes = false 
        }

        if (yes) response.push(object)
        i++
    }

    return response

}

module.exports = parseXlsx