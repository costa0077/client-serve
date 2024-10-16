const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Caminho para o arquivo de configuração do Sequelize

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Produto;
