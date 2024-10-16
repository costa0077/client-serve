import React, { useState } from 'react';
import ProductForm from './componets/ProductForm'; 
import ProductList from './componets/ProductList'; 
import './App.css';  

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const editProduct = (index) => {
    const newProducts = [...products];
    // Lógica para edição do produto
    setProducts(newProducts);
  };

  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  return (
    <div className="App">
      <header>
        <h1>Store System</h1>
      </header>
      <ProductForm onAddProduct={addProduct} />
      <ProductList products={products} onEdit={editProduct} onDelete={deleteProduct} />
    </div>
  );
}

export default App;
