const nodemailer = require('nodemailer')
const { Code } = require('../db/models')

let transporter = nodemailer.createTransport({
    service: "Mail.ru",
    auth: {
        user: process.env.M_USER,
        pass: process.env.M_PASS
    }
})

const generator = function (count) {
    let str = ''

    for (i = 0; i < count; i++) {
        str += String(Math.floor(Math.random() * (9 - 0 + 1) + 0))
    }

    return str
}

class MailSendler {
    async confirm(email, userId) {
        let code = generator(6)

        try {
            await Code.create({ name: code, UserId: userId }).then(() => {
                transporter.sendMail({
                    from: process.env.M_USER,
                    to: email,
                    subject: 'Подтвердите свой аккаунт',
                    html: `Подтвердите свой аккаунт с помощью специального кода. Код действует в течении часа. <br /> Ваш код: ${code}`
                }).then(data => {
                    console.log(data)
                    return { status: true, message: 'good' }
                })
            })
        } catch (e) {
            console.log('Error:', e)
        }
    }
}

module.exports = new MailSendler()