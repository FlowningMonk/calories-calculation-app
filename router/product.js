const express = require('express')
const router = express()

const ProductController = require('../controller/product')

const MainMiddleware = require('./../middleWares/index')

router.post('/', MainMiddleware, ProductController.create)

module.exports = router