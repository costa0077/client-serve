import React, { useState } from 'react';
import '../styles/ProductForm.css'; // Se estiver na pasta "styles"
function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, description, price, quantity });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Adicionar Produto</h2>
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do produto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o produto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Preço:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Digite o preço"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantidade:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Digite a quantidade"
        />
      </div>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
}

export default ProductForm;
