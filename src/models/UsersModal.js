const connection = require('../database/connection');
const {DataTypes} = require('sequelize');

let UsersModel = connection.define("Users",{

    firstname:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    surname:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,

    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false

    }
})

module.exports = UsersModel