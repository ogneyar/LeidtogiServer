
const { Product } = require('../../models/models')


const find = async (action, text) => {
    
    let products = await Product.findAll()

    let response = []

    switch(action) {
        case "article":
            response = filterArticle()
            
            if (response[0] === undefined) {
                response = filterName()
            }
        break

        case "name":
            response = filterName()
            
            if (response[0] === undefined) {
                response = filterArticle()
            }
        break

        default:
        break
    }
    
    function filterArticle() {
        return products.filter(product => {
            if (product.article.indexOf(text) !== -1) return true
            return false
        })
    }

    function filterName () {
        return products.filter(product => {
            if (product.name.indexOf(text) !== -1) return true
            return false
        })
    }

    return response
}


module.exports = find