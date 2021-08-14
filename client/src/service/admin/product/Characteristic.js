import React from 'react';
import { Form } from 'react-bootstrap'


const Characteristic = ({info, setInfo}) => {

    const changeInfo = (description) => {
        setInfo({...info, description}) 
    }

    return (
        <div
            className='Characteristic'
        >
            <label>Характеристики:</label>
            <Form.Control   
                value={info.description}
                onChange={(e) => changeInfo(e.target.value)}
                placeholder={'Введите характеристики'}
            />
        </div>
    );
}

export default Characteristic;