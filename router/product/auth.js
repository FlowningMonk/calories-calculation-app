const express = require('express')
const router = express()

const product = require('../../controller/product')

router.post('/', product.create)
router.put('/', product.update)
router.delete('/', product.delete)

module.exports = router