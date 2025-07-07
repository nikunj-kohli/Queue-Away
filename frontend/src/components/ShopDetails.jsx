import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function ShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch(`/api/shops/${shopId}`)
      .then(res => res.json())
      .then(data => setShop(data));
  }, [shopId]);

  const handleBook = (e) => {
    e.preventDefault();
    fetch('/api/myqueues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopId: shop._id,
        date,
        time: selectedTime
      })
    })
      .then(res => res.json())
      .then(() => navigate('/myqueues'));
  };

  if (!shop) {
    return (
      <div style={{ minHeight: '60vh' }} className="d-flex align-items-center justify-content-center">
        <h2>Shop not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 pb-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={7}>
            <h2 className="fw-bold text-center mb-1">{shop.name}</h2>
            <div className="text-center text-muted mb-4" style={{ fontSize: '1.1rem' }}>{shop.address}</div>
            <div
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                margin: '0 auto',
                maxWidth: 500,
              }}
            >
              <div
                style={{
                  background: '#f5f5fa',
                  borderRadius: 8,
                  height: 90,
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Placeholder for image */}
                <svg width="60" height="40" viewBox="0 0 60 40">
                  <polyline points="5,35 20,15 35,30 45,20 55,35" fill="none" stroke="#aaa" strokeWidth="3" />
                  <rect x="10" y="25" width="10" height="10" fill="#aaa" />
                </svg>
              </div>
              <Row className="mb-3">
                <Col className="text-start fw-semibold">Wait Time</Col>
                <Col className="text-end fw-semibold">{shop.waitTime || 'N/A'}</Col>
              </Row>
              <div className="fw-semibold mb-2 text-start">Booking Details</div>
              <Form onSubmit={handleBook}>
                <Form.Group className="mb-3 text-start" controlId="formDate">
                  <Form.Label className="mb-1 fw-semibold">Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </Form.Group>
                <Form.Label className="mb-1 fw-semibold text-start w-100">Time</Form.Label>
                <div className="d-flex gap-2 mb-3">
                  {['10:00AM', '11:00AM', '12:00PM'].map(time => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "dark" : "light"}
                      style={{ border: '1px solid #bbb', minWidth: 90 }}
                      onClick={e => { e.preventDefault(); setSelectedTime(time); }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                <Button type="submit" variant="dark" className="w-100 fw-semibold" style={{ borderRadius: 8 }} disabled={!selectedTime || !date}>
                  Book Now
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShopDetails;