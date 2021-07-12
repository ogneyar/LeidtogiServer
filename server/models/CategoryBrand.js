const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const CategoryBrand = sequelize.define('category_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = CategoryBrand