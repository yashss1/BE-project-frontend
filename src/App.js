import React, { useState } from 'react';
import './App.css'; // Assuming this file contains additional CSS styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import DisplayProduct from './DisplayProduct';
import ProductInfo from './ProductInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import UpdateSupplier from './UpdateSupplier';
import InputPage from './Admin';
import SupplierAuth from './SupplierAuth';
import MedInfo from './MedInfo';
import UpdateConsumer from './UpdateConsumer';

function App() {
  const [productData, setProductData] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Set the main container to flex column and minimum height */}
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <a className="navbar-brand" href="/">Medicine Auth</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/product-info">Add</a></li>
              <li className="nav-item"><a className="nav-link" href="/display">Display</a></li>
              <li className="nav-item"><a className="nav-link" href="/update">Update</a></li>
              <li className="nav-item"><a className="nav-link" href="/admin">Admin</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-info" element={<ProductForm setProductData={setProductData} />} />
          <Route path="/display" element={<DisplayProduct productData={productData} />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route path="/update" element={<SupplierAuth />} />
          <Route path="/admin" element={<InputPage/>} />
          <Route path="/medInfo" element={<MedInfo/>} />
          <Route path="/updateSupplier" element={<UpdateSupplier />} />
          <Route path="/updateConsumer" element={<UpdateConsumer/>} />
        </Routes>
      </Router>

      {/* Footer */}
      <footer className="py-5 bg-dark mt-auto"> {/* Set the footer to stick at the bottom */}
        <div className="container px-5">
          <p className="m-0 text-center text-white">Copyright &copy; BE-Proj 53</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
