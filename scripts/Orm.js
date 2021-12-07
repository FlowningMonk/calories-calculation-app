const sequelize = require('../db/config')
const models = require('../db/models')

module.exports = async () => {
    try {
        console.log('---- START ORM ----')

        await sequelize.authenticate()
        await sequelize.sync().then(() => {
            console.log('---- END ORM ----')
        })
    } catch (e) {
        console.log('Error:', e)
    }
}