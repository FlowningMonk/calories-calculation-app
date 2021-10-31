const jwt = require('jsonwebtoken')
const { Tokens } = require('../db/models')

module.exports = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }

        const check = await Tokens.findOne({ where: { token: token } })
        if (!check) {
            return res.status(401).json({ message: "Неверный токен" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.check = check
        req.user = decoded
        req.token = token
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
}