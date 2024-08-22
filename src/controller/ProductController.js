const ImagesModel = require('../models/ImagesModel');
const ProductModel = require('../models/ProductModel');
const UsersModel = require('../models/UsersModal');
const ProductOption = require('../models/ProductOption');
const verify = require('../middleware/verifyData')

ProductModel.belongsTo(UsersModel, { foreignKey: 'users_id' });
ProductModel.hasMany(ImagesModel, { foreignKey: 'product_id' });
ProductModel.hasMany(ProductOption, {foreignKey: 'product_id'})

const ProductController = {
    async create(request, response) {
        const { users_id, name, slug, stock, price, price_with_discount } = request.body

        if (!verify([users_id, name, slug, stock, price, price_with_discount])) {
            return response.status(400).json({ message: 'Algum campo obrigatório não foi preenchido!' });
        } else {
            try {
                await ProductModel.create(request.body);
                return response.status(201).json({
                    message: "Produto criado com sucesso!"
                })

            } catch (error) {
                return response.status(500).json({ error: 'Erro ao criar produto' })
            }
        }
    },
    async listar(request, response) {
        try {
            const products = await ProductModel.findAll({
                include: [
                    { model: UsersModel, attributes:{exclude: "password"}},
                    { model: ImagesModel },
                    {model: ProductOption}
                ]
            });
            console.log(UsersModel)
            response.json(products);
        } catch (error) {
            response.status(500).json({ error: 'Erro ao listar produtos' });
        }
    },
    async listarUm(request, response) {
        
        try {
            let id = request.params.id;
            const listarUm = await ProductModel.findOne({
                where: { id },
                include: [
                    { model: UsersModel, attributes:{exclude: "password"} },
                    { model: ImagesModel },
                    {model: ProductOption}
                    
                ]
            });
            if (!listarUm) {
                return response.status(404).json({ message: 'Produto não cadastrado!' })
            }
            response.json(listarUm)

        } catch (error) {
            response.status(500).json({ error: 'Erro ao listar produto' });
        }

    },
    async AtualizarPorID(request, response) {
        try {
            let id = request.params.id;
            ProductModel.update(request.body, {
                where: { id }
            });
            return response.status(204).json()

        } catch (error) {
            response.status(500).json({ error: 'Erro ao atualizar produto' })
        }

    },
    async DeletarPorID(request, response) {
        try {
            let id = request.params.id;
            await ProductModel.destroy({ where: { id } });
            return response.status(204).json();
        } catch (error) {
            response.status(500).json({ error: 'Erro ao deletar produto!' })
        }

    },
}

module.exports = ProductController