const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const ProductModel = require('./ProductModel')


const ProductOption = connection.define("ProductOption", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true,
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text'
    },
    values: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
   
    timestamps: false, 
    tableName: 'product_options',
      onDelete: 'CASCADE'
});

module.exports = ProductOption;