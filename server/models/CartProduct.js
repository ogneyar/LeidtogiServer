const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const CartProduct = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = CartProduct