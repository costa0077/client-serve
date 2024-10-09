import './styles/ProductDetails.css';

const ProductDetails = ({ product }) => {
  if (!product) return <p>Selecione um produto</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>Descrição: {product.description}</p>
      <p>Preço: R${product.price}</p>
      <p>Quantidade: {product.quantity}</p>
    </div>
  );
};

export default ProductDetails;
