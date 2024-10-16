import { useNavigate } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductForm from '../../componets/ProductForm';
import ProductList from '../../componets/ProductList';

function Home() {

    return (
        <div className="App">
            <header>
                <h1>Sistema Loja</h1>
            </header>
            <ProductForm />
            <ProductList />
        </div>
    );
}

export default Home;
