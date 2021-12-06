require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const router = require('./router/index')

const sequelize = require('./db/config')
const models = require('./db/models')
const DevMiddleware = require('./middleWares/dev')

app.use(cors())
app.use(express.json())
app.use('/api', DevMiddleware, router)

const server = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(process.env.PORT, () => console.log(`Server has been starter on ${process.env.PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}

server()