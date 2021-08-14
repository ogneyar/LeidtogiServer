import React from 'react';
import { Form, Row, Col } from 'react-bootstrap'


const Size = ({size, setSize}) => {

    const changeSize = (key, value) => {
        setSize({...size, [key]: value}) 
    }

    return (
        <Row
            className=''
        >
            <Col md={2} className='mb-1'>
                <label>Вес:</label>
                <Form.Control    
                    value={size.weight}
                    onChange={(e) => changeSize('weight', e.target.value)}
                    placeholder={'Введите вес'}
                    type="number"
                    min="0"
                    step="0.1"
                />
            </Col>
            <Col md={2} className='mb-1'>
                <label>Объём:</label>
                <Form.Control    
                    value={size.volume}
                    onChange={(e) => changeSize('volume', e.target.value)}
                    placeholder={'Введите объём'}
                    type="number"
                    min="0"
                    step="0.1"
                />
            </Col>
            <Col md={2} className='mb-1'>
                <label>Ширина:</label>
                <Form.Control    
                    value={size.width}
                    onChange={(e) => changeSize('width', e.target.value)}
                    placeholder={'Введите ширину'}
                    type="number"
                    min="0"
                    step="0.1"
                />
            </Col>
            <Col md={2} className='mb-1'>
                <label>Высота:</label>
                <Form.Control    
                    value={size.height}
                    onChange={(e) => changeSize('height', e.target.value)}
                    placeholder={'Введите высоту'}
                    type="number"
                    min="0"
                    step="0.1"
                />
            </Col>
            <Col md={2} className='mb-1'>
                <label>Длина:</label>
                <Form.Control   
                    value={size.length}    
                    onChange={(e) => changeSize('length', e.target.value)}
                    placeholder={'Введите длину'}
                    type="number"
                    min="0"
                    step="0.1"
                />
            </Col>
        </Row>   
    );
}

export default Size;
