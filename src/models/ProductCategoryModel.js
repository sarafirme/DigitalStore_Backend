const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const UserModel = require('./UserModel');

const ProductModel = connection.define("Product", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategoryModel,
                key: 'id'
            },
            onDelete: 'CASCADE'
       
}});



module.exports = ProductModel;