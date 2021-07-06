const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = require('./User')
const Cart = require('./Cart')
const CartProduct = require('./CartProduct')
const Product = require('./Product')
const Type = require('./Type')
const Brand = require('./Brand')
const Rating = require('./Rating')
const ProductInfo = require('./ProductInfo')
const TypeBrand = require('./TypeBrand')

const Category = require('./Category')
const CategoryProduct = require('./CategoryProduct')

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

Category.hasMany(CategoryProduct)
CategoryProduct.belongsTo(Category)

Product.hasOne(CategoryProduct)
CategoryProduct.belongsToMany(Product)


module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ProductInfo,
    Category,
    CategoryProduct
}
