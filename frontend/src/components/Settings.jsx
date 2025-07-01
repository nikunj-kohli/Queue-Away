import React from "react";


function Settings() {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="bg-white rounded-4 p-5 shadow-sm">
              <h2 className="fw-bold mb-4">Settings & Support</h2>
              <p className="text-muted">
                Welcome to Queue Away help center. Get assistance with managing
                your queues and bookings.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
