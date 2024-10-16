const express = require('express');
const Produto = require('../model/produto'); // Importa o modelo Produto
const router = express.Router(); // Cria um roteador Express

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll(); // Busca todos os produtos no banco de dados
        res.json(produtos); // Retorna a lista de produtos em formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
});

// Rota para buscar um produto específico pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do produto da URL

    try {
        const produto = await Produto.findOne({ where: { id } }); // Busca o produto pelo ID
        if (produto) {
            res.json(produto); // Retorna o produto encontrado em formato JSON
        } else {
            res.status(404).json({ message: 'Produto não encontrado' }); // Se o produto não for encontrado
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto', error });
    }
});

// Rota para adicionar um novo produto
router.post('/create', async (req, res) => { // Prefixo 'create' para adicionar produto
    const { nome, descricao, preco, quantidade } = req.body; // Extrai os dados do corpo da requisição

    try {
        const novoProduto = await Produto.create({ nome, descricao, preco, quantidade }); // Cria um novo produto
        res.status(201).json(novoProduto); // Retorna o novo produto em formato JSON com status 201 (Criado)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto', error });
    }
});

// Rota para atualizar um produto existente
router.put('/update/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do produto da URL
    const { nome, descricao, preco, quantidade } = req.body; // Extrai os dados do corpo da requisição

    try {
        const [updated] = await Produto.update(
            { nome, descricao, preco, quantidade },
            { where: { id } } // Especifica o ID do produto a ser atualizado
        );

        if (updated) {
            const updatedProduto = await Produto.findOne({ where: { id } }); // Busca o produto atualizado
            res.status(200).json(updatedProduto); // Retorna o produto atualizado
        } else {
            res.status(404).json({ message: 'Produto não encontrado' }); // Se não encontrou o produto
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
});

// Rota para excluir um produto
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Produto.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send(); // Sucesso
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir produto', error });
    }
});

module.exports = router; // Exporta o roteador para ser usado em outros arquivos
