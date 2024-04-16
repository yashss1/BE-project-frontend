import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DisplayProduct() {
  const [productId, setProductId] = useState('');

  const handleChange = e => {
    setProductId(e.target.value);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
        <h4 className="card-title mt-3 text-center mb-3">Enter Product Information</h4>
          <Form>
            <Form.Group as={Row} controlId="productId" className="mb-3">
              <Form.Label column sm={4}>ID:</Form.Label>
              <Col sm={8}>
                <Form.Control type="text" value={productId} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Row className="justify-content-center mt-3">
              <Col sm={6}>
                <Link to={`/product/${productId}`}>
                  <div className="text-center mt-3 mb-3" >
                    <Button variant="primary" block>
                      Submit
                    </Button>
                  </div>
                </Link>
              </Col>
            </Row>
          </Form>
        </article>
      </div>
    </div>
  );
}

export default DisplayProduct;
