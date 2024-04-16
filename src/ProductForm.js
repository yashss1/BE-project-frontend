import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductInfo() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    manufacturerName: '',
    manufacturerAddress: '',
    manufacturingDate: new Date(),
    expiryDate: new Date(),
    mrp: '',
    certification: '',
    quantity: '',
    temperature: '',
    supplierId: ''
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
      const manufacturingDateTimestamp = Math.floor(formData.manufacturingDate.getTime() / 1000);
      const expiryDateTimestamp = Math.floor(formData.expiryDate.getTime() / 1000);

      const dataToSend = {
        id: formData.id,
        name: formData.name,
        manufacturerName: formData.manufacturerName,
        manufacturerAddress: formData.manufacturerAddress,
        manufacturingDate: manufacturingDateTimestamp,
        expiryDate: expiryDateTimestamp,
        mrp: formData.mrp,
        certification: formData.certification,
        quantity: formData.quantity,
        temperature: formData.temperature,
        supplierId: formData.supplierId
      };

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
      setModalContent(data.image);
      setModalShow(true);
    } catch (error) {
      setError('Error submitting product data. Please try again later.');
      console.error('Error submitting product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = modalContent;
    link.download = 'product_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <h4 className="card-title mt-3 text-center">Enter Product Information</h4>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} >
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formId" className="mb-3">
                    <Form.Label><i className="fa fa-id-card"></i> ID:</Form.Label>
                    <Form.Control type="text" name="id" value={formData.id} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label><i className="fa fa-font"></i> Name:</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formManufacturerName" className="mb-3">
                    <Form.Label><i className="fa fa-user"></i> Manufacturer Name:</Form.Label>
                    <Form.Control type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formManufacturerAddress" className="mb-3">
                    <Form.Label><i className="fa fa-address-card"></i> Address:</Form.Label>
                    <Form.Control type="text" name="manufacturerAddress" value={formData.manufacturerAddress} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formManufacturingDate" className="mb-3">
                    <Form.Label><i className="fa fa-calendar"></i> Manufacturing Date:</Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={formData.manufacturingDate}
                      onChange={(date) => setFormData({ ...formData, manufacturingDate: date })}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formExpiryDate" className="mb-3">
                    <Form.Label><i className="fa fa-calendar"></i> Expiry Date:</Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={formData.expiryDate}
                      onChange={(date) => setFormData({ ...formData, expiryDate: date })}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formMRP" className="mb-3">
                    <Form.Label><i className="fa fa-shopping-cart"></i> MRP:</Form.Label>
                    <Form.Control type="text" name="mrp" value={formData.mrp} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCertification" className="mb-3">
                    <Form.Label><i className="fa fa-certificate"></i> Certification:</Form.Label>
                    <Form.Control type="text" name="certification" value={formData.certification} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formQuantity" className="mb-3">
                    <Form.Label><i className="fa fa-sort-numeric-up"></i> Quantity:</Form.Label>
                    <Form.Control type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTemperature" className="mb-3">
                    <Form.Label><i className="fa fa-thermometer-half"></i> Temperature:</Form.Label>
                    <Form.Control type="text" name="temperature" value={formData.temperature} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formSupplierId" className="mb-3">
                    <Form.Label><i className="fa fa-id-badge"></i> Supplier ID:</Form.Label>
                    <Form.Control type="text" name="supplierId" value={formData.supplierId} onChange={handleChange} />
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
                <Modal.Title>Uploaded Image</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img src={modalContent} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px', margin: 'auto' }} />
                <div className="mt-3">
                  <Button variant="primary" onClick={handleDownload}>Download</Button>
                </div>
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

export default ProductInfo;
