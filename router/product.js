const express = require('express')
const router = express()

const MainMiddleware = require('./../middleWares/index')

const auth = require('./product/auth')
const public = require('./product/public')

router.use('/auth', MainMiddleware, auth)
router.use('/public', public)

module.exports = router