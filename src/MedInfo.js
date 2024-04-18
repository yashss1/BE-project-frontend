import React, { useState, useEffect } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import './form.css';
import { useNavigate, useLocation } from 'react-router-dom';

function MedInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const publicKey = searchParams.get('publicKey');

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/getSupplierMedicines/${publicKey}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "ngrok-skip-browser-warning": "69420"
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }
        const responseData = await response.json();
        const medicineIds = responseData.medicines; // Accessing the 'medicines' array from the response
        const medicineDetails = await Promise.all(
          medicineIds.map(async id => {
            const medResponse = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/getMedicine/${id}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                "ngrok-skip-browser-warning": "69420"
              }
            });
            if (!medResponse.ok) {
              throw new Error('Failed to fetch medicine details');
            }
            return await medResponse.json();
          })
        );
        setMedicines(medicineDetails);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [publicKey]);

  const handleTransferToSupplier = (id) => {
    navigate(`/updateSupplier?id=${id}`);
  };

  const handleTransferToConsumer = (id) => {
    navigate(`/updateConsumer?id=${id}`);
  };

  return (
    <div className="container vh-100">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Manufacturer Name</th>
              <th>Manufacturing Date</th>
              <th>Expiry Date</th>
              <th>MRP</th>
              <th>Quantity</th>
              <th>Transfer to Supplier</th>
              <th>Transfer to Consumer</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine.id}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.manufacturerName}</td>
                <td>{new Date(medicine.manufacturingDate * 1000).toLocaleDateString()}</td>
                <td>{new Date(medicine.expiryDate * 1000).toLocaleDateString()}</td>
                <td>{medicine.mrp}</td>
                <td>{medicine.quantity}</td>
                <td className="text-center">
                  <Button variant="primary" onClick={() => handleTransferToSupplier(medicine.id)}>Transfer</Button>
                </td>
                <td className="text-center">
                  <Button variant="success" onClick={() => handleTransferToConsumer(medicine.id)}>Transfer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default MedInfo;
