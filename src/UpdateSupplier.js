import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateSupplier() {
  const [formData, setFormData] = useState({
    supplierId: '',
    supplierName: '',
    manufacturerName: '',
    productId: '',
    temperature: '',
  });

  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/addSupplier/${formData.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "800px" }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Update Supplier Information</h4>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} >
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formSupplierId" className="mb-3">
                    <Form.Label><i className="fa fa-id-badge"></i> Supplier ID:</Form.Label>
                    <Form.Control type="text" name="supplierId" value={formData.supplierId} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formSupplierName" className="mb-3">
                    <Form.Label><i className="fa fa-user"></i> Supplier Name:</Form.Label>
                    <Form.Control type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formManufacturerName" className="mb-3">
                    <Form.Label><i className="fa fa-industry"></i> Manufacturer Name:</Form.Label>
                    <Form.Control type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formProductId" className="mb-3">
                    <Form.Label><i className="fa fa-tag"></i> Product ID:</Form.Label>
                    <Form.Control type="text" name="productId" value={formData.productId} onChange={handleChange} />
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
              <div className="text-center mt-3 mb-3" >
                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </div>
            </Form>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Updated Successfully</Modal.Title>
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

export default UpdateSupplier;
