import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../css/QueueDirectory.css';

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '');
}

function QueueDirectory() {
  const [queueData, setQueueData] = useState([]);

  useEffect(() => {
    fetch('/api/shops')
      .then(res => res.json())
      .then(data => setQueueData(data))
      .catch(() => setQueueData([]));
  }, []);

  return (
    <div className="queue-directory-container">
      <Container>
        <h1 className="queue-directory-title text-center mb-4">Queue Directory</h1>
        <Row className="queue-directory-row justify-content-center g-3 mb-4">
          <Col xs={12} md={4}>
            <Form.Control
              type='text'
              placeholder='Search for shops and service'
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              type='text'
              placeholder='Location'
            />
          </Col>
          <Col xs="auto">
            <Button variant='outline-secondary'>
              <FaFilter className='me-2 '/>
              Filters
            </Button>
          </Col>
        </Row>
        <Row>
          {queueData.map((shop, idx) => (
            <Col xs={12} md={7} key={shop._id || idx} className="mx-auto">
              <div className="queue-card">
                <div className="queue-card-info">
                  <div className="queue-card-name">{shop.name}</div>
                  <div className="queue-card-address">{shop.address}</div>
                </div>
                <Link to={`/queue-directory/${shop._id}/book`}>
                <Button variant="dark">View</Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default QueueDirectory