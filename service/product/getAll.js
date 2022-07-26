
const { Product, Category } = require("../../models/models")
const mixPromo = require("./mixPromo")
const sortProducts = require("./sortProducts")
const sortProductsWithOutImage = require("./sortProductsWithOutImage")


async function getAll({ brandId, categoryId, limit, page, sort, mix_no_img }) {
    
    page = Number(page) || 1
    limit = Number(limit) || 12
    brandId = brandId && Number(brandId)
    categoryId = categoryId && Number(categoryId)

    let products
    
    let offset = page * limit - limit

    if (limit === -1) {
        products = await Product.findAll()
    }else {
        if (!brandId && !categoryId) {
            // products = await Product.findAndCountAll({limit, offset})
            products = await Product.findAndCountAll()

            if (sort) sortProducts(products.rows)
            if (mix_no_img) products.rows = sortProductsWithOutImage(products.rows)
            if (page === 1) mixPromo(products.rows)
            let array = []
            for (let idx = offset; idx < offset + limit; idx++) {
                array.push(products.rows[idx])
            }
            products.rows = array
        }
        if (brandId && !categoryId) {
            // products = await Product.findAndCountAll({where:{brandId}, limit, offset})
            products = await Product.findAndCountAll({where:{brandId}})

            if (sort) sortProducts(products.rows)
            if (mix_no_img) products.rows = sortProductsWithOutImage(products.rows)
            let array = []
            for (let idx = offset; idx < offset + limit; idx++) {
                array.push(products.rows[idx])
            }
            products.rows = array
        }
        if (!brandId && categoryId) {
            // products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
            products = await Product.findAndCountAll()
            if (sort) sortProducts(products.rows)
            if (mix_no_img) products.rows = sortProductsWithOutImage(products.rows)

            let categories = await Category.findAll()
            
            const filterSubCategory = (id) => { // функция фильтрует из store все категории, которые не подходят для подкатегории id
                return categories.filter(i => i.sub_category_id === id) // и возвращает новый массив категорий
            }
            const filterIsProduct = (array) => { // функция
                let arr = array.filter(i => i.is_product)
                return arr.map(i => i.id)
            }
            const reArray = (array) => { // рекурсивная функция принимает массив и возвращает увеличеный массив категорий
                let newArray = array
                array.forEach(i => {
                    let arr = filterSubCategory(i.id) // функция фильтрует из store все категории
                    newArray = [...newArray, ...arr] // наращивается массив
                    newArray = [...newArray, ...reArray(arr)] // функция вызывает саму себя и наращивает массив
                })
                return newArray
            }
            
            let selectedCategory

            let returnSelectedCategory
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id == categoryId) {
                    returnSelectedCategory = categories[i]
                    break
                }
            }

            if (returnSelectedCategory) {
            
                if (returnSelectedCategory.is_product) { // если выбранная категория содержит товар 
                    selectedCategory = returnSelectedCategory.id
                }else {
                    let array = filterSubCategory(returnSelectedCategory.id) // удаляем все категории, которые не подходят для подкатегории id
                    selectedCategory = filterIsProduct( // удаляем категории в которых нет товаров - !is_product
                        reArray(array) // наращиваем массив рекурсивной функцией
                    )
                }
                let returnArrayProducts =[]
                if (Array.isArray(selectedCategory)) {
                    returnArrayProducts = products.rows.filter(i => {
                        let yes = false
                        selectedCategory.forEach(k => {
                            if (i.categoryId === k) yes = true
                        })
                        if (yes) return true
                        return false
                    })
                }else {
                    returnArrayProducts = products.rows.filter(i => i.categoryId === selectedCategory)
                }

                // отключил добавление акционных товаров в первые ряды, так как
                // категория может содержать только лишь акционные товары, 
                // в связи с этим возникает ошибка
                // if (page === 1) mixPromo(returnArrayProducts)

                let array = []

                for (let idx = offset; idx < offset + limit; idx++) {
                    if (returnArrayProducts[idx]) array.push(returnArrayProducts[idx])
                }
                
                products.rows = array
                products.count = returnArrayProducts.length

            }else {
                products = {count: 0, rows: []}
            }

        }
        if (brandId && categoryId) {
            // тут надо проработать механизм...
            products = await Product.findAndCountAll({where:{brandId, categoryId}, limit, offset})
        }
    }

    return products
}

module.exports = getAll