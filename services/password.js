module.exports = function (password) {
    let first = /(?=.*[0-9])/ // --- строка содержит хотя бы одно число;
    let third = /(?=.*[a-z])/ // --- строка содержит хотя бы одну латинскую букву в нижнем регистре;
    let four = /(?=.*[A-Z])/ // --- строка содержит хотя бы одну латинскую букву в верхнем регистре;
    let five = /[0-9a-zA-Z!@#$%^&*]{6,}/ // --- строка состоит не менее, чем из 6 вышеупомянутых символов.

    if (!first.test(password)) {
        return { status: false, message: 'Пароль должен содержать хотя бы одно число' }
    }

    if (!third.test(password)) {
        return { status: false, message: 'Пароль должен содержать хотя бы одну латинскую букву в нижнем регистре' }
    }

    if (!four.test(password)) {
        return { status: false, message: 'Пароль должен содержать хотя бы одну латинскую букву в верхнем регистре' }
    }

    if (!five.test(password)) {
        return { status: false, message: 'Пароль должен состоять не менее чем из 6 символов' }
    }

    return { status: true, message: 'Good' }
}