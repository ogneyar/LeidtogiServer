const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const CategoryProduct = sequelize.define('category_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = CategoryProduct