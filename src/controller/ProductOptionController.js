const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const ProductOption = require('../models/ProductOption');

const ProductOptionController = {

    create(request, response) {
        ProductOption.create(request.body);
        response.json({
            message: "Opção adicionada!"
        });
    },

    async list(request, response) {
        const product_options = await ProductOption.findAll();
        response.json(product_options);
    }
}
module.exports = ProductOptionController;