import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductForm({ setProductData }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    manufacturerName: '',
    manufacturerAddress: '',
    manufacturingDate: '',
    expiryDate: '',
    content: '',
    mrp: '',
    certification: '',
    quantity: ''
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'id' || name === 'mrp' || name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const manufacturingDateTimestamp = new Date(formData.manufacturingDate).getTime() / 1000;
      const expiryDateTimestamp = new Date(formData.expiryDate).getTime() / 1000;

      const dataToSend = {
        ...formData,
        manufacturingDate: manufacturingDateTimestamp,
        expiryDate: expiryDateTimestamp
      };
      console.log("env ", process.env.REACT_APP_BACKEND_LINK);
      console.log("hhrr", dataToSend);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/addMedicine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) {
        throw new Error('Failed to submit product data');
      }
      const data = await response.json();
      
      console.log(data.image)
      setModalContent(data.image);
      setModalShow(true);
    } catch (error) {
      setError('Error submitting product data. Please try again later.');
      console.error('Error submitting product data:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Enter Product Information</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formId">
          <Form.Label>ID:</Form.Label>
          <Form.Control type="text" name="id" value={formData.id} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formManufacturerName">
          <Form.Label>Manufacturer Name:</Form.Label>
          <Form.Control type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formManufacturerAddress">
          <Form.Label>Manufacturer Address:</Form.Label>
          <Form.Control type="text" name="manufacturerAddress" value={formData.manufacturerAddress} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formManufacturingDate">
          <Form.Label>Manufacturing Date:</Form.Label>
          <Form.Control type="date" name="manufacturingDate" value={formData.manufacturingDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formExpiryDate">
          <Form.Label>Expiry Date:</Form.Label>
          <Form.Control type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Content:</Form.Label>
          <Form.Control type="text" name="content" value={formData.content} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formMRP">
          <Form.Label>MRP:</Form.Label>
          <Form.Control type="number" name="mrp" value={formData.mrp} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formCertification">
          <Form.Label>Certification:</Form.Label>
          <Form.Control type="text" name="certification" value={formData.certification} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </Form.Group>

        <Row className="justify-content-end mt-3">
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src={modalContent} alt="QR Code" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductForm;




