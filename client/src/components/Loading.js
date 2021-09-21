import React from 'react'
import { Spinner, Container, Col, Row } from 'react-bootstrap'


const Loading = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center" 
        >
            <div style={{width: 300}} className="p-5 m-5">
                <Row>
                    <Col
                        className="d-flex justify-content-center align-items-center"
                    >
                        <Spinner animation="border" variant="secondary" />
                    </Col>
                </Row>
            </div>
            
        </Container>
    )
}

export default Loading
