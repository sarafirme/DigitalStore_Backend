const { Sequelize } = require('sequelize');

require('dotenv').config();

const connection = new Sequelize('postgresql://postgres.lceaqrdydzcwnmgpizbs:digitaStore-base@aws-0-sa-east-1.pooler.supabase.com:6543/postgres');

module.exports = connection;
