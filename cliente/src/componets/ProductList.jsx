import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

function ProductList({ onEdit }) {
  const navigate = useNavigate(); // Hook para navegação
  const [products, setProducts] = useState([]); // Estado para a lista de produtos
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros

  // Estados para categorias
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos: ' + response.statusText);
      }
      const data = await response.json();
      setProducts(data); // Armazena os produtos no estado

      // Extrair categorias
      const allCategories = ['Todas', ...new Set(data.map(product => product.categoria))];
      setCategories(allCategories);

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

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Erro ao excluir produto');
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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Filtrar produtos pela categoria selecionada
  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product => product.categoria === selectedCategory);

  // Dados para o gráfico de barras (Produtos em estoque por categoria)
  const stockData = categories.filter(cat => cat !== 'Todas').map(category => {
    const totalQuantity = products
      .filter(product => product.categoria === category)
      .reduce((sum, product) => sum + product.quantidade, 0);
    return { categoria: category, quantidade: totalQuantity };
  });

  // Dados para o gráfico de pizza (Distribuição de preços)
  const priceRanges = [
    { range: '0 - 50', min: 0, max: 50 },
    { range: '51 - 100', min: 51, max: 100 },
    { range: '101 - 200', min: 101, max: 200 },
    { range: '201+', min: 201, max: Infinity },
  ];

  const priceData = priceRanges.map(range => {
    const count = products.filter(product => product.preco >= range.min && product.preco <= range.max).length;
    return { faixa: range.range, quantidade: count };
  });

  return (
    <div className="product-list">
      <h2>Lista de Produtos</h2>

      {/* Seletor de categorias */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      {/* Tabela de produtos */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th> {/* Nova coluna */}
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.nome}</td>
                <td>{product.descricao}</td>
                <td>{product.categoria}</td> {/* Exibe a categoria */}
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
              <td colSpan="7">Nenhum produto encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Gráficos */}
      <div className="charts">
        <div className="chart">
          <h3>Número de Produtos em Estoque por Categoria</h3>
          <BarChart width={600} height={300} data={stockData}>
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart">
          <h3>Distribuição de Preços</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={priceData}
              dataKey="quantidade"
              nameKey="faixa"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {priceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
