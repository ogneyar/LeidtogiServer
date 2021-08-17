import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'

import { Context } from '../..'
import './BrandBar.css'


const BrandBar =  observer((props) => {

    const { brand } = useContext(Context)

    const [info, setInfo] = useState([])

    const history = useHistory()

    useEffect(() => {
        setInfo(brand.brands)
    },[brand.brands])

    const tempFunction = (br) => { // пока один бренд
        brand.setSelectedBrand(br)
        history.push("/")
    }


    return (
        <div className='BrandBar'>
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
                        border={props?.search ? 'light' : 'warning'}
                        bg={props?.search ? '' : 'warning'}
                        onClick={() => tempFunction(br)}
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
        </div>
    )
})

export default BrandBar
