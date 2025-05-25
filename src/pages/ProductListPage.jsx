import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';


const API_URL = 'https://fakestoreapi.com/products';
const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // To store original list for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products and categories concurrently
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(API_URL),
          fetch(CATEGORIES_URL)
        ]);

        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status} on products fetch`);
        }
        if (!categoriesResponse.ok) {
            throw new Error(`HTTP error! status: ${categoriesResponse.status} on categories fetch`);
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setAllProducts(productsData); // Store all products
        setProducts(productsData);    // Initially display all products
        setCategories(categoriesData);

      } catch (e) {
        console.error("Failed to fetch data:", e);
        setError(e.message || 'Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []); 
  const filteredProducts = useMemo(() => {
    let currentProducts = [...allProducts];

    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerSearchTerm) ||
          (product.description && product.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    return currentProducts;
  }, [allProducts, selectedCategory, searchTerm]);


  if (loading) {
    return (
      <div className="centered-message">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-message">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container product-list-page">
      <div className="product-list-controls">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="centered-message">
            <p>No products found matching your criteria.</p>
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;