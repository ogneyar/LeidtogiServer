
const path = require('path')
const fs = require('fs')

const { Product, Brand, Category } = require("../../models/models")


module.exports = async () => {

    let products = await Product.findAll()
    const brands = await Brand.findAll()
    const categories = await Category.findAll()
            
    products = products.filter(i => {
        let img                    
        try {
            img = JSON.parse(i.img)
        }catch(e) {}
        if (img && Array.isArray(img) && img[0].big !== undefined) { 
            if ( ! i.request && i.price > 0 ) return true 
        }
        // если нет изображений
        // если "цена по запросу" или нет цены
        // тогда убираем из списка
        return false                
    })

    let date = new Date().toISOString()
    let formatDate = date.substring(0, date.indexOf("."))
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://leidtogi.ru/prochee</loc>
        <lastmod>${formatDate}</lastmod>
    </url>
</urlset>`

    fs.writeFileSync(path.resolve(__dirname, '..', '..', 'static', 'sitemaps', 'categories.xml'), xml)


}