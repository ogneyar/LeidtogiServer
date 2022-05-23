
const { Category } = require('../../models/models')
const findCategoryByUrl = require('./findCategoryByUrl')


async function createCategory(name, url, is_product, sub_category_id) {
    
    const oldCategory = await findCategoryByUrl(url)
    if (oldCategory) {
        return oldCategory
        url += "_too"
    }

    console.log(" ");
    console.log("url",url);
    console.log(" ");

    const category = await Category.create({name, url, is_product, sub_category_id})

    
    return category
}


module.exports = createCategory