const ImagesModel = require("../models/ImagesModel");
const ProductModel = require("../models/ProductModel");
const { atualizar } = require("./UserController");

const ImageController = {
    async criarImagem(request, response){
        // const product_id = request.body.product_id;
        // console.log(2)
        // const productIdReq = await ProductModel.findOne({
        //     where: { id: product_id }
        // });

        // // Se o produto não for encontrado, retorna um erro
        // if (!productIdReq || productIdReq == undefined) {
        //     return response.status(404).json({
        //         message: 'Id do produto não está cadastrado!'
        //     });
        // }
        // else{
            try {
                ImagesModel.bulkCreate(request.body);
        response.status(201);
        return response.json({
            message: "Imagem adicionada"
        })
            } catch (error) {
                return response.json({
                   message: "Erro"
                })
            }
        
        
    },

     async listar(request, response){
        const images = await ImagesModel.findAll();
        return response.json(images);
    },

    async listarUma(request, response) {
        let id = request.params.id;
        const image = await ImagesModel.findOne({
            where:{
                id:id
            }
        })
        return response.json(image)
    },

    async atualizar(requets, response){
        let id = requets.params.id
        await ImagesModel.update(requets.body,{
            where:{
                id:id
            }
        })
        return response.json('Imagem atualizada com sucesso')
    },

    async deletarTodas(request,response) {
        await ImagesModel.destroy({})

        return response.json('Todos as imagens foram deletadas')

    },

    async deletarUma(request, response){
        let id = request.params.id;
        await ImagesModel.destroy({
            where:{
                id:id
            }
        })

        return response.json('Imagem deletada com sucesso')
    }
}

module.exports = ImageController