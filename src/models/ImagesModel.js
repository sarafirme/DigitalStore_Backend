const connection = require('../database/connection');
const {DataTypes} = require('sequelize');
const ProductModel = require('./ProductModel');

let ImagesModel = connection.define("Images",{

    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: ProductModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    enabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    path:{
        type: DataTypes.STRING(255),
        allowNull: false,

    },

})

module.exports = ImagesModel