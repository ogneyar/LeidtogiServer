
const fs = require('fs')
const path = require('path')

//
const deletePresentation = (name) => {

    let response = true
    
    let fullPath = path.resolve(__dirname, '..', '..', 'static', 'presentation', name)
    if ( fs.existsSync(fullPath) ) {
        // тогда удаляем
        try {
            fs.unlinkSync(fullPath)
        }catch(e) {
            console.log(`Не смог удалалить ${name}. ${e}`)
            response = false
        }
    }

    return response
}

module.exports = deletePresentation
