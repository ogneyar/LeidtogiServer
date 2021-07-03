const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const CartDevice = sequelize.define('cart_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = CartDevice