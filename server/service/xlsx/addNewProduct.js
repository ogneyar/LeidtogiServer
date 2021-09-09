const XLSX = require('xlsx')

const { Brand, Category } = require('../../models/models')

const getAllData = require('../parser/getAllData.js')
const createProduct = require('../product/createProduct.js')


async function addNewProduct(number) {
    
    let brandName = "MILWAUKEE".toLowerCase()
    
    let workbook = XLSX.readFile('newMILWAUKEE.xlsx')
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];

    let address_of_article = 'J'+number;
    let address_of_name = 'K'+number;
    let address_of_category = 'P'+number;

    let desired_article = worksheet[address_of_article];
    let desired_name = worksheet[address_of_name];
    let desired_category = worksheet[address_of_category];

    /* Get the value */
    let article = (desired_article ? desired_article.v : undefined);
    let name = (desired_name ? desired_name.v : undefined);
    let categoryUrl = (desired_category ? desired_category.v : undefined);

    let response = await getAllData(brandName, article)

    if (response.error) return res.json(response)

    let {images, sizes, price, description, characteristics, equipment} = response

    let have = 1
    let promo = ""
    let country = "Германия"

    const brand = await Brand.findOne({
        where: {name:brandName}
    })
    let brandId = brand.id

    const category = await Category.findOne({
        where: {url:categoryUrl}
    })
    let categoryId = category.id

    let files = JSON.stringify(images)

    let info = JSON.stringify([
        {
            "title":"description",
            "body":description
        },
        {
            "title":"characteristics",
            "body":characteristics
        },
        {
            "title":"equipment",
            "body":equipment
        }
    ])

    let size = JSON.stringify(sizes)

    const product = await createProduct(name, price, have, article, promo, country, brandId, categoryId, files, info, size)

    return product
}

module.exports = addNewProduct