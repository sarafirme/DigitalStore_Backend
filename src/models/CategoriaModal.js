const connection = require("../database/connection");
const { DataTypes } = require("sequelize");

let CategoriaModal = connection.define(
  "Categorias",
  {
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
      defaultValue: false,
    },
  },
  {}
);

module.exports = CategoriaModal;
