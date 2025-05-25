import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const API_URL_BASE = 'https://fakestoreapi.com/products/';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // For "Back to Products"
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL_BASE}${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        console.error("Failed to fetch product details:", e);
        setError(e.message || 'Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Re-run effect if ID changes

  if (loading) {
    return (
      <div className="centered-message">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container centered-message">
        <ErrorMessage message={error} />
        <button onClick={() => navigate('/')} className="back-button" style={{marginTop: '20px'}}>
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    // This case might be covered by error handling if API returns 404
    return (
      <div className="container centered-message">
        <p>Product not found.</p>
        <Link to="/" className="back-button">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container product-detail-page">
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
         
          <Link to="/" className="back-button">
            ← Back to Products
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;