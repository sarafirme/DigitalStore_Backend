const connection = require('./connection');
const UsersModel = require('../models/UsersModal');
const ProductModel = require('../models/ProductModel')
const CategoriaModal = require('../models/CategoriaModal');
const ProductOption = require('../models/ProductOption');
const ImagesModel = require('../models/ImagesModel')


connection.sync({force:true});