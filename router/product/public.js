const express = require('express')
const router = express()

const product = require('../../controller/product')

router.get('/:id', product.getOne)
router.get('/', product.getAll)

module.exports = router