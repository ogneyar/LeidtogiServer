const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    url: {type: DataTypes.STRING, defaultValue: null},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    img: {type: DataTypes.STRING(1024), allowNull: false},
    have: {type: DataTypes.INTEGER, defaultValue: 0},
    article: {type: DataTypes.STRING, defaultValue: null},
    promo: {type: DataTypes.STRING, defaultValue: null},
    country: {type: DataTypes.STRING, defaultValue: null}
})

module.exports = Product