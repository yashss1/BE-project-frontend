import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SupplierAuth() {
  const [formData, setFormData] = useState({
    privateKey: '',
    publicKey: ''
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/user/getUser/${formData.privateKey}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "ngrok-skip-browser-warning": "69420"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      if (userData.publicKey === formData.publicKey) {
        window.location.href = `/medInfo?publicKey=${encodeURIComponent(formData.publicKey)}`;
      } else {
        setModalContent('Invalid ID');
        setModalShow(true);
      }
    } catch (error) {
      setError('Error fetching user data. Please try again later.');
      console.error('Error fetching user data:', error);
      setModalContent('Error fetching user data. Please try again later.');
      setModalShow(true);
    } finally {
      setLoading(false);
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
            <h4 className="card-title mt-3 text-center">Enter Keys</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPrivateKey" className="mb-7">
                    <Form.Label>Private Key:</Form.Label>
                    <Form.Control type="text" name="privateKey" value={formData.privateKey} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPublicKey" className="mb-7">
                    <Form.Label>Public Key:</Form.Label>
                    <Form.Control type="text" name="publicKey" value={formData.publicKey} onChange={handleChange} />
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
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <i className="fa fa-exclamation-circle" style={{ fontSize: '64px', color: 'red' }}></i>
                <p>{modalContent}</p>
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

export default SupplierAuth;
