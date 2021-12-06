const { DevToken } = require("../../db/models");

module.exports = async function () {
    var generation = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
        generation += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    let check = await DevToken.findOne({ where: { token: generation } })
    if (!check) {
        return { status: false, message: "Данный токен уже существует" }
    }

    await DevToken.create({ token: generation }).then(data => {
        return {
            status: true,
            message: {
                devToken: generation
            }
        }
    })
}