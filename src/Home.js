import React, { useState } from 'react';
import './App.css'; // Assuming this file contains additional CSS styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import DisplayProduct from './DisplayProduct';
import ProductInfo from './ProductInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [productData, setProductData] = useState(null);

  return (
    
    <div>
      {/* Header */}
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">Guarding Lives, Exposing Fakes: Medicines Safeguarded!</h1>
                <p className="lead text-white-50 mb-4">Safeguarding health by detecting counterfeit medicines: Our mission is to ensure authenticity and safety.</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                  <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

        {/* About section */}
        <section className="py-5 border-bottom" id="about">
        <div className="container px-5 my-5">
            <div className="row gx-5">
            <div className="col-lg-3 mb-5 mb-lg-0 text-center">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="fas fa-industry"></i></div>
                <h2 className="h4 fw-bolder">Manufacturer</h2>
                <p>Manufacturer can SignIn or register to our website by clicking Manufacturer button and can add Medicine.</p>
                <a className="text-decoration-none" href="product-info">
                Call to action
                <i className="bi bi-arrow-right"></i>
                </a>
            </div>
            <div className="col-lg-3 mb-5 mb-lg-0 text-center">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="fas fa-truck"></i></div>
                <h2 className="h4 fw-bolder">Supplier</h2>
                <p>Supplier can SignIn using public and private Key. Once authorised they can transfer the medicine to next supplier or to the consumer.</p>
                <a className="text-decoration-none" href="/update">
                Call to action
                <i className="bi bi-arrow-right"></i>
                </a>
            </div>
            <div className="col-lg-3 mb-5 mb-lg-0 text-center">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="fas fa-users"></i></div>
                <h2 className="h4 fw-bolder">Consumer</h2>
                <p>Consumer can SignIn and register to our website by clicking Consumer button and can Scan QR code.</p>
                <a className="text-decoration-none" href="display">
                Call to action
                <i className="bi bi-arrow-right"></i>
                </a>
            </div>
            <div className="col-lg-3 mb-5 mb-lg-0 text-center">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="fas fa-cogs"></i></div>
                <h2 className="h4 fw-bolder">Admin</h2>
                <p>Admin can add Manufacturers and Suppliers to the System.</p>
                <a className="text-decoration-none" href="admin">
                Call to action
                <i className="bi bi-arrow-right"></i>
                </a>
            </div>
            </div>
        </div>
        </section>


    </div>
    
  );
}

export default Home;
