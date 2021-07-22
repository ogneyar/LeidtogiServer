import React, { useState, useContext, useEffect } from 'react'
import { createBrand, fetchBrands, deleteBrand, updateBrand } from '../http/brandAPI'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'


const BrandService = observer(() => {

    const { brand } = useContext(Context)
    const [ value, setValue ] = useState('')
    const [ info, setInfo ] = useState([])

    useEffect(() => {
        fetchBrands().then(data => {
            brand.setBrands(data)
            setInfo(brand.brands)
        })
    },[])

    const delBrand = async (id, name) => {
        let yes = window.confirm(`Вы уверены, что хотите удалить бренд ${name}? Вместе с ним удалятся и привязаные к нему товары, если таковые имеются! Будьте внимательны!!! Удаляем?!`)
        if (yes) {
            await deleteBrand(id)
            
            brand.setBrands(
                brand.brands.filter(i => i.id !== id)
            )
            setInfo(brand.brands)
        }
    }
    
    const editBrand = (id) => {

        let elementCategory = document.getElementById(id)
        elementCategory.readOnly = false
        elementCategory.style.cursor = "text"

        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "none"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "flex"

    }

    const editBrandApply = async (id) => {

        let elementCategory = document.getElementById(id)
        let newName = elementCategory.value
        elementCategory.style.cursor = "pointer"
        elementCategory.readOnly = true

        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "flex"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "none"

        
        await updateBrand(id, newName)
    }

    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            brand.setBrands([...brand.brands, ...data])
            setInfo(brand.brands)
        })        
    }


    return (
        <div>
            {info && info.map(i => {

                if (i.id === undefined) return <div key={42}/>

                return (
                <Row
                    className='mt-4'
                    key={i.id}
                >
                    <Col md={5}>
                        <Form.Control 
                            className='mt-1'
                            style={{cursor:'pointer'}}
                            value={i.name}
                            readOnly={true}
                            id={i.id}
                            onChange={e => {
                                setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
                            }}            
                            title="..."
                        />
                    </Col>
                    
                    <Col md={3}>
                        <Button
                            variant="outline-primary"
                            onClick={() => editBrand(i.id)}
                            className='mt-1'
                            id={"button_" + i.id}
                        >
                            Изменить...
                        </Button>

                        <Button
                            variant="outline-warning"
                            onClick={() => editBrandApply(i.id)}
                            style={{display:"none"}}
                            className='mt-1'
                            id={"button_warning_" + i.id}
                        >
                            Применить
                        </Button>
                    </Col>

                    <Col md={3}>
                        <Button
                            variant="outline-danger"
                            onClick={() => delBrand(i.id, i.name)}
                            className='mt-1'
                        >
                            Удалить
                        </Button>
                    </Col>



                </Row>)}
            )}

            <Form>
                <Form.Control 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'Введите название бренда'}
                />
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Form>
                
            
        </div>
    )
})

export default BrandService
