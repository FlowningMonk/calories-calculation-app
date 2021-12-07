const sequelize = require('../db/config')
const models = require('../db/models')

module.exports = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Error:', e)
    }
}