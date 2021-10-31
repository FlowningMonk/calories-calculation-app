const express = require('express')
const router = express()
const controller = require('./../controller/user')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/refresh', controller.refresh)

router.post('/confirm', controller.confirm)

module.exports = router