const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Certificate = sequelize.define('certificate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, allowNull: false},
    action: {type: DataTypes.STRING, allowNull: false, defaultValue: "issued"}, // issued, assigned, applied
    order_id: {type: DataTypes.STRING, defaultValue: null}
})

module.exports = Certificate