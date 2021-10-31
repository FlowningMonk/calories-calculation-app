const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        port: process.env.DB_PORT,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
)