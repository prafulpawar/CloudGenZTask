import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null; // Or some placeholder

  return (
    <Link to={`/product/${product.id}`} className="product-card" data-testid={`product-card-${product.id}`}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;