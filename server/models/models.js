const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = require('./User')
const Cart = require('./Cart')
const CartDevice = require('./CartDevice')
const Device = require('./Device')
const Type = require('./Type')
const Brand = require('./Brand')
const Rating = require('./Rating')
const DeviceInfo = require('./DeviceInfo')
const TypeBrand = require('./TypeBrand')


User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartDevice)
CartDevice.belongsTo(Cart)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(CartDevice)
CartDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Cart,
    CartDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}
