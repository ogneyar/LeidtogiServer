const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = Cart