import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function About() {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center min-vh-100 pb-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={7}>
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '40px 36px',
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                margin: '0 auto',
                maxWidth: 700,
              }}
              className="text-center"
            >
              <h2 className="fw-bold mb-4" style={{ fontSize: '2.2rem' }}>About Queue Away</h2>
              <p className="mb-4 text-muted" style={{ fontSize: '1.18rem', lineHeight: 1.7 }}>
                <b>Queue Away</b> is your smart solution for managing queues at your favorite shops, salons, clinics, and service providers.<br /><br />
                Our platform helps you discover, join, and manage queues online, saving you time and making your experience smoother.<br /><br />
                Whether you're a customer looking to avoid long waits or a business aiming to streamline your service, Queue Away is here to help.<br /><br />
                <span style={{ color: '#222' }}>Join us and experience hassle-free queuing!</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;