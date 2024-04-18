import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateSupplier() {
  const [formData, setFormData] = useState({
    privateKey: '',
    publicKey: '',
    selectedRole: '', // Added state for selected role
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/user/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          privateKey: formData.privateKey,
          publicKey: formData.publicKey
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
            <h4 className="card-title mt-3 text-center">Admin</h4>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} >
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formPrivateKey" className="mb-3">
                    <Form.Label>Private Key:</Form.Label>
                    <Form.Control type="text" name="privateKey" value={formData.privateKey} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formPublicKey" className="mb-3">
                    <Form.Label>Public Key:</Form.Label>
                    <Form.Control type="text" name="publicKey" value={formData.publicKey} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formRole" className="mb-3">
                    <Form.Label>Role:</Form.Label>
                    <Form.Control as="select" name="selectedRole" value={formData.selectedRole} onChange={handleChange}>
                      <option value="">Select Role</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="supplier">Supplier</option>
                    </Form.Control>
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
                <Modal.Title>Added Successfully</Modal.Title>
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
