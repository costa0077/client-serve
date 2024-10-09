// src/components/ProductList.jsx
import React from 'react';

function ProductList() {
  const products = [
    { id: 1, name: 'Produto 1', description: 'Descrição do produto 1', price: 100, quantity: 10 },
    { id: 2, name: 'Produto 2', description: 'Descrição do produto 2', price: 150, quantity: 5 }
  ];

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.description} - R$ {product.price} - {product.quantity} unidades
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
