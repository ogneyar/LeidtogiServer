import React from 'react';
import { Button, Form } from 'react-bootstrap'


const ProductDeleteService = (props) => {
    return (
        <Form>
            <hr />

            <div className='d-flex justify-content-end'>
                <Button variant="outline-warning" onClick={props?.back}>Отменить удаление</Button>
            </div>

            <hr />
        </Form>
    );
}

export default ProductDeleteService;
