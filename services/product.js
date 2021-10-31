const { Product } = require("../db/models")

class ProductService {
    async create(obj) {
        if (!obj.name) {
            return { status: false, message: "Не указано название продукта" }
        }
        if (!obj.kilocalories) {
            return { status: false, message: "Не указана калорийность" }
        }
        if (!obj.proteins) {
            return { status: false, message: "Не указаны белки" }
        }
        if (!obj.fats) {
            return { status: false, message: "Не указаны жиры" }
        }
        if (!obj.сarbohydrates) {
            return { status: false, message: "Не указаны углеводы" }
        }

        const create = await Product.create(obj)

        return { status: true, message: 'good', create }
    }
}

module.exports = new ProductService()