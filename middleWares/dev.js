const { DevToken, User } = require("../db/models");

module.exports = async function (req, res, next) {
    const devToken = req.headers.devtoken

    if (!devToken) {
        return res.status(403).json({ message: "Не указан DEV-токен" })
    }

    let check = await DevToken.findOne({ where: { token: devToken } })
    if (!check) {
        return res.status(403).json({ message: "Неверный токен" })
    }
    req.devToken = devToken

    next()
}