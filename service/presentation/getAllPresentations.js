
const path = require('path')
const fs = require('fs')


// Поиск всех Презентаций в папке static/presentation
const getAllPresentations = () => {

    let response = []

    let files = fs.readdirSync(path.resolve(__dirname, '..', '..', 'static', 'presentation'))

    if (files) {             
        files.forEach(item => {
            response.push(item)
        })
    }

    return response
}

module.exports = getAllPresentations