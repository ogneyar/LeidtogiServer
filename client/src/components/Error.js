import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'


const Error = () => {
    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
        >            
            <Card style={{width: 600}} className="p-5 m-5">
                <Row>
                    <Col
                        className="d-flex justify-content-center align-items-center"
                    >
                        <strong>Что-то пошло не так...</strong>
                    </Col>
                </Row>
            </Card>
           
        </Container>
    )
}

export default Error
