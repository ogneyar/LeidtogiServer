
const path = require('path')
const fs = require('fs')


// Поиск всех Каталогов в папке static/catalogs
const getAllCatalogs = () => {

    let response = []

    let files = fs.readdirSync(path.resolve(__dirname, '..', '..', 'static', 'catalogs'))

    if (files) {             
        files.forEach(item => {
            response.push(item)
        })
    }

    return response
}

module.exports = getAllCatalogs