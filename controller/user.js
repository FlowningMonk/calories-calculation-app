const UserService = require('./../services/user')

const TokenGenerator = require('./../services/token')
const { Tokens } = require('../db/models')

class UserController {
    async register(req, res, next) {
        try {
            let a = await UserService.check(req.body)
            if (!a.status) {
                return next(new Error(a.message))
            } else {
                console.log(a)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        let data = await UserService.login(req.body)
        if (data.status === false) {
            return next(res.json(data.message))
        } else {
            return res.json(data)
        }
    }

    async refresh(req, res, next) {
        let token = TokenGenerator.generate(req.user)
        await Tokens.update({ token: token }, { where: { id: req.check.id } }).then(() => {
            return res.json({ status: true, message: "good", token })
        })
    }

    async confirm(req, res, next) {
        try {
            let data = await UserService.confirm(req.body)
            if (data) {
                if (data.status === false) {
                    return next(new Error(data.message))
                }
                if (data.status === true) {
                    console.log('a')
                    return res.json(`Аккаунт подтверждён`)
                }
            }
            return res.json(`Аккаунт подтверждён`)

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()