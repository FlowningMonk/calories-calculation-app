const sequelize = require('./config')
const { DataTypes } = require('sequelize')

const DevToken = sequelize.define('DevTokens', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING }
})

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

const Tokens = sequelize.define('Tokens', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING }
})

const Roles = sequelize.define('Roles', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true }
})

// ---- Connections ---- //

Product.hasOne(User)
User.belongsTo(Product)

Product.belongsToMany(User, { through: Diet })
User.belongsToMany(Product, { through: Diet })

User.hasOne(Code)
Code.belongsTo(User)

User.hasMany(Tokens)
Tokens.belongsTo(User)

Roles.hasMany(User)
User.belongsTo(Roles)

// ---- Connections ---- //

module.exports = {
    DevToken,

    User,
    Product,
    Diet,
    Code,
    Tokens,
    Roles
}