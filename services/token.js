const jwt = require('jsonwebtoken')

const generateToken = (id, name, email) => {
    return jwt.sign(
        { id, name, email },
        process.env.SECRET_KEY,
        { expiresIn: '10h' }
    )
}

class TokenGenerator {
    generate(obj) {
        return generateToken(obj.id, obj.name, obj.email)
    }
}

module.exports = new TokenGenerator()