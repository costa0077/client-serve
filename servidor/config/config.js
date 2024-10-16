const { Sequelize } = require('sequelize');

// Configurando o Sequelize para usar o SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './loja_db.sqlite',
  logging: false,
});

module.exports = sequelize;

