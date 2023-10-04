
const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const Certificate = sequelize.define('certificate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, allowNull: false},
    state: {type: DataTypes.STRING, allowNull: false, defaultValue: "issued"}, // issued, assigned, applied
    name: {type: DataTypes.STRING, defaultValue: null},
    url: {type: DataTypes.STRING, defaultValue: null},
    order_id: {type: DataTypes.INTEGER, defaultValue: null},
    before: {type: DataTypes.DATEONLY, defaultValue: null} // "2023-10-04"
})

module.exports = Certificate
