import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { Row, Card } from 'react-bootstrap'

const BrandBar =  observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className='d-flex mt-3 ml-0'>
            <Card
                style={{cursor: "pointer"}}
                border={undefined === product.selectedBrand.id ? 'danger' : 'light'}
                onClick={() => product.setSelectedBrand({})}
                key={0}
                className="p-3"
            >
                Все бренды
            </Card>
            {product.brands.map(brand =>
                <Card
                    style={{cursor: "pointer"}}
                    border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => product.setSelectedBrand(brand)}
                    key={brand.id}
                    className="p-3"
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    )
})

export default BrandBar
