import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // Captura o ID do produto da URL
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Função para buscar o produto pelo ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produtos/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o produto');
        }
        const data = await response.json();
        setProduct(data);
        setName(data.nome);
        setDescription(data.descricao);
        setPrice(data.preco);
        setQuantity(data.quantidade);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/produtos/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          descricao: description,
          preco: price,
          quantidade: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar o produto');
      }

      setSuccess('Produto atualizado com sucesso!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="product-form">
      <h2>Editar Produto</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default ProductDetails;
