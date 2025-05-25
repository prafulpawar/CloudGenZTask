import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css'; 
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Product Catalog</h1>
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* You could add a 404 Not Found page here */}
            <Route path="*" element={
              <div className="container centered-message">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" className="back-button">Go to Homepage</Link>
              </div>
            } />
          </Routes>
        </main>
       
      </div>
    </Router>
  );
}

export default App;