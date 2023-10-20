
const fs = require('fs')
const path = require('path')

//
const addedCatalog = async (feed) => {

    let response = true
    
    let fullPath = path.resolve(__dirname, '..', '..', 'static', 'catalogs', feed.name)
    if ( fs.existsSync(fullPath) ) {
        // тогда удаляем
        try {
            fs.unlinkSync(fullPath)
        }catch(e) {
            console.log(`Не смог удалалить ${feed.name}. ${e}`)
            response = false
        }
    }
    await feed.mv(fullPath)

    return response
}

module.exports = addedCatalog
