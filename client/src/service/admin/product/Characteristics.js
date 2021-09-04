import React from 'react';
import { Form } from 'react-bootstrap'


const Characteristics = ({characteristics, setCharacteristics}) => {

    return (
        <div
            className='Characteristics'
        >
            <label>Характеристики:</label>
            <Form.Control   
                value={characteristics}
                onChange={(e) => setCharacteristics(e.target.value)}
                placeholder={'Введите характеристики'}
            />
        </div>
    );
}

export default Characteristics;