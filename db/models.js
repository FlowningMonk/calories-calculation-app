const sequelize = require('./config')
const { DataTypes } = require('sequelize')

const User = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    confirm: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const Product = sequelize.define('Products', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    proteins: { type: DataTypes.FLOAT },
    fats: { type: DataTypes.FLOAT },
    сarbohydrates: { type: DataTypes.FLOAT },
    kilocalories: { type: DataTypes.FLOAT },
})

const Diet = sequelize.define('Diets', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE },
})

const Code = sequelize.define('Codes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING }
})

// ---- Connections ---- //

Product.hasOne(User)
User.belongsTo(Product)

Product.belongsToMany(User, { through: Diet })
User.belongsToMany(Product, { through: Diet })

User.hasOne(Code)
Code.belongsTo(User)

// ---- Connections ---- //

module.exports = {
    User,
    Product,
    Diet,
    Code
}