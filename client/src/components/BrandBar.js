import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { Row, Card } from 'react-bootstrap'


const BrandBar =  observer(() => {

    const { brand } = useContext(Context)

    const [info, setInfo] = useState([])

    useEffect(() => {
        setInfo(brand.brands)
    },[brand.brands])


    return (
        <Row className='d-flex ml-0'>
            {/* <Card
                style={{cursor: "pointer"}}
                border={undefined === brand.selectedBrand.id ? 'warning' : 'light'}
                bg={undefined === brand.selectedBrand.id ? 'warning' : ''}
                onClick={() => brand.setSelectedBrand({})}
                key={0}
                className="p-3"
            >
                Все бренды
            </Card> */}
            {info.map((br,index) => {
                if (index === 0) {
                    // if (brand.selectedBrand.id === undefined) brand.setSelectedBrand(br)
                    return <Card
                        style={{cursor: "pointer"}}
                        // border={br.id === brand.selectedBrand.id ? 'warning' : 'light'}
                        // bg={br.id === brand.selectedBrand.id ? 'warning' : ''}
                        border='warning'
                        bg='warning'
                        onClick={() => brand.setSelectedBrand(br)}
                        key={br.id}
                        className="p-3"
                    >
                        {br.name}
                    </Card>
                }else 
                    return <Card
                        style={{cursor: "default",backgroundColor: "lightgrey"}}
                        key={br.id}
                        className="p-3"
                    >
                        {br.name}
                    </Card>
            })}
        </Row>
    )
})

export default BrandBar
