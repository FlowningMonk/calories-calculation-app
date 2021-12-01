const ApiError = require('./../error/error')

const { User, Code, Tokens } = require('./../db/models');
const PasswordMiddleware = require('./password');

const MailSendler = require('./mail');
const TokenGenerator = require('./token')

const bcrypt = require('bcrypt');

class UserService {
    async check(obj) {
        let check;

        if (!obj.name) {
            return ApiError.badRequest('Не указано имя')
        }
        if (!obj.email) {
            return ApiError.badRequest('Не указана почта')
        }
        if (!obj.password) {
            return ApiError.badRequest('Не указан пароль')
        }

        check = await User.findOne({ where: { email: obj.email } })
        if (check) {
            return ApiError.badRequest('Данная почта занята')
        }

        check = PasswordMiddleware(obj.password)
        if (check.status === false) {
            return ApiError.badRequest(`Пароль не прошёл проверку: ${check.message}`)
        }

        let hashPassword = bcrypt.hashSync(obj.password, 5)

        await User.create({
            name: obj.name,
            email: obj.email,
            password: hashPassword
        }).then(async data => {
            return await MailSendler.confirm(obj.email, data.id)
        })
    }

    async confirm(obj) {
        let user = await User.findOne({ where: { email: obj.email } })
        if (!user) {
            return { status: false, message: 'Неверная почта' }
        }

        await Code.findOne({
            where:
            {
                name: obj.name,
                UserId: user.id
            }
        }).then(async data => {
            if (!data) {
                return { status: false, message: 'Неверный код' }
            }
            await User.update({ confirm: true, }, { where: { id: data.UserId } })
            await Code.destroy({ where: { id: data.id } })
            return { status: true, message: "good" }
        })
    }


    async login(obj) {
        if (!obj.email) {
            return { status: false, message: "Не указана почта" }
        }
        if (!obj.password) {
            return { status: false, message: "Не указан пароль" }
        }

        let check = await User.findOne({ where: { email: obj.email } })
        if (!check) {
            return { status: false, message: "Неверная почта" }
        }

        let syncPass = bcrypt.compareSync(obj.password, check.password)
        if (!syncPass) {
            return { status: false, message: "Неверный пароль" }
        }

        let token = TokenGenerator.generate(check)

        await Tokens.create({ token: token, UserId: check.id })

        return { status: true, message: 'good', token }
    }

}

module.exports = new UserService()