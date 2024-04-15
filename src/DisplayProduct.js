import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DisplayProduct() {
  const [productId, setProductId] = useState('');

  const handleChange = e => {
    setProductId(e.target.value);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Display Product Information</h2>
      <Form>
        <Form.Group controlId="productId">
          <Form.Label>Enter Product ID:</Form.Label>
          <Form.Control type="text" value={productId} onChange={handleChange} />
        </Form.Group>
        <Link to={`/product/${productId}`}>
          <Button variant="primary">
            View Product Info
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default DisplayProduct;
