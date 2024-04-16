import React, { useState, useEffect } from 'react';
import { Card, Spinner, Table } from 'react-bootstrap'; // Added Table component
import productImage from './image.jpg';
import { useParams } from 'react-router-dom';

const productContainerStyle = {
  backgroundColor: '#8B4513', // Brown color
  minHeight: '100vh',
  color: 'white',
  fontFamily: 'Georgia, serif', // Changing font style
  borderRadius: '10px', // Adding rounded corners to container
  padding: '20px', // Adding padding to the container
};

const cardStyle = {
  width: '600px', // Increasing the width of the card
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '10px',
  marginBottom: '20px',
  backgroundColor: '#F5F5DC', // Beige color
  color: 'black', // Changing font color to black
};

const cardContentStyle = {
  padding: '20px',
};

const titleStyle = {
  marginTop: '20px', // Adding space between image and title
};

const imageStyle = {
  width: '100%', // Making the image fill the width of the container
  height: 'auto', // Maintaining aspect ratio
  borderRadius: '10px', // Adding rounded corners to image
};

const statsStyle = {
  marginTop: '20px', // Adding space between image and title
};

const parameterStyle = {
  marginBottom: '5px', // Decreasing margin between parameters
};

const valueStyle = {
  marginBottom: '5px', // Decreasing margin between values
};

function ProductInfo() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
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
        setProductInfo(data);
      } catch (error) {
        setError('Error fetching product information. Please try again later.');
        console.error('Error fetching product information:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductInfo();
  }, [id]);

  const formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div style={productContainerStyle} className="d-flex justify-content-center align-items-center">
      {loading ? ( // Conditionally render loading icon
        <Spinner animation="border" variant="light" />
      ) : (
        productInfo && (
          <Card style={cardStyle}>
            <Card.Body style={cardContentStyle}>
              <div className="about-product text-center mt-2">
                <img src={productImage} style={imageStyle} alt="Product" />
                <div style={titleStyle}>
                  <h4>{productInfo.name}</h4>
                  <h6 className="mt-0 text-black-50">Manufacturer: {productInfo.manufacturerName}</h6>
                </div>
              </div>
              <div className="stats mt-2" style={statsStyle}>
                <div className="d-flex justify-content-between p-price" style={parameterStyle}><span>Manufacturing Date:</span><span style={valueStyle}>{formatDate(productInfo.manufacturingDate)}</span></div>
                <div className="d-flex justify-content-between p-price" style={parameterStyle}><span>Expiry Date:</span><span style={valueStyle}>{formatDate(productInfo.expiryDate)}</span></div>
                <div className="d-flex justify-content-between p-price" style={parameterStyle}><span>MRP:</span><span style={valueStyle}>{productInfo.mrp}</span></div>
                <div className="d-flex justify-content-between p-price" style={parameterStyle}><span>Certification:</span><span style={valueStyle}>{productInfo.certification}</span></div>
                <div className="d-flex justify-content-between p-price" style={parameterStyle}><span>Quantity:</span><span style={valueStyle}>{productInfo.quantity}</span></div>
              </div>
              <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>Total</span><span>${(productInfo.mrp * productInfo.quantity).toFixed(2)}</span></div>
              {/* Table displaying supplier and temperature information */}
              <Table striped bordered hover variant="light" className="mt-4"> {/* Change variant to "light" */}
                <thead>
                  <tr>
                    <th>#</th> {/* Add row number column */}
                    <th>Supplier</th>
                    <th>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {productInfo.suppliers.map((supplier, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td> {/* Add row number */}
                      <td>{supplier}</td>
                      <td>{productInfo.temperature[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )
      )}
    </div>
  );
}

export default ProductInfo;
