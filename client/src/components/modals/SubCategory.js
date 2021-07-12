import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'

const SubCategory = ({subInfo}) => {

    // const [info, setInfo] = useState([])

    const [value, setValue] = useState('')
    
    useEffect(() => {        
        // setInfo(subInfo)        
    },[])

    return (        
        <Form>
        {/* {info.map(i => 
        <> */}
            <Row
                className='mt-4 ml-4'
            >

                <Col md={5}>
                    <Form.Control 
                        className='mt-1'
                        style={{cursor:'pointer'}}
                        value={subInfo.name}
                        disabled={true}
                        readOnly={true}
                        id={"sub_category_" + subInfo.id}
                            onChange={e => {
                                // setInfo(info.map(k => subInfo.id === k.id ? {...k, name:e.target.value} : k))
                            }}

                            onClick={e => {
                                // openSubCategory(i.id, e.target)
                            }}

                            title="Показать подкатегории"
                        />
                </Col>
                
                <Col md={3}>
                    <Button
                        variant="outline-primary"
                        // onClick={() => editCategory(i.id)}
                        className='mt-1'
                        id={"button_" + subInfo.id}
                    >
                        Изменить...
                    </Button>

                    <Button
                        variant="outline-warning"
                        // onClick={() => editCategoryApply(i.id)}
                        style={{display:"none"}}
                        className='mt-1'
                        id={"button_warning_" + subInfo.id}
                    >
                        Применить
                    </Button>
                </Col>

                <Col md={3}>
                    <Button
                        variant="outline-danger"
                        // onClick={() => delCategory(i.id, i.name)}
                        className='mt-1'
                    >
                        Удалить
                    </Button>
                </Col>

            </Row>

            
            {/* изначально не видимая форма для добавления подкатегории */}
            {/* <Form
            id={"sub_category_" + i.id}
            style={{display:"flex"}}
            >
            <Form.Control 
                className='mt-4 ml-4'
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={'Введите название новой подкатегории'}
            />
            <Button 
                variant="outline-success" 
                // onClick={() => addSubCategory(i.id)}
                className='mt-4 ml-4'
            >
                Добавить
            </Button>
            </Form> */}

        {/* </>
        )} */}
        </Form>
    )
}

export default SubCategory
