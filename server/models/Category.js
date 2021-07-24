const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    is_product: {type: DataTypes.TINYINT, defaultValue: 0},
    sub_category_id: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = Category