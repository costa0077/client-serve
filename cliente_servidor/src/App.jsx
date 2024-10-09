// src/App.jsx
import React from 'react';
import ProductForm from './componets/ProductForm';  // Verifique o caminho
import ProductList from './componets/ProductList';  // Verifique o caminho
import './App.css';  // Estilos globais

function App() {
  return (
    <div className="App">
      <header>
        <h1>Gerenciamento de Produtos</h1>
      </header>
      <ProductForm />  {/* Formulário de adicionar produto */}
      <ProductList />  {/* Lista de produtos */}
    </div>
  );
}

export default App;
