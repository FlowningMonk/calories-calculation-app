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

    async update(req, res, next) {

    }

    async delete(req, res, next) {

    }

    async getOne(req, res, next) {

    }

    async getAll(req, res, next) {

    }
}

module.exports = new ProductController()