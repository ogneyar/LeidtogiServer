import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { Row, Card } from 'react-bootstrap'

const BrandBar =  observer(() => {
    const { brand } = useContext(Context)
    return (
        <Row className='d-flex ml-0'>
            <Card
                style={{cursor: "pointer"}}
                border={undefined === brand.selectedBrand.id ? 'warning' : 'light'}
                bg={undefined === brand.selectedBrand.id ? 'warning' : ''}
                onClick={() => brand.setSelectedBrand({})}
                key={0}
                className="p-3"
            >
                Все бренды
            </Card>
            {brand.brands.map(br =>
                <Card
                    style={{cursor: "pointer"}}
                    border={br.id === brand.selectedBrand.id ? 'warning' : 'light'}
                    bg={br.id === brand.selectedBrand.id ? 'warning' : ''}
                    onClick={() => brand.setSelectedBrand(br)}
                    key={br.id}
                    className="p-3"
                >
                    {br.name}
                </Card>    
            )}
        </Row>
    )
})

export default BrandBar
