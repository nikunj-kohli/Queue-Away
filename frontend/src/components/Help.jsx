import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Help() {
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
              <h2 className="fw-bold mb-4" style={{ fontSize: '2.2rem' }}>Help & Support</h2>
              <p className="mb-4 text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
                Need assistance? We're here to help!<br /><br />
                Here are some common actions you can take:
              </p>
              <ul className="text-start mb-4" style={{ fontSize: '1.08rem', color: '#444', lineHeight: 2, paddingLeft: 0, listStyle: 'none' }}>
                <li>• To join a queue, search for your desired shop and click <b>View</b> then <b>Book Now</b>.</li>
                <li>• Check your queue status anytime in the <b>My Queues</b> section.</li>
                <li>• For business login, use the <b>Business Login</b> button in the navbar.</li>
                <li>• If you forgot your password, use the <b>Forgot Password?</b> link on the login page.</li>
              </ul>
              <p className="mb-0 text-muted" style={{ fontSize: '1.08rem' }}>
                For further support, contact us at <a href="mailto:support@queueaway.com">support@queueaway.com</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Help;