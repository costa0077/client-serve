import React, { useState } from 'react';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/produtos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          descricao: description,
          preco: parseFloat(price),
          quantidade: parseInt(quantity),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar produto');
      }

      const newProduct = await response.json();
      console.log('Produto adicionado:', newProduct);
      setSuccess('Produto adicionado com sucesso!');

      // Limpar os campos
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);

      window.location.reload();

    } catch (error) {
      console.error('Erro:', error);
      setError(error.message);
    }
  };

  return (
    <div className="product-form">
      <h2>Adicionar Produto</h2>
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
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
}

export default ProductForm;
