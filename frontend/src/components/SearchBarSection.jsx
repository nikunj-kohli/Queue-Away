import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {FaFilter} from 'react-icons/fa';

function SearchBarSection() {
  return (
    <div className='bg-light d-flex align-items-center justify-content-center vh-100 pb-5'>


        <Container className='text-center'>

            <h1 className='fw-bold mb-3'>Queue Away</h1>
            <p className='text-muted mb-4'>Discover and join queues at your favourite shops, salons and service providers.</p>

            <Row className='justify-content-center g-3'>

                <Col xs={12} md={4}>
                    <Form.Control
                        type='text'
                        placeholder='Search for salon, spa, clinics...'
                    />
                </Col>


                <Col xs={12} md={3}>
                    <Form.Control
                        type='text'
                        placeholder='Location'    
                    />
                </Col>

                <Col xs='auto'>
                    <Button variant='outline-secondary'>
                            <FaFilter className='me-2'/>
                            Filters
                    </Button>
                </Col>

                <Col xs='auto'>
                    <Button variant='dark'>
                            Find Shops
                    </Button>
                </Col>





            </Row>

        </Container>

    </div>
  )
}

export default SearchBarSection