// const dotenv = require('dotenv');
// dotenv.config();

const express = require('express');
const app = express();


// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   next();
// }
// app.use(allowCrossDomain);

app.use(express.json())

const JwtVerifyToken = require('./middleware/jwtVerifyToken')
const UserControler = require('./controller/UserController')
const CategoriaController = require('./controller/CategoriaController')
const ProductOption = require('./controller/ProductOptionController')
const ProductController =  require('./controller/ProductController')
const ImageController = require('./controller/ImagesController')


//Usuários
app.post('/users', UserControler.create);
app.get('/users', UserControler.list);
app.get('/users/:id', UserControler.listarUm);
app.put('/users/:id', JwtVerifyToken,UserControler.atualizar);
app.delete('/users/', JwtVerifyToken, UserControler.deletarTodos);
app.delete('/users/:id',JwtVerifyToken, UserControler.deletarUm)

//Login

app.post('/login', UserControler.login)

//Categorias
app.post('/categorias',JwtVerifyToken, CategoriaController.cadastrar);
app.get('/categorias/', CategoriaController.listar);
app.get('/categorias/:id', CategoriaController.listarUm);
app.put('/categorias/:id',JwtVerifyToken, CategoriaController.atualizar);
app.delete('/categorias',JwtVerifyToken, CategoriaController.deletarTodos)
app.delete('/categorias/:id',JwtVerifyToken, CategoriaController.deletarUm)

//ProductOption
app.post('/options', ProductOption.create);
app.get('/options/', ProductOption.list);

//Produtos
app.post('/products',JwtVerifyToken, ProductController.create);
app.get('/products', ProductController.listar);
app.get('/products/:id', ProductController.listarUm);
app.put('/products/:id',JwtVerifyToken, ProductController.AtualizarPorID);
app.delete('/products/:id',JwtVerifyToken, ProductController.DeletarPorID)


//Imagens
app.post('/images', ImageController.criarImagem);
app.get('/images', ImageController.listar);
app.get('/images/:id', ImageController.listarUma);
app.put('/UpdateImages/:id', ImageController.atualizar);
app.delete('/DeleteImages/:id', ImageController.deletarUma);
app.delete('/Deleteimages', ImageController.deletarTodas)



app.listen(10000)