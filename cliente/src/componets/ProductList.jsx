import React from 'react';

function ProductList({ products = [], onEdit, onDelete }) {  // Definindo um array vazio como padrão
  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Desc</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.desc}</td>
              <td>{`R$${product.price}`}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => onEdit(index)}>✏️</button>
                <button onClick={() => onDelete(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
