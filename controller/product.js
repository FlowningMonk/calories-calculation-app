const ProductService = require('./../services/product')

class ProductController {
    async create(req, res, next) {
        let data = await ProductService.create(req.body)
        if (data.status === false) {
            return next(new Error(data.message))
        } else {
            return res.json(data)
        }
    }
}

module.exports = new ProductController()