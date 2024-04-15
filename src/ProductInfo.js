import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import productImage from './image.jpg';
import { useParams } from 'react-router-dom';

const productContainerStyle = {
  backgroundColor: 'black',
  minHeight: '100vh',
  color: 'white',
};

function ProductInfo() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        // const url = `${process.env.REACT_APP_BACKEND_LINK}/getMedicine/${id}`;
        // const response = await fetch(url,
        //   method : 'GET',
        //   headers : {
        //     'Accept': 'application/json'
        //   }
        // );
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/getMedicine/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "ngrok-skip-browser-warning": "69420"
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product information');
        }

        const data = await response.json();
        console.log()
        setProductInfo(data);
      } catch (error) {
        setError('Error fetching product information. Please try again later.');
        console.error('Error fetching product information:', error);
      }
    };

    fetchProductInfo();
  }, [id]);

  const formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div style={productContainerStyle}>
      <div className="container">
        <h2 className="text-center">Product Information</h2>
        {error && <p className="text-danger">{error}</p>}
        {productInfo && (
          <Row>
            <Col>
              <h4>Parameters</h4>
              <p><strong>ID:</strong> {productInfo.id}</p>
              <p><strong>Name:</strong> {productInfo.name}</p>
              <p><strong>Manufacturer Name:</strong> {productInfo.manufacturerName}</p>
              <p><strong>Manufacturer Address:</strong> {productInfo.manufacturerAddress}</p>
              <p><strong>Manufacturing Date:</strong> {formatDate(productInfo.manufacturingDate)}</p>
              <p><strong>Expiry Date:</strong> {formatDate(productInfo.expiryDate)}</p>
              <p><strong>Content:</strong> {productInfo.content}</p>
              <p><strong>MRP:</strong> {productInfo.mrp}</p>
              <p><strong>Certification:</strong> {productInfo.certification}</p>
              <p><strong>Quantity:</strong> {productInfo.quantity}</p>
            </Col>
            <Col>
              <h4>Response</h4>
              <p>{productInfo.id}</p>
              <p>{productInfo.name}</p>
              <p>{productInfo.manufacturerName}</p>
              <p>{productInfo.manufacturerAddress}</p>
              <p>{formatDate(productInfo.manufacturingDate)}</p>
              <p>{formatDate(productInfo.expiryDate)}</p>
              <p>{productInfo.content}</p>
              <p>{productInfo.mrp}</p>
              <p>{productInfo.certification}</p>
              <p>{productInfo.quantity}</p>
            </Col>
            <Col>
              <h4>Image</h4>
              <img src={productImage} alt="Product" style={{ maxWidth: '100%' }} />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
