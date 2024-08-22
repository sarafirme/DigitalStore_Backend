// const { request, response } = require('express');
const verify = require("../middleware/verifyData");
const ProductModel = require("../models/ProductModel");
const UserModal = require("../models/UsersModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

UserModal.hasMany(ProductModel, { foreignKey: "users_id" });

const UserControler = {
  async create(request, response) {
    const { firstname, surname, email, password } = request.body;

    if (!verify([firstname, surname, email, password])) {
      return response.json({
        message: "Algum campo obrigatório não foi preenchido!",
      });
    } else {
      try {
        const emailReq = await UserModal.findOne({
            where: { email }
        });
    
        if (emailReq && emailReq.dataValues.id > 0){
            messageReturn = 'Esse email já está cadastrado!'
            return response.status(400).json({
                message: messageReturn
            })
        }
        let hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;
        UserModal.create(request.body);
        response.status(201);
        return response.json({
          message: "Usuário criado",
        });
      } catch (error) {
        return response.status(400).json({
          error: "Erro ao criar usuário",
        });
      }
    }
  },

  async login(request, response) {
    let email = request.body.email;
    let password = request.body.password;
    let messageCompare = "";

    if (!verify([email, password])) {
      messageCompare = "Email e password são obrigatórios";
    } else {
      let user = await UserModal.findOne({
        where: { email },
      });
      let userPassword = user ? user.password : "";
      let hasValid = await bcrypt.compare(password, userPassword);
      const expiresIn = "8h";
      const token = hasValid
        ? jwt.sign(
            {
              id: user.id,
              name: user.firstname,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn,
            }
          )
        : "Usuário ou senha inválido!";
      messageCompare = token;
    }
    response.json({
      message: messageCompare,
    });
  },

  async list(request, response) {
    try {
      const users = await UserModal.findAll({
        attributes: {
          exclude: "password",
        },
        include: {
          model: ProductModel,
        },
      });
      return response.status(200).json(users);
    } catch (error) {
      return response.status(404).json({
        error: "Erro ao listar usuários",
      });
    }
  },

  async listarUm(request, response) {
    try {
      let id = request.params.id;
      const user = await UserModal.findOne({
        where: {
          id: id,
        },
        include: {
          model: ProductModel,
        },
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).json({
        error: "Erro ao listar usuário",
      });
    }
  },

  async atualizar(request, response) {
    const { firstname, surname, email, password } = request.body;

    if (!verify([firstname, surname, email, password])) {
      return response.json({
        message: "Algum campo obrigatório não foi preenchido!",
      });
    } else {
      try {
        let id = request.params.id;
        await UserModal.update(request.body, {
          where: {
            id: id,
          },
        });
        return response.json("Usuário atualizado com sucesso");
      } catch (error) {
        return response.status(404).json({
            error: "Erro ao listar usuário",
          })
      }
    }
  },
  async deletarTodos(request, response) {
    await UserModal.destroy({
      where: {},
    });
    return response.json("Todos os usuários foram deletados com sucesso");
  },
  async deletarUm(request, response) {
    let id = request.params.id;
    await UserModal.destroy({
      where: {
        id: id,
      },
    });

    return response.json("Usuário deletado com sucesso");
  },
};

module.exports = UserControler;
