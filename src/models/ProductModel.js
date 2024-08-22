const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const UsersModal = require('./UsersModal')

const ProductModel = connection.define("Product", {
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModal,
            key: 'id'
        },
        onDelete: 'CASCADE' 
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    descripition: DataTypes.TEXT,
    price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
    },
    price_with_discount: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
    },
});

module.exports = ProductModel;