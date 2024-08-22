const CategoriaModal = require('../models/CategoriaModal');
const UserControler = require('./UserController');
const { create } = require('./UserController');

const CategoriaController = {
    cadastrar(request, response){
        try {
        CategoriaModal.create(request.body);
        response.status(201);
        return response.json({
            message: "Usuário criado"
        })
        } catch (error) {
          return response.json({
            message: "Erro encontrado"
          })  
        }
    },

    async listar(request, response){
        try {
            let categorias = await CategoriaModal.findAll({
                attributes: ['name']
            });
            return response.json(categorias)  
        } catch (error) {
            return response.json({
                message: "Erro encontrado"
              })  
    
        }
    },

    async listarUm(request,response){
        try {
            let id = request.params.id;
            let categoria = await CategoriaModal.findOne({
                where:{
                    id:id
                }
            })
            return response.json(categoria)      
        } catch (error) {
            return response.json({
                message: "Erro encontrado"
              })  
        }
    },

    async atualizar(request,response){
        try {
            let id = request.params.id;
            await CategoriaModal.update(request.body,{
                where:{
                    id:id
                }
            })
            return response.json({
                message: "Categoria atualizada com sucesso"
            })  
        } catch (error) {
            return response.json({
                message: "Erro encontrado"
              })
        }
    },
    async deletarTodos(request,response){
       try {
        await CategoriaModal.destroy({
            where:{

            }
        })
        return response.json({
            message: "Todas as categorias foram deletadas"
        })
       } catch (error) {
        return response.json({
            message: "Erro encontrado"
          })
    }
       },
    async deletarUm(request,response){
        try {
            let id = request.params.id;
        await CategoriaModal.destroy({
            where:{
                id:id
            }
        })
        return response.json({
            message: "A categoria de id "+id+" foi deletada com sucess0"
        })
        } catch (error) {
            return response.json({
                message: "Erro encontrado"
              })
        }
    }
}

module.exports = CategoriaController