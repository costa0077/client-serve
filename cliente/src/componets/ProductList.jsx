import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({ onEdit }) {
  const navigate = useNavigate(); // Hook para navegação
  const [products, setProducts] = useState([]); // Estado para armazenar a lista de produtos
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [error, setError] = useState(null); // Estado para gerenciar erros

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos: ' + response.statusText);
      }
      const data = await response.json();
      setProducts(data); // Armazena os produtos no estado
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message); // Atualiza o estado de erro
    } finally {
      setLoading(false); // Atualiza o estado de carregamento
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja excluir este produto?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/produtos/delete/${id}`, {
          method: 'DELETE',
        });
  
        console.log('Resposta do servidor:', response); // Log detalhado da resposta
  
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          let errorMessage = 'Erro ao excluir produto';
  
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const errorText = await response.text();
            console.error('Resposta do servidor:', errorText);
          }
  
          throw new Error(errorMessage);
        }
  
        // Atualiza a lista de produtos removendo o produto deletado
        setProducts(products.filter(product => product.id !== id));
        console.log(`Produto com ID ${id} excluído com sucesso.`);
      } catch (error) {
        console.error('Erro:', error);
        setError(error.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/produtos/detail/${id}`); // Redirecionando para a rota de edição
  };

  // useEffect para chamar a função fetchProducts quando o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []);

  // Renderiza um carregamento enquanto os produtos são buscados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Renderiza uma mensagem de erro, se houver
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.nome}</td>
                <td>{product.descricao}</td>
                <td>{`R$ ${product.preco}`}</td>
                <td>{product.quantidade}</td>
                <td>
                  <button onClick={() => handleEdit(product.id)}>✏️</button>
                  <button onClick={() => handleDelete(product.id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum produto encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
