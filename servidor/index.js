const express = require('express'); // Importa o Express, um framework para construir aplicações web.
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de diferentes origens.
const produtoRoutes = require('./routes/produto'); // Importa as rotas de produtos de um arquivo separado.

const app = express(); // Cria uma instância do aplicativo Express.
app.use(cors()); // Habilita o CORS no aplicativo para permitir requisições cross-origin.
app.use(express.json()); // Middleware que permite que o Express entenda JSON no corpo das requisições.

// Define a rota base para as rotas de produtos, prefixando com '/api/produtos'.
app.use('/api/produtos', produtoRoutes);

const PORT = process.env.PORT || 5000; // Define a porta do servidor, usando a variável de ambiente PORT ou 5000 como padrão.
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor e exibe uma mensagem no console.
