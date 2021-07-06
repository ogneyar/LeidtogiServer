const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    is_first: {type: DataTypes.TINYINT, defaultValue: 1},
    is_product: {type: DataTypes.TINYINT, defaultValue: 0},
    sub_category_id: {type: DataTypes.STRING, allowNull: false}
})

module.exports = Category