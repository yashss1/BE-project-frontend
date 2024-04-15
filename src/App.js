import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import DisplayProduct from './DisplayProduct';
import ProductInfo from './ProductInfo';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [productData, setProductData] = useState(null);

  return (
    <Router>
      <div className="container-fluid bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Product Info</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product-info" className="nav-link">Enter Product Info</Link>
              </li>
              <li className="nav-item">
                <Link to="/display" className="nav-link">Display Product Info</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-info" element={<ProductForm setProductData={setProductData} />} />
          <Route path="/display" element={<DisplayProduct productData={productData} />} />
          <Route path="/product/:id" element={<ProductInfo />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
