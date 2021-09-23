const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = require('./User')
const Cart = require('./Cart')
const CartProduct = require('./CartProduct')
const Product = require('./Product')
const Category = require('./Category')
const Brand = require('./Brand')
const Rating = require('./Rating')
const ProductInfo = require('./ProductInfo')
const CategoryBrand = require('./CategoryBrand')
const ProductSize = require('./ProductSize')
const Token = require('./Token')
const Delivery = require('./Delivery')


User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(ProductSize, {as: 'size'})
ProductSize.belongsTo(Product)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Delivery)
Delivery.belongsTo(User)


module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    Category,
    Brand,
    Rating,
    ProductInfo,
    CategoryBrand,
    ProductSize,
    Token,
    Delivery
}
