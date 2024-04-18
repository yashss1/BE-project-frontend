import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


function UpdateConsumer() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');  
  const [formData, setFormData] = useState({
    supplierId: 'Consumer', // Set the supplierId to the id parameter if available, otherwise set to '0'
    supplierName: 'null',
    productId: id || '0' ,
    temperature: '',
  });
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/addSupplier/${formData.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify({
          supplierId: formData.supplierId,
          temperature: formData.temperature
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update supplier information');
      }

      // Simulating a successful response
      setTimeout(() => {
        setModalShow(true);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError('Error updating supplier information. Please try again later.');
      console.error('Error updating supplier information:', error);
    }
  };

  // Function to handle changes in form inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "800px" }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Transfer to Consumer</h4>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formSupplierId" className="mb-3">
                    <Form.Label><i className="fa fa-id-badge"></i> Supplier ID:</Form.Label>
                    <Form.Control type="text" name="supplierId" value={formData.supplierId} onChange={handleChange} disabled/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formSupplierName" className="mb-3">
                    <Form.Label><i className="fa fa-user"></i> Supplier Name:</Form.Label>
                    <Form.Control type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} disabled/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formProductId" className="mb-3">
                    <Form.Label><i className="fa fa-tag"></i> Medicine ID:</Form.Label>
                    <Form.Control type="text" name="productId" value={formData.productId} onChange={handleChange} disabled/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formTemperature" className="mb-3">
                    <Form.Label><i className="fa fa-thermometer-half"></i> Temperature:</Form.Label>
                    <Form.Control type="text" name="temperature" value={formData.temperature} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center mt-3 mb-3">
                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </div>
            </Form>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Transfered Successfully</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <i className="fa fa-check-circle" style={{ fontSize: '64px', color: 'green' }}></i>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </article>
        </div>
      )}
    </div>
  );
}

export default UpdateConsumer;
